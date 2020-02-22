import argparse
import json
import os.path
import time
import numpy as np
import torch
import torch.backends.cudnn as cudnn
import torch.nn as nn
import yaml
from torch.autograd import Variable
from tqdm import tqdm
from flask_cors import CORS
from pyspark import SparkContext
import models
import predict_dataset
import os
import os.path
import cv2
import torch.utils.data as data
import torchvision.transforms as transforms
from PIL import Image
from one_predict_forWeb import predict
from flask import Flask, render_template, request, redirect, url_for, make_response,jsonify
from werkzeug.utils import secure_filename
import os
from preprocessing import image_features_extraction as imf
import time
from datetime import timedelta,datetime

"""
模型预处理部分
"""
# Load config yaml file
parser = argparse.ArgumentParser()
parser.add_argument('--path_config', default='config/default.yaml', type=str,
                    help='path to a yaml config file')
args = parser.parse_args()

if args.path_config is not None:
    with open(args.path_config, 'r') as handle:
        config = yaml.load(handle, Loader=yaml.FullLoader)

class ImageDataset(data.Dataset):

    def __init__(self, img_filename, img_filepath, transform=None):  # , path
        # self.path = path
        self.transform = transform
        # Load the paths to the images available in the folder
        img_path = []
        self.filename = img_filename
        self.file_path = img_filepath
        img_path.append(self.file_path)
        self.image_names = img_path

    def __getitem__(self, index):
        item = {}
        item['name'] = self.filename
        item['path'] = self.file_path
        # item['path'] = os.path.join(self.path, item['name'])

        # 使用PIL加载图片数据再提取特征, Image.oopen后维度例如(3, 640, 722)
        item['visual'] = Image.open(item['path']).convert('RGB')
        if self.transform is not None:
            item['visual'] = self.transform(item['visual'])
        return item

    def __len__(self):
        return len(self.image_names)

    def get_path(self):
        return os.path.basename(self.file_path)

def get_transform(img_size):
    return transforms.Compose([
        transforms.Resize(img_size),
        transforms.CenterCrop(img_size),
        transforms.ToTensor(),
        # TODO : Compute mean and std of VizWiz
        # ImageNet normalization
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225]),
    ])
 
"""
Flask后端配置、数据库连接表
"""
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint
import pymysql
# from sqlalchemy.orm import sessionmaker
pymysql.install_as_MySQLdb()
app = Flask(__name__,template_folder="templates",static_folder="static",static_url_path="/VizWiz-VQA-PyTorch-master/static")
# static_url_path:前端访问资源文件的前缀目录 static_folder:后端存储资源文件的目录。默认是/static，就是指明你后端的资源文件
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123@localhost:3306/vqa_web?charset=utf8'
# app.config['SQLACHEMY_COMMIT_ON_TEARDOWN']=True   # 自动提交
db = SQLAlchemy(app)   # 初始化 MySQL database
import time  # 格式化成2016-03-20 11:45:39形式：time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) 

class Vqaer(db.Model):
    """ 创建用户注册登录模型，注意设置表的属性区分大小写 """
    __tablename__ = 'login_register'
    user = db.Column(db.String(50), nullable=False, primary_key=True)
    pwd = db.Column(db.String(50), nullable=False)

class QandA(db.Model):
    """ username, date_time, question, answer 设置为主键的query只会返回一个记录  db.DateTime """
    __tablename__ = 'ques_ans'
    user = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(50), nullable=False, primary_key=True)
    vqa_ques = db.Column(db.String(50), nullable=False)
    vqa_ans = db.Column(db.String(50), nullable=False)
    interaction = db.Column(db.Float, nullable=False)
    
    # 单个对象方法
    def single_to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    # 多个对象
    def dobule_to_dict(self):
        result = {}
        for key in self.__mapper__.c.keys():
            if getattr(self, key) is not None:
                result[key] = str(getattr(self, key))
            else:
                result[key] = getattr(self, key)
        return result
    
    def to_json(self):
        dict = self.__dict__
        if "_sa_instance_state" in dict:
            del dict["_sa_instance_state"]
        return dict
    
'''
路由所需函数
'''
def add_user(username, password):  # 添加用户
    newuser = Vqaer(user=username, pwd=password)
    db.session.add(newuser)
    db.session.commit()
    
def find_pwd(username):   
    # 获取对应用户密码
    res = db.session.query(Vqaer).filter(Vqaer.user == username).all()
    password = ''
    # print(res)
    if res:
        password = res[0].pwd 
    return password
   
def modify_pwd(username, password):   
    # 修改用户密码
    db.session.query(Vqaer).filter(Vqaer.user == username).update({"pwd": password})
    db.session.commit()

# 先按条件查询再删除：session.query(QandA).filter(QandA.user == username).delete()
# def to_json(all_vendors):
#     v = [ ven.dobule_to_dict() for ven in all_vendors ]
#     return v

def find_record(username):   
    # 获取对应用户密码
    res = db.session.query(QandA).filter(QandA.user == username).all()  #返回的是object对象,注意这里以唯一的时间值作为主键而非用户名  
    cnt = db.session.query(QandA).filter(QandA.user == username).count() #返回符合条件的记录条数
    # print(cnt, res)
    record = []
    if cnt == 0:
        return jsonify({'auth': False, 'msg': '当前用户没有记录！'})
    else:
        for item in res:
            record.append(item.to_json())
        # print(record)
    return jsonify({'auth': True, 'nums': cnt, 'rec': record})  # json.dumps

'''
路由函数,与PC端Web网站的react-axios交互
'''
# @app.route('/', methods=['POST','GET'])  
# # React.js的入口文件，若把build放在服务器根目录下在配置则不用响应flask的入口文件
# def index():
#     return render_template('index.html')

@app.route('/login/', methods=['POST','GET']) 
def login():
    #  request.args.get("username") 获取Get请求参数, request.form.get 获取post请求
    username = request.args.get("username")
    userpwd = request.args.get("password")
    # print(username, userpwd)
    pwd = find_pwd(username)
    if pwd == "":
        return jsonify({'auth': False, 'msg': '用户名尚未注册！'})
    if pwd != userpwd:
        return jsonify({'auth': False, 'msg': '请检查密码是否正确！'})
    else:
        return jsonify({'auth': True })

@app.route('/register/', methods=['POST','GET'])
def register():
    username = request.args.get("username")
    userpwd = request.args.get("password")
    if find_pwd(username) != '':
        return jsonify({'auth': False, 'msg': '账户已注册，请返回登录！'})
    else:
        add_user(username, userpwd)
        return jsonify({'auth': True})

@app.route('/modify/', methods=['POST','GET'])
def modify():
    username = request.args.get("username")
    userpwd = request.args.get("password")
    if find_pwd(username) == '':
        return jsonify({'auth': False, 'msg': '账户不存在，请先注册！'})
    if find_pwd(username) == userpwd:
        return jsonify({'auth': False, 'msg': '新密码与旧密码一致！'})
    else:
        modify_pwd(username, userpwd)
        return jsonify({'auth': True})

@app.route('/record/', methods=['POST','GET'])
def record():
    username = request.args.get("username")
    return find_record(username)

'''
VQA预测模型模块
'''
#设置允许的文件格式  
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'JPG', 'PNG', 'bmp', 'jpeg'])
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/api/', methods=['POST','GET']) 
def upload(): 
    a = datetime.now()
    nowtime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    # nowtime = time.strptime(nowtime, "%Y-%m-%d %H:%M:%S")
    question = request.form.get("ques")  # 前端获取问题字符串，Base64编码图片可以上传到七牛云存储然后返回url链接
    username = request.form.get("username")
    print(username, nowtime, question)
    
    f = request.files['image']   
    if not (f and allowed_file(f.filename)):
        return jsonify({"error": 1001, "msg": "请检查上传的图片类型"})
    p = os.path.dirname(__file__)  # 当前文件所在路径

    # 图片路径用于PIL加载图片的RGB数据，图片名字无所谓
    basepath = os.path.join(p, 'static')
    img_filename = f.filename

    upload_path = os.path.join(p, 'static', secure_filename(f.filename))
    f.save(upload_path)
    # 使用Opencv转换一下图片格式和名称
    img = cv2.imread(upload_path)
    cv2.imwrite(os.path.join(p,'static', 'test.jpg'), img)

    #调用函数进行预测
    transform = get_transform(config['images']['img_size'])
    dataset = ImageDataset(img_filename, upload_path, transform=transform)
    att_fea, noatt_fea, img_namee = imf.feature(dataset)
    answer = predict(img_filename, question, att_fea, noatt_fea, img_namee)
    
    b = datetime.now()
    during = float((b-a).seconds)
    # 向 MySQL 添加用户问答记录
    newRecord = QandA(user=username, date=nowtime, vqa_ques=question, vqa_ans=answer, interaction=during)   
    db.session.add(newRecord)
    db.session.commit()
    
    return jsonify({'res': answer})
    # return render_template('index.html')
    # return render_template('upload_ok.html',userinput1=question,userinput2=res,val1=time.time())
 
if __name__ == '__main__':
    # app.debug = True  8880
    app.run(host='0.0.0.0', port=8880, debug=True)   # 127.0.0.1:8987/predict 本地测试地址



# if __name__ == '__main__':
#     img_name = get_feature()
#     res = predict(img_name)
#     return res
#     print(web_predict())
# fig = {"image": str(img.tolist()).encode('base64')} img是ndarray，无法直接用base64编码，否则会报错，这行是处理本地的图片，不能用
# 从客户端获取图片json数据,预处理从客户端获取的图片，比如我们的 /http://192.168.2.126:5000/predict
# fig = request.form.get("img_name")
# 获取推过来的json，也可以用data然后转换成json再使用 res = json.loads(request.data)