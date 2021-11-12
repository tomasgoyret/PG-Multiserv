import React, { Fragment, useState } from 'react'
import { Menu, Transition } from "@headlessui/react"
import { FaChevronDown } from "react-icons/fa";


const Dropdown = ({ head, options, theme }) => {
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
    return (
        <Fragment >
            <Menu as="div" className="w-56 relative">
                <Menu.Button as="button" onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={hover ? { backgroundColor: darken(theme, 15) } : { backgroundColor: darken(theme, 0) }} className="inline-flex justify-center px-4 py-2 rounded-lg font-semibold  text-gray-50 text-sm focus:outline-none hover:bg-yellow-500 hover:shadow-md transition-all ease-in-out duration-150" >
                    {head}
                    <FaChevronDown

                        className={({ active }) => `self-center ml-2 ${active ? 'transform rotate-180' : ''
                            }`}
                    />
                </Menu.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="inline-flex flex-col shadow-md absolute top-10 left-0 z-50 bg-white focus:outline-none rounded-md p-1 w-56"
                    >
                        {
                            options.map((group, i) => {
                                return Array.isArray(group) ? (
                                    <div key={'group_' + i} className="pb-1 mb-1 border-b border-gray-100">
                                        {group.map((element, index) => {
                                            return (
                                                <Menu.Item key={index} disabled={element.disabled} >
                                                    {({ active, disabled }) => (
                                                        <button onClick={() => element.action()}
                                                            style={{ backgroundColor: active ? theme : 'unset' }} className={`focus:outline-none inline-flex py-1 px-4 font-medium w-full rounded-md ${disabled ? 'text-gray-300 cursor-not-allowed' : active ? `text-gray-50` : 'text-gray-800'}`}>
                                                            <div className="w-4 self-center mr-2">
                                                                {element.icon}
                                                            </div>
                                                            {element.title}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <Menu.Item key={'group_' + i} disabled={group.disabled} >
                                        {({ active, disabled }) => (
                                                <button onClick={() => group.action()} style={{ backgroundColor: active ? theme : 'unset' }} className={`focus:outline-none inline-flex py-1 px-4 font-medium w-full rounded-md ${disabled ? 'text-gray-300' : active ? 'text-gray-50' : 'text-gray-800'}`}>
                                                <div className="w-4 self-center mr-2">
                                                    {group.icon}
                                                </div>
                                                {group.title}
                                            </button>
                                        )}
                                    </Menu.Item>
                                )
                            })
                        }

                    </Menu.Items>
                </Transition>
            </Menu>
        </Fragment>
    )
}

export default Dropdown
