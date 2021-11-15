import React from 'react'
import ReactStars from 'react-stars'

const StarRating = ({ rating }) => {

    return (
        <>
            {
                rating ? (<div className="ml-2 flex select-none">
                    <div className="inline-flex self-center mr-2">
                        <ReactStars
                            size={18}
                            color1="#D1D5DB"
                            color2="#F59E0B"
                            count={5}
                            value={rating}
                            half
                            edit={false}
                        />
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-400 self-center mr-2"></div>
                    <span className="font-semibold text-gray-700 self-center">({rating})</span>
                </div>) : (
                        <div className="ml-2 flex">
                            <div className="w-1 h-1 rounded-full bg-gray-400 self-center mr-2"></div>
                            <span className="font-semibold text-gray-500 self-center select-none">Sin reviews</span>
                        </div>
                )
            }
        </>
    )
}

export default StarRating
