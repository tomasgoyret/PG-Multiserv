import React from 'react'
import ReactStars from 'react-stars'


const StarRatingReview = ({ rating, total }) => {


    return (
        <>
            {
                rating ? 
                    (
                        <div className="w-48 mr-4 flex flex-col items-end">
                            <h2 className="font-semibold text-left text-6xl text-gray-700 fontRating mt-2">{rating.toFixed(1)}</h2>
                                <ReactStars
                                    size={30}
                                    color1="#D1D5DB"
                                    color2="#F59E0B"
                                    count={5}
                                    value={rating}
                                    half={true}
                                    edit={false}
                                />
                            <p className="m-0 font-span text-sm font-semibold">Promedio entre {total.length} reseñas</p>
                        </div>
                    ) : 
                    (
                        <div className="ml-2 flex">
                            <div className="w-1 h-1 rounded-full bg-gray-400 self-center mr-2"></div>
                            <span className="font-semibold text-gray-500 self-center select-none">Sin reviews</span>
                        </div>
                )
            }
        </>
    )
}

export default StarRatingReview
