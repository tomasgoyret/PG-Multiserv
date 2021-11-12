import React from "react";

const Parrafo = ({classDivParrafo, classParrafo, parrafo}) => {
    return(
        <div className={classDivParrafo}>
            <span className={classParrafo}>{parrafo}</span>
        </div>
    )
}

export default Parrafo;