import React, {Component} from 'react'
import Logo from '../../components/logo'
import {
    Input, 
    Button, 
    Icon,
    message,
    Checkbox,
    //List,Form,Card,Switch,Radio,Mentions,slider,Select,Cascader,TreeSlectDataPicker,Transfer
} from 'antd'
import { 
    LOGIN_TITLE
} from '../../constant/constants'
import { 
    withRouter,
    Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/actionCreators'
import LOGINFOOT from "../../components/foot"
import PropTypes from 'prop-types'

//设置cookie
function setCookie(name, value, day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
}
//获取cookie
function getCookie(name) {
    var reg = RegExp(name + '=([^;]+)');
    var arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
}
//删除cookie
function delCookie(name) {
    setCookie(name, null, -1);
}

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            'user': '',
            'pwd': '',
            ischecked: false
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
    }
    onCheckboxChange = (e) => {
        if (!e.target.checked) {
            delCookie('username');
            delCookie('password');
        }
        else {
            this.setState({
                ischecked: true
            })
        }
    }

    register(){
        this.props.history.push('/register')
    }
    handleLogin(){
        const { redirectTo } = this.props
        const { user, pwd, ischecked } = this.state
        this.props.login(this.state)
        if( redirectTo && redirectTo!=='/login') {
            message.success(`登录成功，当前用户为 ${this.props.user}`)
            this.props.history.push(redirectTo)
            if(ischecked) {
                setCookie('username', user, 7);
                setCookie('password', pwd, 7); //保存密码到cookie，有效期7天
            }
        }
    }
    handleChange1(val) {
        if(!val){
            document.getElementById('username').innerHTML = getCookie('username')
            this.setState({
                'user': getCookie('username')
            })
        }
        else{
            this.setState({
                'user': val
            })
        }
    }
    handleChange2(val) {
        if(!val){
            document.getElementById('password').innerHTML = getCookie('password')
            this.setState({
                'pwd': getCookie('password')
            })
        }
        else{
            this.setState({
                'pwd': val
            })
        }
    }

    render(){
        const { msg } = this.props
        return (
            <div className='login'>
                <div className='login-auth'>
                    <Logo />
                    <h2>
                        { LOGIN_TITLE }
                    </h2>
                        {/* label为表单标签，用for绑定输入框的id，再在css中设置宽度和左/右对齐
                            还可以设置tr内嵌td制表对齐内容，<select>内嵌<option>选择选项 */}
                    { msg? <p className="error-msg">{ msg }</p> : null }
                    <p className='login-auth-form'>
                        <label for="username" className='login-auth-preInput'><span className="required">*</span> 用户名</label>
                        <Input
                            prefix={<Icon type="user" />}
                            id='username'
                            className='login-user'
                            placeholder="请输入用户名"
                            allowClear
                            onChange={v=>this.handleChange1(v.target.value)}
                        />
                    </p>
                    <p className='login-auth-form'>
                        <label for="password" className='login-auth-preInput'><span className="required">*</span> 密码</label>
                        <Input.Password
                            prefix={<Icon type="lock" />}
                            id='password'
                            className='login-password'
                            placeholder="请输入密码"
                            allowClear
                            onChange={v=>this.handleChange2(v.target.value)}
                        />
                    </p>

                    <p>
                        <Checkbox onChange={this.onCheckboxChange}>记住密码</Checkbox>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/modify" className='forget'>
                            忘记密码？
                        </Link>
                    </p><br />
                    
                    <Button 
                        type="primary" 
                        onClick={this.handleLogin}
                    >
                        登录
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Button 
                        onClick={this.register} 
                        type="primary"
                    >
                        没有账号？请注册
                    </Button>
                    <br /><br /><br /><br /><br />
                </div>
                <LOGINFOOT/>
            </div>
        )
    }
}
// 验证组件中的参数类型
Login.propTypes = {
    redirectTo: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    pwd: PropTypes.string.isRequired
}

export default withRouter(connect(
    state=>state.vqa_user,
    {login}
)(Login))



// 如果使用Form组件登录
// const FormItem = Form.Item;
// class FormLogin extends React.Component{
//     handleSubmit = ()=>{
//         let userInfo = this.props.form.getFieldsValue();
//         this.props.form.validateFields((err,values)=>{
//             if(!err){
//                 message.success(`${userInfo.userName}欢迎您 ，当前密码为：${userInfo.userPwd}`)
//             }
//         })
//     }
//     render(){
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <div>
//                 <Card title="登录水平表单" style={{marginTop:10}}>
//                     <Form style={{width:300}}>
//                         <FormItem>
//                             {
//                                 getFieldDecorator('userName',{
//                                     initialValue:'',
//                                     rules:[
//                                         {
//                                             required:true,
//                                             message:'用户名不能为空'
//                                         },
//                                         {
//                                             min:5,max:10,
//                                             message:'长度不在范围内'
//                                         },
//                                         {
//                                             pattern:new RegExp('^\\w+$','g'),
//                                             message:'用户名必须为字母或者数字'
//                                         }
//                                     ]
//                                 })(
//                                     <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
//                                 )
//                             }
//                         </FormItem>
//                         <FormItem>
//                             {
//                                 getFieldDecorator('userPwd', {
//                                     initialValue: '',
//                                     rules: []
//                                 })(
//                                     <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
//                                 )
//                             }
//                         </FormItem>
//                         <FormItem>
//                             {
//                                 getFieldDecorator('remember', {
//                                     valuePropName:'checked',
//                                     initialValue: true
//                                 })(
//                                     <Checkbox>记住密码</Checkbox>
//                                 )
//                             }
//                             <a href="#" style={{float:'right'}}>忘记密码</a>
//                         </FormItem>
//                         <FormItem>
//                             <Button type="primary" onClick={this.handleSubmit}>登录</Button>
//                         </FormItem>
//                     </Form>
//                 </Card>
//             </div>
//         );
//     }
// }
// export default Form.create()(FormLogin);