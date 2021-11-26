import React from "react";
import ReviewService from "../ReviewService/ReviewService";

const ModalAllReviews = () => {
    return(
        <div className="flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-70">
            <div className="w-4/6 h-5/6 bg-white overflow-y-scroll rounded-md ">
                <div className="w-full h-2/6 border-2">
                    Rating
                </div>
                <div>
                    <ReviewService />
                </div>
            </div>
        </div>
    )
}

export default ModalAllReviews;