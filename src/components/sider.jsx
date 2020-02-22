import React, {Component} from 'react'
import { 
    Menu, 
    Icon, 
    // Switch 
} from 'antd';
import { 
    withRouter,
    Link 
} from 'react-router-dom'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { 
    logoutSubmit,
    handleSetMode,
    handleSetTheme,
    search_by_user
} from '../actions/actionCreators'
// import SideCalendar from '../components/calendar'
const { SubMenu } = Menu;

class Sider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    componentDidMount() {
        if(document.body.clientWidth < 500 ) {  //宽度不够时将导航栏折叠
            this.setState({
                collapsed: true
            })
        }
    }

    handleLogout = () => {
        this.props.logoutSubmit()
    }
    handleSearchRecord = () => {
        const { user } = this.props;
        this.props.search_by_user({'user': user})
    }

    handleChangeMode = value => {
        let nowmode =  value ? 'vertical' : 'inline'
        this.props.handleSetMode({ 
            'mode': nowmode 
        })
    };
    handleChangeTheme = value => {
        let nowtheme = value ? 'dark' : 'light'
        this.props.handleSetTheme({ 
            'theme': nowtheme 
        })
    };

    render() {
        const { 
            user,
            // mode,
            theme 
        } = this.props;
        return (
            <div className='sider'>
                <div className='sider-wrap'>
                    {/* <Switch onChange={this.handleChangeMode} /> 切换导航<br/>
                    <span className="ant-divider" style={{ margin: '0 1em' }} /> */}
                    {/* <Switch onChange={this.handleChangeTheme} />
                    &nbsp;切换导航背景 */}<br/>
                    <Menu  
                        // style={{ width: 300 }}
                        className='sider-wrap-content'
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1','sub2']}
                        mode="inline"   // { mode }
                        theme={ theme }
                        inlineCollapsed={this.state.collapsed}
                    >
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>{ user } &nbsp;欢迎您</span>
                        </Menu.Item>
                        
                        <Menu.Item key="2">
                            <Icon type="logout" />
                            <span>退出登录</span>
                            <Link 
                                to="/login" 
                                style={{ color: '#000000' }} 
                                onClick={this.handleLogout}
                            />
                        </Menu.Item>
                        
                        <Menu.Item key="3">
                            <Icon type="calendar" />
                            <span>我的日历</span>
                            <Link 
                                to="/mycalendar" 
                                style={{ color: '#000000' }}
                            />
                        </Menu.Item>

                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="appstore" />
                                    <span>系统管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="4">
                                <Icon type="home" /> 
                                VQA主页
                                <Link 
                                    to="/upload" 
                                    style={{ color: '#000000' }}
                                />
                            </Menu.Item>

                            <Menu.Item key="5">
                                <Icon type="aliwangwang" /> 
                                问答结果
                                <Link 
                                    to="/access" 
                                    style={{ color: '#000000' }}
                                />
                            </Menu.Item>

                            <Menu.Item key="6">
                                技术栈介绍
                                <Link 
                                    to="/introduce"
                                    style={{ color: '#000000' }} 
                                />
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="setting" />
                                    <span>用户管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="7">
                                <Icon type="contacts" />
                                查询记录
                                <Link 
                                    to="/record" 
                                    style={{ color: '#000000' }}
                                    onClick={this.handleSearchRecord}
                                />
                            </Menu.Item>
                            
                            <Menu.Item key="8">
                                <Icon type="bar-chart"/>
                                图表分析
                                <Link 
                                    to="/echarts/bar"
                                    style={{ color: '#000000' }}
                                    onClick={this.handleSearchRecord}
                                />
                            </Menu.Item>

                            <Menu.Item key="9">
                                注册新用户
                                <Link 
                                    to="/register"
                                    style={{ color: '#000000' }} 
                                    onClick={this.handleLogout}
                                />
                            </Menu.Item>

                            <Menu.Item key="10">
                                修改密码
                                <Link 
                                    to="/modify"
                                    style={{ color: '#000000' }} 
                                    onClick={this.handleLogout}
                                />
                            </Menu.Item>

                        </SubMenu>
                    </Menu>
                </div>
                {/* <SideCalendar/> */}
            </div>
        );
    }
}
Sider.propTypes = {
    user: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.vqa_user.user,
        mode: state.side_menu.mode,
        theme: state.side_menu.theme
    }
}

export default withRouter(
    connect(
        mapStateToProps, { 
            logoutSubmit,
            handleSetMode,
            handleSetTheme,
            search_by_user
    })(Sider)
);