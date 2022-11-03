import './style.scss'
import Button01 from '../Button01';
import NumberFormat from 'react-number-format';
import StarRated from '../StarRated';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { addProductCartAsync } from '../../../redux/actions/cartAction';

export default function ProductItem({
    isHorizontal = false,
    image="/assets/images/pi-catusWater.jpg", 
    name="catus water", 
    rated = "4",
    price="385000",
    id
}){
    let history = useHistory();
    const handleOpenDetailProduct = (idP) => {
        //console.log("idP",idP)
        history.push(`/product-detail/${idP}`)
    }

    let dispatch = useDispatch();
    const handleAddCartQuick = (id) => {
        //history.push(window.location.href)
        dispatch(addProductCartAsync({productid: id, number: 1}))
    }
   
    return (

        isHorizontal ? 
        <div className="product-item horizontal" onClick={() => handleOpenDetailProduct(id)}>
            <div className="pi-image">
                <img src={image} alt=""></img>
                <div className="btn-add-to-cart"><Button01 isRadios={true}>add to cart</Button01></div>
                
            </div>
            <div className="pi-info">
                <span className="pi-name">{name}</span>
                <StarRated rated="4"/>
                
                <span className="pi-price"> <NumberFormat value={price} displayType={'text'} thousandSeparator={true} /> VND</span>
            </div>
        </div> :
        
        <div className="product-item" onClick={() => handleOpenDetailProduct(id)}>
            <div className="pi-image">
                    
                <img src={image} alt=""></img>
                <div className="btn-add-to-cart" onClick={() => handleAddCartQuick(id)}><Button01 isRadios={true}>add to cart</Button01></div>
                
            </div>
            <div className="pi-info">
                <span className="pi-name">{name}</span>
                <StarRated rated={rated}/>
                
                <span className="pi-price"> <NumberFormat value={price} displayType={'text'} thousandSeparator={true} /> VND</span>
            </div>
        </div>
    )
}