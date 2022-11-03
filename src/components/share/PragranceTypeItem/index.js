import './style.scss';

export default function PragranceTypeItem({
    name = "Citrus",
    img = "/",
    desc = "Nhóm hương cam chanh đã xuất hiện từ rất lâu và có mặt trong rất nhiều chai nước hoa. Ngoài cam, chanh là mùi hương chính của nhóm mùi này, những hương khác như cam bergamot, bưởi, quýt cũng thường được sử dụng mang đến sự tươi mới, sảng khoái cho dòng mùi này. Đối với nhóm mùi này, dùng vào mùa hè sẽ tuyệt vời nhất, mang đến cảm giác mát mẻ, dễ chịu."
}){
    return(
        <div className="pragrance-type-item-container">
            <div className="pti-title-first">
                <div className="pti-background">
                    <img src={img} alt=""></img>
                </div>
                <div className="pti-title">{name}</div>
            </div>
            <div className="pti-content-on-hover">
                <div className="pti-c-title">{name}</div>
                <p className="pti-desc">"{desc}"</p>
            </div>
        </div>
    )
}