
import './Arrow.scss'
import { ChevronForwardOutline } from 'react-ionicons'
export default function ArrowNext(props){
    return (
        <span className="arrow nextArrow" onClick={props.onClick}>
          <ChevronForwardOutline
              color={'#fff'} 
              title={"next-arrow"}
              height="40px"
              width="40px"
          />
        </span>
    );
}