import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiOutlineSelector } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";

export default function ListBox({ options, callBack, text, theme }) {
    const [selected, setSelected] = useState('')
    useEffect(() => {
        callBack(selected)
    }, [selected])

    return (
        <div className="w-72 z-auto">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="cursor-pointer font-semibold w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{selected ? selected : text}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                        <Listbox.Options className="absolute text-left z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((option, index) => (
                                <Listbox.Option
                                    key={index}
                                    as={Fragment}
                                    className={({ active }) =>
                                        `rounded-md ${active ? ' text-white font-semibold text-amber-900 bg-amber-100' : 'text-gray-900'}
                                    select-none relative py-2 pl-10 pr-4 cursor-pointer`
                                    }
                                    value={option}
                                >
                                    {({ selected, active }) => (
                                        <div style={{ backgroundColor: active ? theme : 'unset' }}>
                                            <span
                                                className={`${selected || active ? 'font-semibold' : 'font-medium'
                                                    } block truncate`}
                                            >
                                                {option}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`${active ? 'text-amber-600' : 'text-amber-600'
                                                        }
                                                        absolute inset-y-0 left-0 flex items-center pl-3`}
                                                >
                                                    <FiCheck className="text-lg" aria-hidden="true" />
                                                </span>
                                            ) : null}
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