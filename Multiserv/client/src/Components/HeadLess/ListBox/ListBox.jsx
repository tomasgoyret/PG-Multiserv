/** @jsxImportSource @emotion/react */
import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiOutlineSelector } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";

export default function ListBox({ options, callBack, text, theme, className, width, customBorder, includeIconOnDesc }) {
    const [selected, setSelected] = useState(options[0].name)
    const [iconSelected, setIconSelected] = useState(options[0].icon || '')
    /* (value) => {
        console.log(value)
        callBack(options[value])
        setSelected(value)
    } */
    const buttonStyle = {
        borderColor: customBorder ? customBorder : 'unset',
        outline: '2px solid transparent',
        outlineOffset: '2px',
        '&:focus': {
            outline: '2px solid ',
            outlineColor: theme
        }
    }
    return (
        <div style={{ width: `${width ? width : '18rem'}` }} className={`${className} ${!width && 'mx-2'}`}>
            <Listbox value={selected} onChange={(value) => {
                const obj = options.find(option => option.name === value)
                callBack(obj)

                if (obj.icon) {
                    setIconSelected(obj.icon)
                }
                setSelected(value)
            }}>
                <div className="relative mt-1">
                    <Listbox.Button css={buttonStyle} className={`cursor-pointer font-semibold w-full ${width ? 'py-2.5' : 'py-2'} pl-3 pr-10 text-left ${customBorder ? 'border' : 'shadow-md'} bg-white rounded-lg 
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm`}>
                        <span className="truncate">{includeIconOnDesc ? (
                            <span className="flex">
                                {iconSelected}
                                <span className="ml-1">{selected}</span>
                            </span>
                        ) : selected}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center ml-2 pr-2 pointer-events-none">
                            <HiOutlineSelector
                                className="self-center text-xl text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options as="div" style={{ zIndex: 1000 }} className="absolute text-left z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((option, index) => (
                                <Listbox.Option
                                    key={index}
                                    as={Fragment}
                                    className={({ active }) =>
                                        `rounded-md ${active ? ' text-white font-semibold' : 'text-gray-900'}
                                    select-none relative py-2 pl-10 pr-4 cursor-pointer`
                                    }
                                    value={option.name}
                                >
                                    {({ selected, active }) => (
                                        <div style={{ backgroundColor: active ? theme : 'unset' }}>
                                            <span
                                                className={`${selected || active ? 'font-semibold' : 'font-medium'
                                                    } block truncate`}
                                            >
                                                {option.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`${active ? 'text-amber-600' : 'text-amber-600'
                                                        }
                                                        absolute inset-y-0 left-0 flex items-center pl-3`}
                                                >
                                                    <FiCheck className="text-lg" aria-hidden="true" />
                                                </span>
                                            ) : <span
                                                className={`${active ? 'text-amber-600' : 'text-amber-600'
                                                    }
                                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                            >
                                                {option.icon || ''}
                                            </span>}
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}