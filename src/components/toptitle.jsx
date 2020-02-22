import React from 'react'
import { 
    Icon,
    Modal 
} from 'antd'
// import { Link } from 'react-router-dom'
import { 
    APP_GITHUB,
    MINI_GITHUB,
    VQA 
} from '../constant/constants'
import AppImg from '../assets/pic/wechat.jpg'

class Toptitle extends React.Component{
    constructor(props){
        super(props);
        var time = new Date()
        function PrefixInteger(num, length) { 
            // 规定从何处开始选取,如果是负数,那么从数组尾部开始算起的位置,-2指倒数第二个元素
            return (Array(length).join('0') + num).slice(-length);
        }
        this.state = {  //先初始化再设置timer计时
            year: PrefixInteger(time.getFullYear(), 4), 
            month: PrefixInteger(time.getMonth()+1, 2),    // 1月为0
            day: PrefixInteger(time.getDate(), 2),
            hour : PrefixInteger(time.getHours(), 2),
            minute : PrefixInteger(time.getMinutes(), 2),
            second : PrefixInteger(time.getSeconds(), 2),
            visible: false
        }
    }
    componentDidMount(){
        this.timer = setInterval( ()=>this.GetTime(), 1000 )  // 每秒刷新一次时钟
    }

    GetTime = () => {
        var time = new Date()
        function PrefixInteger(num, length) { 
            // 规定从何处开始选取,如果是负数,那么从数组尾部开始算起,-2指倒数第二个元素
            return (Array(length).join('0') + num).slice(-length);
        }
        this.setState({
            year: PrefixInteger(time.getFullYear(), 4), 
            month: PrefixInteger(time.getMonth()+1, 2),
            day: PrefixInteger(time.getDate(), 2),
            hour : PrefixInteger(time.getHours(), 2),
            minute : PrefixInteger(time.getMinutes(), 2),
            second : PrefixInteger(time.getSeconds(), 2),
        })
    } 
    
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render(){
        const { 
            year, 
            month, 
            day, 
            hour, 
            minute, 
            second 
        } = this.state
        return (
            <div className='nav'>
                <div className='nav-title'> 
                    <div className='nav-title-name'>
                        面向盲人辅助的 BlindVQA 视觉问答系统
                    </div>
                    <div className='nav-title-link'>
                        <a 
                            href={VQA} 
                            target="view_window"
                            // style={{ color: '#ffffff' }}
                        >
                            关于VQA
                        </a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a 
                            // style={{ color: '#ffffff'  }}
                            onClick={this.showModal}
                        > 
                            微信小程序
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a 
                            href={APP_GITHUB} 
                            target="view_window"
                            // style={{ color: '#ffffff' }}
                        >
                            Android客户端
                        </a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Icon type="clock-circle"/>
                        &nbsp;{hour}:{minute}:{second}
                        {/* &nbsp;{year}年{month}月{day}日 */}
                    </div> 
                </div>
                <Modal
                    title="微信搜索 BlindVQA 体验小程序"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p className='modal'>
                        融合语音合成、语音识别和翻译，实现图像问答的多模态智能交互&nbsp;
                        <a 
                            href={MINI_GITHUB} 
                            target="view_window"
                        >
                            <Icon 
                                type="github" 
                                // style={{color: "#ffffff"}}
                            />
                        </a>
                    </p>
                    <div className='modal'>
                        <img    
                            
                            src={ AppImg } 
                            width="214"
                            height="214"
                            alt="小程序仍在完善中~"
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Toptitle



// class App extends React.Component {
//   state = {
//     current: 'mail',
//   };

//   handleClick = e => {
//     console.log('click ', e);
//     this.setState({
//       current: e.key,
//     });
//   };

//   render() {
//     return (
//       <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
//         <Menu.Item key="mail">
//           <Icon type="mail" />
//           Navigation One
//         </Menu.Item>
//         <Menu.Item key="app" disabled>
//           <Icon type="appstore" />
//           Navigation Two
//         </Menu.Item>
//         <SubMenu
//           title={
//             <span className="submenu-title-wrapper">
//               <Icon type="setting" />
//               Navigation Three - Submenu
//             </span>
//           }
//         >
//           <Menu.ItemGroup title="Item 1">
//             <Menu.Item key="setting:1">Option 1</Menu.Item>
//             <Menu.Item key="setting:2">Option 2</Menu.Item>
//           </Menu.ItemGroup>
//           <Menu.ItemGroup title="Item 2">
//             <Menu.Item key="setting:3">Option 3</Menu.Item>
//             <Menu.Item key="setting:4">Option 4</Menu.Item>
//           </Menu.ItemGroup>
//         </SubMenu>
//         <Menu.Item key="alipay">
//           <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//             Navigation Four - Link
//           </a>
//         </Menu.Item>
//       </Menu>
//     );
//   }
// }