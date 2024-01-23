import React, { useState } from "react";

export const useFunnel = ({ steps, defaultStep }) => {
  const [currentStep, setCurrentStep] = useState(defaultStep);
  const [progress, setProgress] = useState(0);

  const Step = ({ children }) => {
    return children;
  };

  const Funnel = ({ children }) => {
    const targetStep = children.find(
      (childStep) => childStep.props.name === currentStep
    );
    return targetStep;
  };

  const onNext = () => {
    const currentStepIndex = steps.indexOf(currentStep);

    if (currentStepIndex === steps.length - 1) {
      console.log("Current step is last");
      return;
    }

    const nextStep = steps[currentStepIndex + 1];
    setProgress(currentStepIndex + 1);
    setCurrentStep(nextStep);
  };

  const onPrev = () => {
    const currentStepIndex = steps.indexOf(currentStep);

    if (currentStepIndex === 0) {
      console.log("Current step is first");
      return;
    }

    const prevStep = steps[currentStepIndex - 1];
    setProgress(currentStepIndex - 1);
    setCurrentStep(prevStep);
  };

  return { Funnel, Step, onNext, onPrev, progress };
};
