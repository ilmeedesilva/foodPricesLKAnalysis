import React, { useEffect, useState } from "react";
import style from "./Stepper.module.scss";
import StepIcon from "../../img/svg/Step.icon";

const Stepper = ({ getSelectedStepper, selectedStepper }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    getSelectedStepper(currentStep);
  }, [currentStep]);

  useEffect(() => {
    setCurrentStep(selectedStepper);
  }, [selectedStepper]);

  return (
    <div className={style.stepperWrp}>
      <div
        className={
          currentStep >= 1
            ? [style.stepPoint, style.stepPointActive].join(" ")
            : style.stepPoint
        }
        onClick={() => setCurrentStep(1)}
      >
        <span className={style.stepperTitle}>Data Filtering</span>
        <StepIcon size={25} color={currentStep >= 1 ? "#7050F9" : "#EEEFF2"} />
        <span className={style.stepperLine} />
      </div>
      <div
        className={
          currentStep >= 2
            ? [style.stepPoint, style.stepPointActive].join(" ")
            : style.stepPoint
        }
        onClick={() => (currentStep > 2 ? setCurrentStep(2) : "")}
      >
        <span className={style.stepperTitle}>Model Selection</span>
        <StepIcon size={25} color={currentStep >= 2 ? "#7050F9" : "#EEEFF2"} />
        <span className={style.stepperLine} />
      </div>
      <div
        className={
          currentStep >= 3
            ? [style.stepPoint, style.stepPointActive].join(" ")
            : style.stepPoint
        }
        onClick={() => (currentStep > 3 ? setCurrentStep(3) : "")}
      >
        <span className={style.stepperTitle}>data analysis & Predictions</span>
        <StepIcon size={25} color={currentStep >= 3 ? "#7050F9" : "#EEEFF2"} />
        <span className={style.stepperLine} />
      </div>
      <div
        className={
          currentStep >= 4
            ? [style.stepPoint, style.stepPointActive, style.endStep].join(" ")
            : [style.stepPoint, style.endStep].join(" ")
        }
      >
        <span className={style.stepperTitle}>Report</span>
        <StepIcon size={25} color={currentStep >= 4 ? "#7050F9" : "#EEEFF2"} />
      </div>
    </div>
  );
};

export default Stepper;
