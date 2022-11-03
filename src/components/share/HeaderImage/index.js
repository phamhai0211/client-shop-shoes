import './style.scss'
export default function HeaderImage({
    img, 
    title
}){
    return(
        <div className="header-image-container">
            <div className="image">
                <img src={img} alt=""></img>
            </div>
            <h2 className="title">{title}</h2>
        </div>
    )
}