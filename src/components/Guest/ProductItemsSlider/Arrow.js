import './Arrow.scss'

export function ArrowNext(props){
    return (
        <span className="arrow nextArrow" onClick={props.onClick}>
            <i class='bx bx-chevron-right next-arrow-icon'></i>
        </span>
    );
}

export function ArrowPrev(props){
    return (
        <span className="arrow prevArrow" onClick={props.onClick}>
            <i class='bx bx-chevron-left prev-arrow-icon' ></i>
        </span>
    );
}
