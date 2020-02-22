import { 
    Calendar, 
    // Alert
} from 'antd';
// import moment from 'moment';
import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Sider from '../components//sider'
import Toptitle from '../components/toptitle'

class MyCalendar extends Component {
    onPanelChange = (value, mode) => {
        console.log(value, mode)
    };

    render() {
        return (
            <div className='whole'>
                <Toptitle />
                <br />
                <div className='sider-calen'>
                    <Sider />
                    <div className="calen" >
                        <Calendar onPanelChange={this.onPanelChange} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MyCalendar)