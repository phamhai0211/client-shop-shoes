import './style.scss';
import BreakSpace from '../BreakSpace';
export default function TitleSection({title}){

    return(
        <div className="title-section-container">
            <BreakSpace h="40px"/>
            <div className="ts-title">{title}</div>
            <BreakSpace h="30px"/>
        </div>
    )
}