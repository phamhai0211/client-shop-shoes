import React  from 'react'
import { useHistory } from 'react-router'
import './topnav.scss'
import Dropdown from '../Dropdown/Dropdown'

//import user_image from '../../../assets/Admin/images/cat.png'
import user_menu from '../../../assets/json/user_menus.json';
//import { Link } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { loginCheckLocalAsync, logout } from '../../../redux/actions/authAction'

import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { loginCheckLocalAsync, logout } from '../../../redux/actions/authAction';

//console.log("dday nheeeeeeeee: ",curr_user.name)
// const renderUserToggle = (user) =>(
//     <div className="topnav__right-user">
//         <div className="topnav__right-user__image">
//             {
//                 user.image ? <img src = {process.env.REACT_APP_API_IMG + user.image}></img> :
//                 <img src = "/assets/images/avatarDefault.png"></img>
//             }    
//         </div>
//         <div className="topnav__right-user__name">
//             {user.name}
//         </div>
//     </div>
// )
const renderUserToggle = (user) =>(
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            {
                user.image && !(user.image===" ") ? <img src = {process.env.REACT_APP_API_IMG + user.image} alt=""></img> :
                <img src = "/assets/images/avatarDefault.png" alt=""></img>
            }    
        </div>
        <div className="topnav__right-user__name">
            {user.email}
        </div>
    </div>
)



const TopNav = () => {
    const isLogin = useSelector((state) => state.auth.isLogin);
    const userCurrent = useSelector(state => state.auth.currentUser); 

    // const userCurrent = {
    //     "name": "Oggy",
    //     "image": ""
    // }
     //kt render
    useEffect(()=>{   
        if(Cookies.get('X-Auth-Token')){
            const decoded = jwt_decode(Cookies.get('X-Auth-Token'));
            dispatch(loginCheckLocalAsync())
            //dispatch(loginCheckLocalAsync(localStorage.getItem("userCurrentId")))
        }
    },[])


    let history = useHistory();
    let dispatch = useDispatch();
    const handleLogOut = () => {
        Cookies.remove('X-Auth-Token')
        //dispatch(saveCartAsync({id: userCurrent.id,cart: localStorage.getItem("cart")}))
        dispatch(logout());
        console.log("curren user nheeeeeeeeee: ",userCurrent,isLogin)
        window.location.href = "/"

    }
    
    return (
        <div className="topnav">
            <div className="topnav__search">
                {/* <input type="text" placeholder="Search here..."></input>
                <i className='bx bx-search'></i> */}
            </div>

            <div className="topnav_right">
                <div className="topnav__right-item">
                    {
                        userCurrent &&
                        <Dropdown
                            // icon = 'bx bx-user' 
                            customToggle={()=> renderUserToggle(userCurrent)} 
                            contentData={user_menu}
                            renderItems={
                                <div>
                                    <div className="notification-item">
                                        <i className='bx bx-user'></i>
                                        <span>Profile</span>
                                    </div>
                            
                                    <div className="notification-item">
                                        <i className="bx bx-cog"></i>
                                        <span>Settings</span>
                                    </div>
                            
                                    <div className="notification-item" onClick={()=>handleLogOut()}>
                                        <i className="bx bx-log-out-circle bx-rotate-180"></i>
                                        <span>Logout</span>
                                    </div>
                                </div>
                            }
                        />
                    }
                    
                </div>

            </div>
        </div>
    )
}

export default TopNav
