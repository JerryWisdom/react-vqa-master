import React, {Component} from 'react'
import {
    AUTHOR,
    FOOTER,
    GITHUB,
    ICP,
    APP_GITHUB,
    ICP_address,
    VQA
} from "../constant/constants";
import appScan from '../assets/pic/app_scan.jpg'
import sodagreen from "../assets/sodagreen.mp3" //assets文件先import
import {
    Icon,
} from 'antd'

class LOGINFOOT extends Component{
    componentDidMount() {
        var audio = document.getElementById('music');
        audio.pause();//打开页面时无音乐
    }
    play_audio = () => {
        var audio = document.getElementById('music');
        if (audio.paused) {
            audio.play();
        }else{
            audio.pause();
            // audio.currentTime = 0; //音乐从头播放
        }
    }

    render(){
        return (
            <div className='foot'>
                <div className='foot-app'>
                    <div className="foot-app-left">
                        <img
                            src={appScan}
                            width="130"
                            height="130"
                        />
                    </div>
                    <div className="foot-app-right">
                        <p>&nbsp;&nbsp;微信扫一扫 BlindVQA 小程序</p>
                        <p className='foot-app-right-intro'>体验视觉问答的多模态智能交互</p>
                    </div>
                </div>
                <footer className='foot-developer'>
                    <p>
                        WEBSITE BY &nbsp;
                        <Icon
                            type="mail"
                        /> &nbsp;{AUTHOR}
                    </p>
                    <p>
                        <a
                            href={VQA}
                            target="view_window"
                        >
                            About VQA
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Join us&nbsp;&nbsp;
                        <a
                            href={GITHUB}
                            target="view_window"
                            className="foot-developer-link"
                        >
                            <Icon
                                type="github"
                                // style={{color: "#ffffff"}}
                            />
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a
                            href={APP_GITHUB}
                            target="view_window"
                            className="foot-developer-link"
                        >
                            Android APP
                        </a>&nbsp;&nbsp;
                        <Icon
                            type="android"
                            // style={{color: "#ffffff"}}
                        />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <audio
                            id='music'
                            src={sodagreen}
                            autoplay="autoplay" loop="loop" controls hidden
                        >
                        </audio>
                        <a
                            onClick={this.play_audio.bind(this)}
                        >
                            Play music&nbsp;
                            <Icon
                                type="play-circle"
                                // style={{color: "#ffffff"}}  onClick="a();"
                            />
                        </a>
                    </p>
                    <p>
                        <a
                            href={ICP_address}
                            target="view_window"
                        >
                            {ICP}
                        </a>&nbsp;&nbsp;
                        { FOOTER }
                    </p>
                </footer>
            </div>
        )
    }
}

export default LOGINFOOT

