import "./style.scss";
import BreakSpace from "../../../components/share/BreakSpace";
import HeaderBar from "../../../components/Guest/HeaderBar";
import HeaderImage from "../../../components/share/HeaderImage";
import Button01 from "../../../components/share/Button01";

export  default function Contact(){
    return(
        <div className="contact-page-container">
            <HeaderBar/>
            <HeaderImage img= "/assets/images/HeaderImage.jpg" title="Contact"/>
            <BreakSpace h="30px"/>
            <div className="container">
                <div className="row-hh">
                    <div className="col-5 map">
                        <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.2612259929483!2d106.78490560804842!3d10.847810698068317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527131ae8b249%3A0x4d2d3c8fab7d3c2e!2zOTcgxJDGsOG7nW5nIE1hbiBUaGnhu4duLCBIaeG7h3AgUGjDuiwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1624097824204!5m2!1svi!2s" width="520" height="510" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
                    </div>
                    <div className="col-7 send-message">
                        <h3 className="title">Send us your message</h3>
                        <div className="input">
                            <input type="text" placeholder="Full Name"></input>
                        </div>
                        <div className="input">
                            <input type="text" placeholder="Phone Number"></input>
                        </div>
                        <div className="input">
                            <input type="text" placeholder="Email Address"></input>
                        </div>
                        <div className="input">
                            <textarea placeholder="Message"></textarea>
                        </div>
                        <div>
                            <Button01 isRadios={true}>Send</Button01>
                        </div>

                    </div>

                </div>

            </div>
            <BreakSpace h="30px"/>
        </div>
    );
}