import Item from '../../Guest/HomeCategory/item';
import './style.scss';


// {
//     label: 'Chưa xác nhận',
//     //subtitle: '10%',
//     name: 'step 1',
//     //content: step1Content,
//     value: 1
// }
export default function ProcessStepBar({
    containerClass,
    startStep,
    stepnow,
    listStep,
    handleNextStepOnclick
}){
    return(
        <div className={containerClass}>
            <ul class="progressbar">
                {
                    listStep.map((item, index)=>
                        <li className={stepnow > item.value ? "complete" : stepnow == item.value ? "active": ''}>{item.label}</li>
                    )
                }
            </ul> 
            <div>
                <div onClick={handleNextStepOnclick}>Next</div>
            </div> 
        </div>
        
    )
    

}