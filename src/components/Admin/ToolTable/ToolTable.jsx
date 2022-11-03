import React from 'react';
import './tooltable.scss';
import { useHistory } from 'react-router';

const ToolTable = ({linkAdd}) => {
    let history = useHistory();
    return (
        <div className="tooltable">
            <div className="tooltable__search">
                <input type="text" placeholder="Search here..."></input>
                <i className='bx bx-search'></i>
            </div>

            <div className="tooltable_right">
                <button className="add-row" onClick={()=> history.push(linkAdd)}>
                    <span><i class='bx bx-plus icon-add'></i> </span>
                    <span>Add new</span>
                </button>
            </div>
        </div>
    )
}

export default ToolTable