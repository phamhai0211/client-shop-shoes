import './style.scss'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { loginCheckLocalAsync, logout } from '../../../redux/actions/authAction';
import { getCustomerByEmailAsyncB } from '../../../redux/actions/customerAction';

export default function HeaderBar(){
    const isLogin = useSelector((state) => state.auth.isLogin);
    const userCurrent = useSelector(state => state.auth.currentUser); 
    
    // const userCurrent = {
    //     name: "Oggy",
    //     id: 1,
    //     image: " "
    // };

    useEffect(()=>{   
       console.log("nowwwwwwwwww: ",userCurrent)
    },[userCurrent])
    let dispatch = useDispatch();

    // //kt render
    // useEffect(()=>{
    //     if(localStorage.getItem("isLogin") === "true"){
    //         dispatch(loginCheckLocalAsync(localStorage.getItem("userCurrentId")))
    //     }
    // },[])

     //get tt
    useEffect(()=>{   
        if(Cookies.get('X-Auth-Token')){
            const decoded = jwt_decode(Cookies.get('X-Auth-Token'));
            dispatch(loginCheckLocalAsync())
            //dispatch(loginCheckLocalAsync(localStorage.getItem("userCurrentId")))
        }
    },[])

    let history = useHistory();
    const handleOrdersOfUser = (email) => {
        dispatch(getCustomerByEmailAsyncB(email))
        .then(res =>{
            if(res.ok == true){
                console.log("av: ",res.customerId)
                history.push(`/orders/${res.customerId}`);
                
            }
        }
        )
        
    }

    const handleLogOut = () => {
        Cookies.remove('X-Auth-Token')
        //dispatch(saveCartAsync({id: userCurrent.id,cart: localStorage.getItem("cart")}))
        dispatch(logout());
        //console.log("curren user nheeeeeeeeee: ",userCurrent,isLogin)
        window.location.href = "/"
        
        //console.log("localStorage.getItem cart",localStorage.getItem("cart"))
        // localStorage.removeItem("userCurrentId", userCurrent.id);
        // localStorage.setItem("isLogin",false)
        // localStorage.removeItem("cart");
        //history.push("/")
    }     

    return(
        <div className="header-bar row-hh">
            <div className="col-4 logo-page">
                <span><img src="/assets/images/logo.jpg" alt=""></img></span>
            </div>

            <div className="col-4 list-page">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/sale">Shop</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>

            <div className="col-4 icon-tool-page">
                {
                    isLogin &&  <Link to="/cart"><span className="icon-cart-2"><i class='bx bx-shopping-bag icon-2'></i></span></Link> 
                }
               

                {
                    isLogin && userCurrent ?
                        <span className="icon-cart-2" onClick={()=>handleOrdersOfUser(userCurrent.email)}><i class='bx bx-detail icon-2'></i></span>
                    : ''
                }

                {
                    isLogin && userCurrent ?
                        <div className="info-user-current"> 
                            <span className="icon-logout-2" onClick={()=>handleLogOut()}><i class='bx bx-log-out-circle icon-2' ></i></span>  
                            {
                                userCurrent.image && !(userCurrent.image===" ") ? <img alt="" src = {process.env.REACT_APP_API_IMG + userCurrent.image}></img> :
                                <img alt="" src = "/assets/images/cat.png"></img>
                            }  
                             <span className="iuc-name">{userCurrent.email}</span>
                        </div> 
                    : <Link to="/login"><span className="icon-login-2"><i class='bx bx-log-in-circle icon-2' ></i></span></Link>
                } 

            </div> 
        </div>
    )
}

