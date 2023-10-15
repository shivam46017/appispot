import React, { useState } from 'react'

function useMultistepForm(steps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    function next() {
        setCurrentStepIndex((prev) => {
            if (prev === steps.length - 1) {
                return prev
            }
            return prev + 1
        })
    }
    function back(){
        setCurrentStepIndex((prev) => {
            if (prev === 0) {
                return prev
            }
            return prev - 1
        })
    }
    return{
        currentStepIndex,
        currentStep: steps[currentStepIndex],
        steps,
        isFirstIndex: currentStepIndex === 0,
        isLastIndex: currentStepIndex === steps.length - 1,
        next,
        back
        
    }
}

export default useMultistepForm