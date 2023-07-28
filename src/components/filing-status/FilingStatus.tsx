import { Radio } from "@trussworks/react-uswds";
import { FilingStatusOptions } from "../../utils/enums";
import "./FilingStatus.css";
import { useEffect, useState } from "react";

function FilingStatus({ formData, setFormData }) {
  const [selected, setSelected] = useState("none");

  const handleClick = (e) => {
    setSelected(e.target.name);
    setFormData({ ...formData, filingStatus: e.target.name });
  };

  useEffect(() => {
    setSelected(formData.filingStatus);
  }, []);

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
