import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function ModalInfo({ options, buttonTheme }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
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
        <Fragment>
            <div className="inline-flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}
                    style={hover ? { backgroundColor: darken(buttonTheme, 15) } : { backgroundColor: darken(buttonTheme, 0) }}
                    className="px-4 py-2 text-sm font-medium text-white rounded-md hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-all ease-in-out duration-200"
                >
                    {options.buttonText}
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 " />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {options.title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {options.text}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        {options.closingText}
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </Fragment>
    )
}