import React from 'react'
import { AiFillStar } from "react-icons/ai";

const StarRating = ({ rating }) => {
    return (
        <div className="ml-2 flex">
            <span className="font-semibold text-gray-800 self-center">{rating}</span>
            <div className="inline-flex self-center ml-1">
                <AiFillStar className="text-yellow-500" />
                <AiFillStar className="text-yellow-500" />
                <AiFillStar className="text-yellow-500" />
                <AiFillStar className="text-gray-300" />
                <AiFillStar className="text-gray-300" />
            </div>
        </div>
    )
}

export default StarRating
