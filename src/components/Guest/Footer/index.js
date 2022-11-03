import { Link } from 'react-router-dom';
import Button01 from '../../share/Button01';
import './style.scss';

export default function Footer(){

    return(
        <div className="footer-container">
            <div className="container">
                <div className="row-hh f-content">
                    <div className="col-5 f-local">
                        <div className="f-item-title">SHOESKICK</div>
                        <div className="f-item-content">
                            <span><i class='bx bx-map'></i> 97 Man Thien, Hiep Phu, Quan 9</span>
                            <span><i class='bx bx-envelope' ></i> shoeskick@gmail.com</span>
                            <span><i class='bx bx-phone'></i> 0388304180</span>
                        </div>
                        
                    </div>

                    <div className="col-4 f-link">
                        <div className="f-item-title">Useful Links</div>
                        <div className="f-item-content row-hh">
                            <div className="col-6">
                                <span><Link to="/">Home</Link></span>
                                <span><Link to="/">Sale</Link></span>
                                <span><Link to="/">Blog</Link></span>
                            </div>
                            <div className="col-6">
                                <span><Link to="/">About</Link></span>
                                <span><Link to="/">Contact</Link></span>
                                <span><a href="https://www.google.com">Google</a></span>
                            </div>
                        </div>
                    </div>

                    <div className="col-3 f-subcribe">
                        <div className="f-item-title">Subcribe</div>
                        <div className="f-item-content">
                            <input id="email-customer" placeholder="exam@gmail.com"></input>
                            <div className="f-btn-sb"><Button01 isRadios={true}>Subcribe</Button01></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="f-last">
                <span className="fl-icon"><i class='bx bx-crown'></i></span>
                <span className="fl-icon"><i class='bx bx-rocket'></i></span>
                <span className="fl-icon"><i class='bx bx-planet'></i></span>
            </div>
        </div>
    )
}