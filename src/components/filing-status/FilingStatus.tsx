import { Radio } from "@trussworks/react-uswds";
import { FilingStatusOptions } from "../../utils/enums";
import "./FilingStatus.css";
import { useEffect, useState } from "react";

function FilingStatus({ formData, setFormData, setIsInvalid }) {
  const [selected, setSelected] = useState("none");

  const handleClick = (e) => {
    setSelected(e.target.name);
    setFormData({ ...formData, filingStatus: e.target.name });
  };

  useEffect(() => {
    // console.log(formData.);
    if (formData.filingStatus === "") {
      setIsInvalid(true);
    } else {
      setSelected(formData.filingStatus);
      setIsInvalid(false);
    }
  }, [formData.filingStatus]);

  return (
    <>
      <h2>Filing Status</h2>
      <div className="filing-radio-container">
        <Radio
          id="input-radio-single"
          name="single"
          label="Single"
          checked={selected === FilingStatusOptions.SINGLE}
          onChange={handleClick}
        />

        <Radio
          id="input-radio-jointly"
          name="jointly"
          label="Jointly"
          checked={selected === FilingStatusOptions.MARRIED_FILING_JOINTLY}
          onChange={handleClick}
        />
      </div>
    </>
  );
}

export default FilingStatus;
