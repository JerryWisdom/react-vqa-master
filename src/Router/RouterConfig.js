import React, {Component} from 'react';
import { 
    // Link,
    Switch,
    Route,
    BrowserRouter,
    Redirect 
} from 'react-router-dom'
import Access from '../containers/vqa/access'
import VQAUpload from '../containers/vqa/upload'
import Login from '../containers/user/login'
import Register from '../containers/user/register'
import Modify from '../containers/user/modify'
import Record from '../containers/record'
import Introduce from '../containers/introduce'
import MyCalendar from '../containers/datetime'
import MyCharts from "../containers/echartsAnalysis";
import { 
    // createHashHistory,
    createBrowserHistory 
} from 'history'
// 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
import { syncHistoryWithStore } from 'react-router-redux' 
import store from '../store/store'

// const browserHistory = createHashHistory();  
// 使用 URL 中的 hash #部分去创建路由
const browserHistory = createBrowserHistory();   
// hash不需要服务器配置，实际生产环境用browserHistory
const history = syncHistoryWithStore(browserHistory, store)
// 创建一个增强版的history来结合store同步导航事件


class RouterConfig extends Component {
    componentDidMount() {   // 组件渲染后调用
        document.title = 'BlindVQA'
    }
    render() {
        return(
            // basename='/build'
            <BrowserRouter history={history}>
                <Switch>
                    <Route path='/' exact render={()=>(
                            <Redirect to='/login'/>
                        )}/>
                    <Route path="/upload" component={VQAUpload}/>
                    <Route path="/access" component={Access}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/modify" component={Modify}/>
                    <Route path="/introduce" component={Introduce}/>
                    <Route path="/record" component={Record}/>
                    <Route path="/mycalendar" component={MyCalendar} />
                    <Route path="/echarts/bar" component={MyCharts} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default RouterConfig