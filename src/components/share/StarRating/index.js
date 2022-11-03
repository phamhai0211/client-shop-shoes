import './style.scss'
import vari from '../../../assets/scss/vari.module.scss';
import React, { useState} from 'react';

export default function StarRating(){
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    
    return(
        <div className="star-rating-container">
            {
                [...Array(5)].map((start,i) => {
                    const ratingValue = i + 1;
                    return(
                        <label>
                            <input type="radio" name="rating" className="radio-rating" 
                                value={ratingValue}
                                onClick={ () => setRating(ratingValue)}
                            />
                            {
                                ratingValue <= (hover || rating) ? 
                                <i class='bx bxs-star star-icon' style={{"color": `${vari.starRatingFilled}`}}
                                    onMouseEnter={()=>setHover(ratingValue)}
                                    onMouseLeave={()=>setHover(null)}
                                ></i> :
                                <i class='bx bxs-star star-icon' style={{"color": `${vari.starRatingUnfilled}`}}
                                    onMouseEnter={()=>setHover(ratingValue)}
                                    onMouseLeave={()=>setHover(null)}
                                ></i>
                            }
                           
                        </label>
                    )
                })
            }
        </div>
    )
}