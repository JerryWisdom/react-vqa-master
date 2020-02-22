import React from 'react'
import LogoImg from '../assets/pic/vqa.png'

class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img 
                    src={ LogoImg } 
                    alt=""
                />
            </div>
        )
    }
}

export default Logo