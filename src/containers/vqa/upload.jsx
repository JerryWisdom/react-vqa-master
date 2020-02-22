import React, {Component} from 'react'
import axios from 'axios'   //前端ajax插件
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { 
    // Upload,
    Input,
    Button,
    Icon,
    Spin,
    message,
    // Modal
} from 'antd'
import { 
    handleGetInputValue, 
    handleSetImageUrl, 
    handleSetAnswer, 
    handleClearInques
} from '../../actions/actionCreators'
import PropTypes from 'prop-types'
import Sider from '../../components/sider'
import Toptitle from '../../components/toptitle'
import 'antd/dist/antd.css'

class VQAUpload extends Component {
    constructor(props) {   
        super(props);
        this.state = {
            loading: false
        }
    }
    handleInputQues = (e) => {
        const { handleGetInputValue } = this.props
        handleGetInputValue(e.target.value)  
    }
    handleClear = () => {
        const { handleClearInques } = this.props
        handleClearInques()
    }

    handleGetImage = () => {
        var file = document.getElementById("upload_image").files[0];
        var reads = new FileReader()
        reads.readAsDataURL(file);  //把文件对象读成base64，读完直接放到src中 
        const { handleSetImageUrl } = this.props
        reads.onload = (e) => {
            document.getElementById('img').src = e.target.result
            handleSetImageUrl(e.target.result) 
        };
    }

    handlePost = () => {
        var _this = this;  
        const { 
            user,
            handleSetAnswer
        } = this.props;
        let q = document.getElementById("ques").value
        let i = document.getElementById("upload_image").files[0]
        if(q && !i) {
            message.error("未选择图片！")
        }
        else if(i && !q) {
            message.error("未输入问题！")
        }
        else if(!i && !q) {
            message.error("请先选择图片并输入问题！")
        }
        else {
            var iq_form = document.getElementById("form1")
            var form_data = new FormData(iq_form)
            form_data.append("username", user)
            this.setState({
                loading: true
            })
            message.loading('图片和问题已上传，请稍后~');  //message.info
            axios.post('/api', form_data, {
                headers: {
                    'Access-Control-Allow-Origin':'*',  //解决cors头问题, 不同端口存在跨域问题，使用proxy代理
                    'Access-Control-Allow-Credentials':'true', //解决session问题
                    'Content-Type': 'application/form-data; charset=UTF-8' //将表单数据传递转化为form-data类型
                },
                withCredentials : true  
            }).then(response => {  
                handleSetAnswer(response.data['res'])  
                _this.props.history.push({
                    pathname: '/access'  // state: { ... }  跳转组件用this.props.location.state.xxx获取
                })
                message.success("获取问答结果成功~")
            }).catch( error => {   
                // alert(error) 
                console.log(error)
                message.error("服务器出错！")
                this.setState({
                    loading: false
                })
            });
        }
    }

    render () {
        const { 
            InputValue,
            image_url,
            // answer 
        } = this.props  
        const { loading } = this.state
        return (
            <div className='whole'>
                <Toptitle /><br />
                <div className='sider-vqa1'>
                    <Sider />
                    <div className="vqa1" >
                        <h2 className='h2'>
                            点击拍照或上传本地图片
                        </h2>
                        <form 
                            id="form1" 
                            action=""
                            encType='multipart/form-data' 
                            method='POST'
                        >
                            <Input 
                                type="file" 
                                className="upload_file" 
                                name="image" 
                                id='upload_image' 
                                onChange={this.handleGetImage} 
                            />
                            <Icon
                                type="upload" 
                                style={{ fontSize: '20px', color: '#08c' }}
                            /><br />
                            <img
                                id="img"
                                src={require('../../assets/pic/add_picture.png')}
                                width="300"
                                height="300"
                                alt="～～请选择图片～～"
                            />
                            <br /><br />
                            <h2> 
                                请输入针对上传图片的问题：
                            </h2>
                            <Input
                                type="text"
                                id="ques"
                                className="ques_input"
                                name="ques"
                                value={InputValue}
                                onChange={this.handleInputQues}
                                placeholder="question"
                            />
                        </form><br />
                        <Button
                            type="primary"
                            onClick={ this.handlePost }
                        >
                            提交
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            type="danger" 
                            onClick={ this.handleClear }
                        >
                            重置问题
                        </Button>
                        <br/><br/>
                        { InputValue && image_url && loading ? <Spin/> : null }
                    </div>
                </div>
            </div>
        )
    }
}
// 验证组件中的参数类型
VQAUpload.propTypes = {
    InputValue: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {   // (state => state.update)
    return {
        InputValue: state.update.InputValue,
        image_url: state.update.image_url,
        answer: state.update.answer,
        user: state.vqa_user.user
    }
}

export default withRouter(
    connect(
        mapStateToProps, {
            handleGetInputValue,
            handleSetImageUrl,
            handleClearInques,
            handleSetAnswer
        }
    )(VQAUpload)
)


// ant design：UI组件参考 https://ant.design/docs/react/introduce-cn 
// react-redux详细文档：https://www.redux.org.cn/docs/react-redux/api.html
// connect第一个参数建立一个从外部的state对象到UI组件的props对象的映射关系
// URL.createObjectURL(file)得到本地内存容器的URL地址，方便预览，多次使用需要注意手动释放内存的问题，性能优秀
// var URL = window.URL || window.webkitURL;  // 如果当前document消失，比如页面被刷新，URL就失效了
// _this.setState({
//     image_url: URL.createObjectURL(file)
// })
// FileReader.readAsDataURL(file)胜在直接转为base64格式，可以直接用于业务，无需二次转换格式
// 注意将 px 换算成各层内外 div 的包含比例，以适应页面伸缩

// import { bindActionCreators } from 'redux'
// const mapDispatchToProps = (dispatch) => {
//     return { 
//         handleGetInputValue: bindActionCreators(handleGetInputValue, dispatch),
//         handleSetImageUrl: bindActionCreators(handleSetImageUrl, dispatch),
//         handleSetAnswer: bindActionCreators(handleSetAnswer, dispatch)
//     }
// }
// const params = {
//     name: 'image',
//     onChange: this.handleGetImage.bind(this)
// } ...params