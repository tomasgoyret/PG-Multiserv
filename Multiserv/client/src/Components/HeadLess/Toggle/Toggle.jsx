import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

export default function Toggle({ text, callBack, theme }) {
    const [switchValue, setSwitchValue] = useState(false);
    useEffect(() => {
        callBack(switchValue)
    }, [switchValue])

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-xs mx-auto">
                <Switch.Group as="div" className="flex items-center space-x-4">
                    <Switch.Label className="font-semibold cursor-pointer select-none">{text}</Switch.Label>
                    <Switch
                        as="button"
                        checked={switchValue}
                        onChange={setSwitchValue}
                        style={{ backgroundColor: switchValue && theme }}
                        className={`${!switchValue && "bg-gray-200"
                            }  inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
                    >
                        {({ checked }) => (
                            <span
                                className={`${checked ? "translate-x-5" : "translate-x-0"
                                    } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
                            />
                        )}
                    </Switch>
                </Switch.Group>
            </div>
        </div>
    );
}
