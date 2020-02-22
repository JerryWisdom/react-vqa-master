import React, {Component} from 'react'
import { 
    withRouter,
    // Link
} from 'react-router-dom'
import { 
    Tooltip, 
    // Icon, 
    Card, 
    Col, 
    Row 
} from 'antd'
import Toptitle from '../components/toptitle'
import Sider from '../components/sider'
import 'antd/dist/antd.css'

class Introduce extends Component {

    render () {
        return (
            <div className='whole'>
                <Toptitle />
                <br />
                <div className='sider-intro'>
                    <Sider />
                    <div className="intro" >
                        <h2 className="intro-title">
                            BlindVQA 是帮助盲人与外界基于图片进行视觉交互问答的平台&nbsp;
                        </h2>
                        {/* 以卡片的形式呈现介绍 */}
                        <div className="intro-card">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card title="WEB前端和UI框架" bordered={false}>
                                        <ul className='intro-card-list'>
                                            <Tooltip 
                                                title={'一个基于Node.js的用于构建用户界面的JavaScript库'} 
                                                placement="right"
                                            >
                                                <li>React.js</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'使用router路由实现页面间的跳转'} 
                                                placement="right"
                                            >
                                                <li>react-router</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'React生态中重要的组成部分：Store是整个应用的数据存储中心，集中大部分页面需要的状态数据；ActionCreators作为view层与数据层的介质；Reduce接收action并更新Store。整体流程：用户通过界面组件触发ActionCreator，携带Store中的旧State与Action流向Reducer，Reducer返回新的state并更新界面。'} 
                                                placement="right"
                                            >
                                                <li>Redux</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'基于promise的HTTP库，可以用在浏览器和node.js中，可完成ajax请求。'} 
                                                placement="right"
                                            >
                                                <li>axios后台交互</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'基于Ant Design设计体系的React UI组件库用于研发企业级中后台产品。'} 
                                                placement="right"
                                            >
                                                <li>antd</li>
                                            </Tooltip><br/>

                                            <Tooltip
                                                title={'一款强化CSS的预处理器，Scss是其一种语法格式，它在CSS语法的基础上增加了变量、嵌套、混合、导入等高级功能，这些拓展令CSS更加强大与优雅。使用Sass及其样式库有助于更好地组织管理样式文件和更高效地开发项目。'} 
                                                placement="right"
                                            >
                                                <li>Sass</li>
                                            </Tooltip><br/>

                                            <Tooltip
                                                title={'一个绘制图表的库'} 
                                                placement="right"
                                            >
                                                <li>Echarts</li>
                                            </Tooltip>
                                        </ul>
                                    </Card>
                                </Col>

                                <Col span={8}>
                                    <Card title="后端和内网VQA模型" bordered={false}>
                                        <ul className='intro-card-list'>
                                            <Tooltip 
                                                title={'一个Python的轻量级web框架，最大的特点是轻便'} 
                                                placement="right"
                                            >
                                                <li>Flask框架</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'一种开放源代码的关系型数据库管理系统（RDBMS）使用最常用的数据库管理语言——结构化查询语言SQL进行数据库管理。'} 
                                                placement="right"
                                            >
                                                <li>MySQL数据库</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'一个基于Python实现的ORM框架，该框架建立在DBAPI之上，使用对象关系映射进行数据库操作，即将类和对象转换成SQL，然后使用数据API执行SQL并获取执行结果。'} 
                                                placement="right"
                                            >
                                                <li>SQLAlchemy</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'一个Facebook开发的基于Python的深度学习框架，专门针对GPU加速的深度神经网络(DNN)的程序开发。'} 
                                                placement="right"
                                            >
                                                <li>Pytorch框架</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'Deep Learning是机器学习领域中一个接近人工智能的研究方向，涉及计算机视觉、自然语言处理等领域以及CNN、LSTM等神经网络。'} 
                                                placement="right"
                                            >
                                                <li>深度学习模型</li>
                                            </Tooltip>
                                        </ul>
                                    </Card>
                                </Col>

                                <Col span={8}>
                                    <Card title="云服务器端" bordered={false}>
                                        <ul className='intro-card-list'>
                                            <Tooltip 
                                                title={'一个具有负载均衡、动静分离等高性能的HTTP和反向代理服务器'} 
                                                placement="right"
                                            >
                                                <li>Nginx代理服务器</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何Linux或Windows机器上，可以实现操作系统层虚拟化。'} 
                                                placement="right"
                                            >
                                                <li>Docker容器化</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'frp是一款跨平台的内网穿透工具，可以实现远程访问内网中的设备'}
                                                placement="right"
                                            >
                                                <li>Frp内网渗透</li>
                                            </Tooltip><br/>

                                            <Tooltip 
                                                title={'一个实现了WSGI、uwsgi、http等协议的Web服务器。WSGI是一种Web服务器网关接口和通信协议，uwsgi是uWSGI服务器自有的协议，是一个Web服务器（如nginx、uWSGI）与web应用（如用Flask写的程序）通信的一种规范。'} 
                                                placement="right"
                                            >
                                                <li>uWSGI服务器</li>
                                            </Tooltip>
                                        </ul>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Introduce)
