import React, { Fragment, useState } from 'react'

const Button = ({ type, text, icon, action, theme, customTextColor }) => {
    const [hover, setHover] = useState(false)
    const toggleHover = () => {
        setHover(!hover)
    }
    const addLight = function (color, amount) {
        let cc = parseInt(color, 16) + amount;
        let c = (cc > 255) ? 255 : (cc);
        c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`;
        return c;
    }
    const subtractLight = function (color, amount) {
        let cc = parseInt(color, 16) - amount;
        let c = (cc < 0) ? 0 : (cc);
        c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`;
        return c;
    }
    const lighten = (color, amount) => {
        color = (color.indexOf("#") >= 0) ? color.substring(1, color.length) : color;
        amount = parseInt((255 * amount) / 100);
        return color = `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4), amount)}${addLight(color.substring(4, 6), amount)}`;
    }
    const darken = (color, amount) => {
        color = (color.indexOf("#") >= 0) ? color.substring(1, color.length) : color;
        amount = parseInt((255 * amount) / 100);
        return color = `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(color.substring(2, 4), amount)}${subtractLight(color.substring(4, 6), amount)}`;
    }

    const btnColor = (text) => {
        switch (text) {
            case 'standard':
                return {
                    bg: 'bg-blue-800',
                    hover: 'bg-blue-900'
                }

            case 'warning':
                return {
                    bg: 'bg-yellow-600',
                    hover: 'bg-yellow-700'
                }

            case 'danger':

                return {
                    bg: 'bg-red-700',
                    hover: 'bg-red-800'
                }

            case 'success':
                return {
                    bg: 'bg-green-800',
                    hover: 'bg-green-900'
                }

            default:
                break;
        }
    }
    return (
        <Fragment>
            <button
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
                onClick={() => action()}
                style={!type ? hover ? { backgroundColor: darken(theme, 10), color: customTextColor } : { backgroundColor: theme, color: customTextColor } : {}}
                className={`inline-flex m-2 py-1 px-4 rounded-md font-semibold text-gray-50 hover:${type ? btnColor(type).hover : ''} ${type ? btnColor(type).bg :
                    ''} transition-all ease-in-out duration-200 hover:shadow`} >
                {icon}
                <span>{text}</span>
            </button>
        </Fragment>
    )
}

export default Button
