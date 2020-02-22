import React, {Component} from 'react'
import { 
    withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { 
    Result,
    Icon,
    Typography,
    Rate,
    // message
} from 'antd'
import Toptitle from '../../components/toptitle'
import Sider from '../../components/sider'
const { Paragraph } = Typography;

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class Access extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }
    handleChange = value => {
        this.setState({ 
            value 
        });
    };

    render () {
        const { 
            InputValue, 
            answer, 
            image_url
        } = this.props
        const { value } = this.state
        const success = (
            <div className="vqa2">
                <div className='show_img'>
                    <h2 className='h2'>
                        <Icon 
                            type="picture" 
                            style={{fontSize:'25px', color:"#0000FF"}}
                        />
                        &nbsp;已上传的图片
                    </h2>
                    <img 
                        id='img' 
                        src={image_url} 
                        width="400" 
                        height="400" 
                        alt="oh, 图片不见了～～"
                    />
                </div>
                <div className='response'>
                    <div className='response-ans'>
                        <h2> 
                            针对图片提出的问题：<br />
                            <Paragraph 
                                className='para1' 
                                copyable
                            >
                                {InputValue}
                            </Paragraph>
                        </h2>
                        <h2>
                            回答：
                            <Paragraph 
                                className='para2' 
                                copyable
                            >
                                {answer}
                            </Paragraph>
                        </h2>
                    </div><br/>
                    <h3>
                        请给结果评分吧~
                    </h3>
                    <span>
                        <Rate 
                            tooltips={desc} 
                            onChange={this.handleChange} 
                            value={value} 
                        />
                        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                    </span>
                </div>
            </div>
        )
        const failure = (
            <div className="vqa2">
                <Result 
                    className='vqa2-empty'
                    status="404" 
                    title="404" 
                    subTitle="Sorry! 请先返回 VQA 主页提交图片和问题~"
                />
            </div>
        )
        return (
            <div className='whole'>
                <Toptitle />
                <br />
                <div className='sider-vqa2'>
                    <Sider /> 
                    {/* 选择的视图要被完整div包围,margin-right是div外的,right是距离右内边距离 */}
                    { answer ?  success : failure }
                </div>
            </div>
        )
    }
}
// 验证组件中的参数类型
Access.propTypes = {
    InputValue: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
}

const getElements = (state) => {
    return {  
        InputValue: state.update.InputValue,
        answer: state.update.answer,
        image_url: state.update.image_url
    }
}

export default withRouter(
    connect(getElements)(Access)
)






  