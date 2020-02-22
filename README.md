## Introduction
This project is a BlindVQA Mannagement System based on tech stacks as follows.
### Frontend 
* [React.js](https://github.com/facebook/react)
* react-router
* [Redux](https://github.com/reduxjs/redux)
* [axios](https://github.com/axios/axios)
* [Ant Design](https://ant.design/docs/react/introduce-cn)
* [Sass](https://www.sass.hk/docs/)
* [Echarts](https://www.echartsjs.com/zh/index.html)
### Server
* [Nginx](https://github.com/nginx/nginx)
* [Docker](https://github.com/yeasy/docker_practice)
* [FRP](https://github.com/fatedier/frp)
* [uWSGI](https://github.com/tiangolo/uwsgi-nginx-flask-docker)
### Backend
* [Flask](https://github.com/pallets/flask)
* MySQL
* [SQLAlchemy](https://github.com/sqlalchemy/sqlalchemy)
* [Pytorch](https://github.com/yunjey/pytorch-tutorial) for Deep Learning and [VQA model](https://github.com/MILVLG/mcan-vqa)

## Contents
```js
### 目录结构介绍
***├── build                               // 放在Flask所在目录下的static文件夹内***
***├── server                              // 后端Flask web应用程序***
***├── public                                 ***
***├── node_modules                        // 项目的包依赖***
***├── src                                 // 源码目录***
***│   ├── assets                          // 存放项目的图片资源和SCSS文件***
***│   ├── components                      // 页面自定义组件***
***│   ├── containers                      // 页面容器***
***│   ├── constant                        // 变量全局配置***
***│   ├── store                           // 创建store仓库***
***│   ├── redux                           // 组合reducers***
***│   ├── actions                         // 管理actions操作***
***│   ├── Router                          // 页面路由配置 ***
***│   ├── setupProxy.js                   // 设置跨域请求代理***
***│   ├── index.js                        // 程序入口文件，加载各种公共组件***
***├── .babelrc                            // babel配置文件 ***
```
## Project Deployment
```bash
npm run/yarn build
rsync /path/to/build root@cloud_server_ip:/build
cd /path/to/vqa_flask_project
python vqa_web_api.py
cd /path/to/frpc
./frpc -c ./frpc.ini
ssh -o ServerAliveInterval=60 root@cloud_server_ip
nginx -s reload
docker start/restart frps_container_name
```
## Login Page
![login page](https://github.com/JerryWisdom/react-redux-vqa-master/src/assets/pic/vqa.png)
