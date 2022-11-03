import BreakSpace from "../../../components/share/BreakSpace";
import HeaderImage from "../../../components/share/HeaderImage";

import "./style.scss";

export  default function About(){
    return(
        <div className="about-page-container">
            <HeaderImage img= "/assets/images/HeaderImage.jpg" title="About"/>
            <BreakSpace h= "30px"/>
            <div className="container">
                <div className="row-hh">
                    <div className="col-3 image">
                        <img src = "/assets/images/decoPN03.png" alt=""></img>
                    </div>
                    <div className="col-9 content">
                        <h3 className="title">Our Story</h3>
                        <p className="story">Perfume is a fragrance that is sprayed or rubbed on the body of a person. The purpose of perfume is to make people smell better and to make them more attractive. Perfume was the first luxury product in the world with an established market for consumers.</p>
                        <p className="story">The term "perfume" derives from Arabic "فروم", meaning something such as "poured forth". Perfumery, as the art of making fragrant perfumes, began in ancient.</p>    
                        <p className="story">Welcome to Cosmos, the #1 perfume shop for all your scenting needs. We have a wide range of perfumes for you to choose from and we can help you find the one that suits you best.To find the perfume to suit your personality, we offer personalized consultations. Our range includes perfumes from some of the world’s best perfume brands like Chanel and Hermes.</p>
                        <p className="story">We only use the finest ingredients including oils, which come from natural sources like flowers and plants.</p>
                    </div>

                </div>

            </div>
            <BreakSpace h= "30px"/>
        </div>
    );
}