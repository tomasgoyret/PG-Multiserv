import React from "react";


const ProgressRating = ({porcentaje}) => {
    
    return(
        <div>
            <div className='h-3 w-48 bg-gray-300 rounded'>
                <div
                    style={{ width: Number(porcentaje) * 2}}
                    className={`h-full rounded ${
                        porcentaje < 100 ? 'bg-blue-700': 'bg-gray-300'}`}>
                </div>
            </div>
        </div>
    )
};

export default ProgressRating;