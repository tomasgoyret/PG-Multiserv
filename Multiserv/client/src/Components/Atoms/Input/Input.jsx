/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'

const Input = ({ type, id, placeholder, theme, callBack, label, autocomplete, flexed }) => {
    const [value, setValue] = useState('')

    const flexedStyle = {
        display: 'flex',
        flexDirection: 'column',

        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
    const style = {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        width: flexed ? '100%' : '16rem',
        '&:focus': {
            outline: '2px solid ',
            outlineColor: theme
        },
        '&::placeholder': {
            fontWeight: '400'
        }
    }
    const handleInputValue = (e) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        callBack(value)
    }, [value])
    return (
        <div css={flexed && flexedStyle} className="my-2 px-4">
            <label
                htmlFor={id}
                className={`${flexed ? 'text-sm mb-2' : 'text-base'} font-semibold text-gray-600 mr-4 select-none cursor-pointer`}>
                {label}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                key={id}
                placeholder={placeholder}
                css={style}
                onChange={handleInputValue}
                value={value}
                autoComplete="true"
                className="border border-gray-400 p-2 rounded-md font-medium"

            />
        </div>
    )
}

export default Input
