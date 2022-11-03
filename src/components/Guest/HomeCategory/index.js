import './style.scss';
import Item from "./item";

export default function HomeCategory(){

    return(
        <div className="home-category-container container">
            <div className="row-hh">
                <div className="col-4">
                   <div className="row-hh row-long">
                        <Item 
                            name = "Female"
                            image = "/assets/images/nike.jpg"
                        />
                   </div>
                   <div className="row-hh row-short">
                        <Item 
                            name = "Male"
                            image = "/assets/images/cateadidas.jpg"
                        />
                   </div>
                </div>

                <div className="col-4">
                   <div className="row-hh row-short">
                        <Item 
                            name = "Children"
                            image = "/assets/images/conver.jpg"
                        />
                   </div>
                   <div className="row-hh row-long">
                        <Item 
                            name = "Sport"
                            image = "/assets/images/vans.jpg"
                        />
                   </div>
                </div>

                <div className="col-4">
                   <div className="row-hh row-long">
                        <Item 
                            name = "Sneaker"
                            image = "/assets/images/jordan.jpg"
                        />
                   </div>
                   <div className="row-hh row-short">
                        <Item 
                            name = "Boot"
                             //image = "/assets/images/HomeCategory06.png"
                            image = "/assets/images/balance.jpg"
                        />
                   </div>
                </div>
            </div>
        </div>
    )
}