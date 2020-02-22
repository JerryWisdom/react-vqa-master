import React, { Component } from 'react'
import {
    withRouter,
} from 'react-router-dom'
import { connect }from "react-redux";
import Toptitle from '../components/toptitle'
import Sider from '../components/sider'
import echarts from 'echarts'
import PropTypes from 'prop-types'

class MyCharts extends Component {
    componentDidMount() {
        const myBar = echarts.init(document.getElementById("bar"))
        const myPie = echarts.init(document.getElementById("pie"))
        const {
            user,
            rec,
            // nums
        } = this.props;

        var ques = ['what', 'what color', 'how many', 'yes/no', 'else']
        var ans = ['unanswerable', 'yes', 'no', 'black', 'blue', 'keyboard', 'else']
        var ques_cnt = []    // new Array()
        var ans_cnt = []

        function prepro_data(obj) {
            let what_cnt = 0; 
            let what_color_cnt = 0; 
            let how_many_cnt = 0;
            let is_not_cnt = 0; 
            let else_ques_cnt = 0;
            let unanswer_cnt = 0; 
            let yes_cnt = 0;
            let no_cnt = 0;
            let black_cnt = 0; 
            let blue_cnt = 0; 
            let keyboard_cnt = 0; 
            let else_ans_cnt = 0;

            for(let item of rec) {
                console.log(item)
                let eachques = item.vqa_ques;
                let eachans = item.vqa_ans;
                if (eachques.includes('what is') || eachques.includes('What is')
                    || eachques.includes('What\'s') || eachques.includes('what\'s')) {
                    what_cnt = what_cnt + 1
                }
                else if (eachques.includes('what color') || eachques.includes('What color')) {
                    what_color_cnt = what_color_cnt + 1
                }
                else if (eachques.includes('how many') || eachques.includes('How many')) {
                    how_many_cnt = how_many_cnt + 1
                }
                else if (eachques.slice(0,2)==="Is" || eachques.slice(0,2)==="is"
                    || eachques.slice(0,3)==="Are" || eachques.slice(0,3)==="are") {
                    is_not_cnt = is_not_cnt + 1
                }
                else {
                    else_ques_cnt = else_ques_cnt + 1
                }
                if (eachans.includes('unanswerable')) {
                    unanswer_cnt = unanswer_cnt + 1
                }
                else if (eachans.includes('yes')) {
                    yes_cnt = yes_cnt + 1
                }
                else if (eachans.includes('no')) {
                    no_cnt = no_cnt + 1
                }
                else if (eachans.includes('black')) {
                    black_cnt = black_cnt + 1
                }
                else if (eachans.includes('blue')) {
                    blue_cnt = blue_cnt + 1
                }
                else if (eachans.includes('keyboard')) {
                    keyboard_cnt = keyboard_cnt + 1
                }
                else {
                    else_ans_cnt = else_ans_cnt + 1
                }
            }
            ques_cnt = [what_cnt, what_color_cnt, how_many_cnt, is_not_cnt, else_ques_cnt]
            ans_cnt = [unanswer_cnt, yes_cnt, no_cnt, black_cnt, blue_cnt, keyboard_cnt, else_ans_cnt]
        }
        prepro_data(rec)

        myBar.setOption({
            title: {
                text: `用户 ${user} VQA 历史回答分析`,
                // subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            // legend: {
            //     data: ['answer']
            // },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType:{ show: true, type:['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            xAxis:[
                {
                    type: 'category',
                    data: ans
                }
            ],
            yAxis: [{
                type: 'value'
            }],
            series: [
                {
                    name: 'answer',
                    type: 'bar',
                    data: ans_cnt
                }
            ]
        })

        var pie_data = []
        var index = 0
        for(let item of ques_cnt){
            let ques_obj = {}
            ques_obj['value'] = item
            ques_obj['name'] = ques[index]
            pie_data.push(ques_obj)
            index = index + 1
        }
        myPie.setOption({
            title: {
                text: `VQA 历史问题分析`,
                // subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <b/>{b} : {c} ({d}%)"
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ques
            },
            series: [{
                name: 'question',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: pie_data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0,0,0,0.5)'
                    }
                }
            }]
        })
    }

    render() {
        return (
            <div className='whole'>
                <Toptitle /><br />
                <div className='sider-charts'>
                    <Sider />
                    <div className="charts">
                        <div
                            id='pie'
                            style={{ height: 400 }}
                            className="echart-pie"
                        >
                        </div>
                        <div
                            id='bar'
                            style={{ height: 400 }}
                            className="echart-bar"
                        >
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
// 验证组件中的参数类型
MyCharts.propTypes = {
    user: PropTypes.string.isRequired,
    rec: PropTypes.array.isRequired,
    nums: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
    return  (state => state.vqa_user)
}

export default withRouter(
    connect(
        mapStateToProps,
    )
    (MyCharts)
);