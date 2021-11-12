import React, { useState, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { FaChevronDown } from "react-icons/fa";

export default function Faq({ faqs, buttonColor, buttonTextColor }) {

    return (
        <div className="w-auto py-4 transition-all ease-in-out duration-200 ">
            {

                faqs.map((faq, index) => {
                    return (
                        <div key={index} className="w-96 p-2 bg-white rounded-2xl transition-all ease-in-out duration-200">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            style={{ color: buttonTextColor, backgroundColor: buttonColor }}
                                            className=" flex justify-between w-full px-4 py-3 text-sm font-medium text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 transition-all ease-in-out duration-200 filter hover:brightness-90">
                                            <span className="w-full">{faq.title}</span>
                                            <FaChevronDown
                                                style={{ color: buttonTextColor }}
                                                className={`transition-all ease-in-out duration-200 ${open ? 'transform rotate-180' : ''
                                                    } self-center`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600 font-medium">
                                            {faq.text}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    )
                })

            }
        </div>
    )
}