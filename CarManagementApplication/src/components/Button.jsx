import React from 'react'

function Button(
    text = '',
    type = 'button',
    bgcolor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
) {
    return (
        <>
            <button
                className={`rounded bg-red-600 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white hover:text-red-600 shadow-red-400 transition duration-150 ease-in-out hover:bg-red-200 hover:font-nedium hover:shadow-red-400 focus:outline-none focus:ring-0 motion-reduce:transition-none ${bgcolor} ${className} ${textColor} `} {...props} type={type}
            >
            </button>
        </>
    )
}

export default Button
