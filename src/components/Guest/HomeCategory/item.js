import './item.scss'
import Button01 from '../../share/Button01'


export default function Item({
    children,
    image,
    name,
    isRadios=false,
    width = "180px",
    height = "46px",
    linkTo="/sale"
}){
    return(
        <div className="type-product">
            <div className="product-image"><img src={image} alt=""></img></div>
            <div className="info">{children}</div>
            <div className="product-name"><Button01 isRadios={isRadios} linkTo={linkTo} width={width} height={height}> {name} </Button01></div>         
        </div>
    )
}