import React from "react";
import ProgressRating from "../../Molecules/ProgressBar/ProgressBar";
import ReviewService from "../ReviewService/ReviewService";

const ModalAllReviews = () => {
    return(
        <div className="flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-70">
            <div className="w-4/6 h-5/6 bg-white overflow-y-scroll rounded-md">
                <div className="w-full">
                    <ReviewService mostrarStarRating={true} mostrarPercentageReview={true} />
                </div>
            </div>
        </div>
    )
}

export default ModalAllReviews;