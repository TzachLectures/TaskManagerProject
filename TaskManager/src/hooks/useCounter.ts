import { useState } from "react";

function useCounter(initialValue = 0, initialStep = 1) {
  const [count, setCount] = useState(initialValue);
  const [step, setStep] = useState(initialStep);
  const handleInc = () => {
    setCount((prev) => prev + step);
  };
  const handleDec = () => {
    setCount((prev) => prev - step);
  };

  return { count, step, handleInc, handleDec, setStep };
}

export default useCounter;
