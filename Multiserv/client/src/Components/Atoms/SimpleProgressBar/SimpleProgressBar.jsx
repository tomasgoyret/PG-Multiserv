import React from 'react'

const SimpleProgressBar = ({ status, color }) => {
    return (
        <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                <div
                    style={{ width: status, backgroundColor: color }}
                    className="
        shadow-none
        flex flex-col
        text-center
        whitespace-nowrap
        text-white
        justify-center
        transition-all
        ease-out
        duration-500
      "
                ></div>
            </div>
        </div>
    )
}

export default SimpleProgressBar
