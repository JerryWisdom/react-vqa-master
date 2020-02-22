import React, {Component} from 'react'
import { Calendar } from 'antd'

function onPanelChange(value, mode) {
  console.log(value, mode);
}

class SideCalendar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            // width: 300, 
            <div className='box'>
                <Calendar
                    fullscreen={false} 
                    onPanelChange={onPanelChange}
                />
            </div>
        );
    }
}

export default SideCalendar
