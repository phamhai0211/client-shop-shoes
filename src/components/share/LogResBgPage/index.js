import './style.scss';

export default function LogResBgPage({children}){
    const style = {
        backgroundImage: "url('/assets/images/hp06.jpg')"
    }
    return(
        <div className="log-res-bg-page-container">
            <div className="lrbp-bg" style={style}>
                <div className="lrbp-content">
                    <div className="row-hh lrbp-content-row">
                        <div className="col-6 col-deco">
                            <img src="/assets/images/log03.jpg" alt=""></img>
                        </div>
                        <div className="col-6 col-form">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}