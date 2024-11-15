import { useId } from "react"
import React from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = '',
    ...props

}, ref) {

    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <>
                    <label
                        htmlFor={id}
                        className="inline-block mb-1 pl-1"
                    >
                        {label}
                    </label><br />
                </>
            )}
            <input 
                type={type} 
                className={`${className}`}
                ref={ref}
                id={id}
                {...props}
            />

        </div>
    )
})


export default Input
