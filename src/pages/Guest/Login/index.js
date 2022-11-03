import './style.scss';
import { Link } from 'react-router-dom';
import LogResBgPage from '../../../components/share/LogResBgPage';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAsync } from '../../../redux/actions/authAction';
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";

export default function Login(){

    const [ClientId,    setClientId]    = useCookies(['Client']);
    const [AccessToken, setAccessToken] = useCookies(['X-Auth-Token']);
    const [UserId,      setUserId]      = useCookies(['UserId']);

    const history = useHistory();
    //const userCurrent = useSelector((state) => state.auth.userCurrent);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleChange(key){
        return(evt) => {
            
            setFormData({
                ...formData,
                [key]: evt.target.value
            })
        }
    }

    function handleSubmit(evt){
        evt.preventDefault();
        console.log("mmmm")
        if(!formData.email || !formData.password){
            return
        }
        dispatch(loginAsync(formData))
        .then(res => {
            //console.log("ok: ",res.ok )
            if (res.ok) {
              // Thành công
                setFormData({
                    email: '',
                    password: ''
                })
                console.log("res.currentUser.roles: ", res)
                // localStorage.setItem("userCurrent", JSON.stringify(res.userCurrent));
                // localStorage.setItem("isLogin", true);
                setAccessToken("X-Auth-Token", res.currentUser.token)
                var decoded = jwt_decode(res.currentUser.token);
                console.log(decoded);
                if(res.currentUser.roles[0] === "Admin" || res.currentUser.roles[0] === "Saler"){
                    history.push('/admin');
                }else if(res.currentUser.roles[0] === "Customer"){
                    history.push('/');
                }
                
                
            } else {
              // Thất bại
              //console.log("status",status)
            }
        });
        
    }

    return(
        <div className="login-container">
            <LogResBgPage>
               <div className="child">
                    <div className="login-title">Đăng nhập</div>

                    <div className="login-content">
                        <form  className="login-form" onSubmit={handleSubmit}>
                            <label>Email</label>
                            <div className="form-group">
                                <input id="email-field" type="email" className="form-control" placeholder="exam@gmail.com" required
                                    value={formData.email} 
                                    onChange={handleChange('email')} 
                                />
                            </div>

                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input id="password-field" type="password" className="form-control" placeholder="your password" required
                                    value={formData.password} 
                                    onChange={handleChange('password')}  
                                />
                                {/* <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" /> */}
                            </div>

                            <div className="form-group last">
                                <span className="btn-left"><Link to="/register">ĐĂNG KÝ</Link></span>
                                <span className="btn-right"><button type="submit" className="form-control btn">Đăng nhập</button></span>
                               
                            </div>

                            {/* <div className="form-group">
                                 <label className="checkbox-wrap">
                                    <span className="custom-checkmark">
                                        <CheckboxOutline
                                            color={'#00000'} 
                                            title={"c"}
                                            height="10px"
                                            width="10px"
                                        />
                                    </span>
                                    Remember Me
                                    <input type="checkbox" className="default-checkmark" defaultChecked />
                                    
                                </label> 

                                <div className="forgot-password">
                                    <a >Forgot Password</a>
                                </div> 

                                <label className="link-sign-in">Bạn chưa có tài khoản?  <Link to="/register">ĐĂNG KÝ</Link> tại đây!</label>
                            </div> */}
                        </form>
                    </div>
                </div>
            </LogResBgPage>
        </div>
    )
}