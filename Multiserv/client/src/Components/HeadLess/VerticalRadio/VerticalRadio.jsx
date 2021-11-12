import React, { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { FaCheckCircle } from 'react-icons/fa';


export default function VerticalRadio({ menu, theme, callBack }) {
    const [selected, setSelected] = useState(menu[0])
    useEffect(() => {
        callBack(selected)
    }, [selected])

    return (
        <div style={{ width: '28rem' }} className="p-4">
            <div className="w-full max-w-md mx-auto">
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                    <div className="space-y-2 ">
                        {menu.map((plan) => (
                            <RadioGroup.Option
                                key={plan.name}
                                as="fragment"
                                value={plan}
                            >
                                {({ active, checked }) => (
                                    <div
                                        style={selected.name === plan.name ? { backgroundColor: theme, color: 'white' } : { backgroundColor: 'rgba(255, 255, 255, 1)' }}
                                        className={
                                            `${active
                                                ? 'ring-2 ring-offset-2 ring-offset-blue-50 ring-white ring-opacity-10'
                                                : ''
                                            }
                                            relative rounded-lg shadow-md px-5 py-4 text-left cursor-pointer flex focus:outline-none my-3 `
                                        }>
                                        <>
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center">
                                                    <div className="text-sm">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className={`font-medium  ${selected.name === plan.name ? 'text-white' : 'text-gray-900'
                                                                }`}
                                                        >
                                                            {plan.name}
                                                        </RadioGroup.Label>
                                                        <RadioGroup.Description
                                                            as="span"
                                                            className={`inline ${selected.name === plan.name ? 'text-sky-100' : 'text-gray-500'
                                                                }`}
                                                        >
                                                            <span>
                                                                {plan.descr1}
                                                            </span>{' '}
                                                            <span aria-hidden="true">&middot;</span>{' '}
                                                            <span>{plan.descr2}</span>
                                                        </RadioGroup.Description>
                                                    </div>
                                                </div>
                                                {selected.name === plan.name && (
                                                    <div className="flex-shrink-0 text-white">
                                                        <FaCheckCircle className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    </div>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}


