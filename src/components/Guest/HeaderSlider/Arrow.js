import './Arrow.scss'

export function ArrowNext(props){
    return (
        <span className="arrow nextArrow" onClick={props.onClick}>
            <i class='bx bx-chevron-right next-arrow-icon'></i>

            {/* <ChevronForwardOutline
              color={'#f0f0f0'} 
              title={"next-arrow"}
              height="20px"
              width="20px"
          /> */}
        </span>
    );
}

export function ArrowPrev(props){
    return (
        <span className="arrow prevArrow" onClick={props.onClick}>
            <i class='bx bx-chevron-left prev-arrow-icon' ></i>
          {/* <ChevronBackOutline
            color={'#f0f0f0'} 
            title={"prev-arrow"}
            height="20px"
            width="20px"
          /> */}
        </span>
    );
}
