/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react'

const Input = ({ type, name, placeholder, theme, callBack }) => {
    const style = {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        '&:focus': {
            outline: '2px solid ',
            outlineColor: theme
        }
    }
    return (
        <>
            <input type={type}
                name={name}
                id={name}
                key={name}
                placeholder={placeholder}
                css={style}
                className="border border-gray-400 px-2 py-1 rounded-md my-2 mx-4"

            />
        </>
    )
}

export default Input
