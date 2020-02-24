import React, {Component} from 'react'
import Logo from '../../components/logo'
import { 
    List,
    Input,
    Button,
    Icon 
} from 'antd'
import { connect } from 'react-redux'
import { 
    withRouter
} from 'react-router-dom'
import {
    LOGIN_TITLE,
} from '../../constant/constants'
import { register } from '../../actions/actionCreators'
import LOGINFOOT from "../../components/foot"
import PropTypes from 'prop-types'

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            'user': '',
            'pwd': '',
            'repeatpwd': ''
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.login = this.login.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.handleChange3 = this.handleChange3.bind(this)
    }
    login(){
        this.props.history.push('/login')
    }
    handleRegister(){
        // console.log(this.state)
        this.props.register(this.state)
    }
    handleChange1(val) { 
        this.setState({ 
            'user': val 
        }) 
    }
    handleChange2(val) { 
        this.setState({
            'pwd': val 
        }) 
    }
    handleChange3(val) {
        this.setState({
            'repeatpwd': val 
        }) 
    }

    render(){
        const { msg } = this.props
        return (
            <div className='register'>
                <div className='register-auth'>
                    <Logo />
                    <h2> 
                        { LOGIN_TITLE }
                    </h2>
                    { msg ? <p className="error-msg">{ msg }</p> : null }
                    <p className='register-auth-form'>
                        <label for="username" className='register-auth-preInput'><span className="required">*</span> 用户名</label>
                        <Input
                        prefix={<Icon type="user" />}
                        id='username'
                        className='register-user'
                        placeholder="请输入用户名"
                        allowClear
                        onChange={v=>this.handleChange1(v.target.value)}
                    /></p>

                    <p className='register-auth-form'>
                        <label for="password" className='register-auth-preInput'><span className="required">*</span> 密码</label>
                        <Input.Password
                        prefix={<Icon type="lock" />}
                        id='password'
                        className='register-password'
                        placeholder="请输入密码"
                        allowClear
                        onChange={v=>this.handleChange2(v.target.value)}
                    /></p>

                    <p className='register-auth-form'>
                        <label for="password" className='register-auth-preInput'><span className="required">*</span> 重复密码</label>
                        <Input.Password
                        prefix={<Icon type="lock" />}
                        id='password'
                        className='register-checkpwd'
                        placeholder="请确认密码"
                        allowClear
                        onChange={v=>this.handleChange3(v.target.value)}
                    /></p>

                    {/* <br /> */}
                    <Button 
                        type="primary" 
                        onClick={this.handleRegister}
                    >
                        注册
                    </Button>
                    <br /><br />
                    <Button 
                        type="primary" 
                        onClick={this.login}
                    >
                        返回登录
                    </Button>
                    <br /><br /><br /><br /><br />
                </div>
                <LOGINFOOT/>
            </div>
        )
    }
}
// 验证组件中的参数类型
Register.propTypes = {
    redirectTo: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    pwd: PropTypes.string.isRequired
}

export default withRouter(connect(
    state => state.vqa_user,
    {register}
)(Register))