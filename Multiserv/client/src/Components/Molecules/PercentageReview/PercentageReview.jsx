import React from "react";
import { Review } from "../../../Hooks/useReviews";
import ProgressRating from "../ProgressBar/ProgressBar";

const PercentageReview = () => {
    const {porcentaje, title, rating} = Review();

    return (
        <div className="block">
            {
                porcentaje.map(p => (
                    <div className="flex my-3 items-center w-auto h-5">
                        <p className="m-0 w-20">{title.next().value}</p>
                        <ProgressRating porcentaje={p} />
                        <p className="m-0 mx-2">{p ? Math.round((p * rating.length) / 100): 0}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default PercentageReview;
