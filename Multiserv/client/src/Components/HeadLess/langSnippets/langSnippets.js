export default {
	javascript: `const plans = [
        {
            name: 'Save',
            descr1: 'The cheapiest',
            descr2: 'Starting at $59.99'
        },
        {
            name: 'Regular',
            descr1: 'Everyone loves it',
            descr2: 'Starting at $99.99'
        },
        {
            name: 'Premium',
            descr1: 'Recommended by us!',
            descr2: '$129.99'
        },
    ]
`,
	verticalRadioCode: `import React, { useState } from 'react'
import VerticalRadio from './components/VerticalRadio/VerticalRadio'

const Example = () => {
    const [currentPlan, setCurrentPlan] = useState({})
    const handlePlanValue = (plan) => {
        setCurrentPlan(plan)
    }
    const plans = [
        {
            name: 'Save',
            descr1: 'The cheapiest',
            descr2: 'Starting at $59.99'
        },
        {
            name: 'Regular',
            descr1: 'Everyone loves it',
            descr2: 'Starting at $99.99'
        },
        {
            name: 'Premium',
            descr1: 'Recommended by us!',
            descr2: '$129.99'
        },
    ]
    return (
        <div>
            <div className="my-classes-here">
                <VerticalRadio menu={plans} theme="#065F46" callBack={handlePlanValue} />
            </div>
            {/* if you want to use the value retreived from VerticalRadio component: */}
            <h2>Plan selected:</h2>
            <span>{currentPlan.name}</span>
        </div>
    )
}

export default Example
`
};
