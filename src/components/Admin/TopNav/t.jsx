import React from 'react'

import './topnav.css'
import Dropdown from '../Dropdown/Dropdown'

import user_image from '../../../assets/Admin/images/cat.png'
import user_menu from '../../../assets/Admin/JsonData/user_menus.json'
import { Link } from 'react-router-dom'

//console.log("dday ne nheeeeeeeee: ",curr_user.name)
const renderUserToggle = (user) =>(
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            {
                user.image ? <img src = {process.env.REACT_APP_API_IMG + user.image}></img> :
                <img src = "/assets/images/avatarDefault.png"></img>
            }    
        </div>
        <div className="topnav__right-user__name">
            {user.name}
        </div>
    </div>
)
const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const TopNav = () => {

    const curr_user = localStorage.getItem("userCurrent") ?  JSON.parse(localStorage.getItem("userCurrent")) : {
        name: "",
        image: "",
    
    }
    
    return (
        <div className="topnav">
            <div className="topnav__search">
                {/* <input type="text" placeholder="Search here..."></input>
                <i className='bx bx-search'></i> */}
            </div>

            <div className="topnav_right">
                <div className="topnav__right-item">
                    <Dropdown
                        // icon = 'bx bx-user' 
                        customToggle={()=> renderUserToggle(curr_user)} 
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}  
                    />
                </div>

            </div>
        </div>
    )
}

export default TopNav
