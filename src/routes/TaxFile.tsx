import { useState } from "react";

function TaxFile() {
  const [formData, setFormData] = useState();
  const [step, setStep] = useState(1);

  const prevStep = () => setStep(step - 1);
  const nextStep = () => setStep(step + 1);

  return <>This is the tax</>;
}

export default TaxFile;
