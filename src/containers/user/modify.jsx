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
    withRouter,
    Link
} from 'react-router-dom'
import {
    LOGIN_TITLE,
} from '../../constant/constants'
import { modify } from '../../actions/actionCreators'
import LOGINFOOT from "../../components/foot"
import PropTypes from 'prop-types'

class Modify extends Component{
    constructor(props){
        super(props);
        this.state = {
            'user': '',
            'pwd': '',
            'repeatpwd': ''
        }
        this.handleModify = this.handleModify.bind(this)
        this.login = this.login.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.handleChange3 = this.handleChange3.bind(this)
    }

    login(){
        this.props.history.push('/login')
    }
    handleModify(){
        // console.log(this.state)
        this.props.modify(this.state)
    }

    handleChange1(val) {  //不是箭头函数就需要声明.bind(this)
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
            <div className='modify'>
                <div className='modify-auth'>
                    {/* {redirectTo && redirectTo!=='/login' ? <Redirect to={redirectTo}></Redirect>:null} */}
                    <Logo />
                    <h2> 
                        { LOGIN_TITLE } 
                    </h2>
                    { msg ? <p className="error-msg">{ msg }</p> : null }
                    <p className='modify-auth-form'>
                        <label for="username" className='modify-auth-preInput'><span className="required">*</span> 用户名</label>
                        <Input
                        prefix={<Icon type="user" />}
                        id='username'
                        className='modify-user'
                        placeholder="请输入用户名"
                        allowClear
                        onChange={v=>this.handleChange1(v.target.value)}
                    /></p>

                    <p className='modify-auth-form'>
                        <label for="password" className='modify-auth-preInput'><span className="required">*</span> 密码</label>
                        <Input.Password
                        prefix={<Icon type="lock" />}
                        id='password'
                        className='modify-password'
                        placeholder="请输入新密码"
                        allowClear
                        onChange={v=>this.handleChange2(v.target.value)}
                    /></p>

                    <p className='modify-auth-form'>
                        <label for="password" className='modify-auth-preInput'><span className="required">*</span> 重复密码</label>
                        <Input.Password
                        prefix={<Icon type="lock" />}
                        id='password'
                        className='modify-checkpwd'
                        placeholder="请确认新密码"
                        allowClear
                        onChange={v=>this.handleChange3(v.target.value)}
                    /></p>

                    {/* <br /> */}
                    <Button 
                        type="primary" 
                        onClick={this.login}
                    >
                        返回登录
                    </Button>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/register" className='forget'> 
                        返回注册 
                    </Link>
                    <br /><br />

                    <Button 
                        type="primary" 
                        onClick={this.handleModify}
                    >
                        修改密码
                    </Button>
                    <br /><br /><br /><br /><br />
                </div>
                <LOGINFOOT/>
            </div>
        )
    }
}
// 验证组件中的参数类型
Modify.propTypes = {
    redirectTo: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    pwd: PropTypes.string.isRequired
}

export default withRouter(connect(
    state => state.vqa_user,
    {modify}
)(Modify))