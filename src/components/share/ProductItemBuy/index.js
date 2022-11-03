import "./style.scss"
import NumberFormat from 'react-number-format';

export default function ProductItemBuy({
    img = "/assets/images/slider02.jpg",
    name = "Mug Adventure",
    price = "16.00",
    quantity = "1",
    priceTotal = "16.00",
    capacity

}){
    return(
        <div className="item-product-buy-container">
            <div className="row-hh">
                <div className="col-2 img-col">
                    <div className="img-product">
                        <img src={img} alt=""></img>
                    </div>
                </div>

                <div className="col-3 name-col">
                    <h3>{name} <br/><span className="color-size">capacity: {capacity}</span></h3>
                </div>

                <div className="col-2 price-col">
                    <h3><NumberFormat value={price} displayType={'text'} thousandSeparator={true} /> VND</h3>
                </div>

                <div className="col-2 quantity-col">
                    <h3>{quantity}</h3>
                </div>

                <div className="col-2 price-total-col">
                    <h3><NumberFormat value={priceTotal} displayType={'text'} thousandSeparator={true} /> VND</h3>
                </div>

                {/* <div className="col-1 button-col">
                    <span><i class='bx bx-trash icon-delete'></i></span>
                </div> */}
            </div>
        </div>

    )

}