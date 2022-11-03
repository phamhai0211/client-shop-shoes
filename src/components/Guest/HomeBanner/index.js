import './style.scss';

export default function HomeBanner(){
    const style = {
        backgroundImage: "url('/assets/images/HomeBanner1.jpg')"
    }

    return(
        <div className="home-banner-container" >
            <div className="bg" style={style}>
                <div className="hbc-container">
                    <div className="name-shop">with <span className="name">SHOESKICK</span></div>
                    <div className="isay"> beautiful like a flower and mystery like Universe</div>
                   
                </div>
            </div>
            
        </div>
    )
}