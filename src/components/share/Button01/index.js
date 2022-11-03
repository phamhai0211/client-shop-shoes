import './style.scss';
import { Link } from 'react-router-dom';

export default function Button01({
    children,
    width = "180px",
    height = "46px",
    isRadios = false,
    linkTo="/",
    
}){
    if(isRadios){
        return(
           <Link to={linkTo}><div className="my-button radios" style={{"width":`${width}`, "height": `${height}`, "line-height": `${height}`}}>{children}</div></Link>
        ) 
    }
    return(
        <Link to={linkTo}><div className="my-button" style={{"width":`${width}`, "height": `${height}`, "line-height": `${height}`}}>{children}</div></Link>
    )
}