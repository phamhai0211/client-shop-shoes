import './style.scss'
import vari from '../../../assets/scss/vari.module.scss';
import React from 'react';

export default function StarRated({rated}){
    const int_part = Math.trunc(rated); 
    const float_part = Number((rated-int_part).toFixed(2));

    return(
        <div className="star-rated-container">
            {
                [...Array(5)].map((start,i) => {
                    const ratingValue = i + 1;
                    return(
                        <span>
                            {
                                float_part > 0 && ratingValue === (int_part + 1) ? 
                                <i class='bx bxs-star-half star-icon' style={{"color": `${vari.starRated}`}}></i> :
                                ratingValue <= rated ? 
                                <i class='bx bxs-star star-icon' style={{"color": `${vari.starRated}`}}></i> :
                                <i class='bx bxs-star star-icon' style={{"color": `${vari.starRatingUnfilled}`}}></i>
                            }  
                        </span>
                    )
                })
            }
        </div>
    )
}