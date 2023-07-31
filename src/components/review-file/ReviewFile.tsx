import { Grid, GridContainer } from "@trussworks/react-uswds";

function ReviewFile({ profileFormData, taxFormData }) {
  const checkAddressPresent = (
    address: string,
    city: string,
    state: string,
    zipcode: string
  ) => {
    if (address === "" || city === "" || state === "" || zipcode === "")
      return false;
    else {
      return true;
    }
  };
  return (
    <>
      <h2>Please Review Your Info</h2>
      <GridContainer className="margin-top-2">
        <Grid row gap="md" className="padding-top-1 padding-bottom-1 border">
          <Grid col={3} className="padding-1">
            <u>Name</u>: {profileFormData.firstName} {profileFormData.lastName}
          </Grid>
          <Grid col={3} className="padding-1 ">
            <u>Email</u>: {profileFormData.email}
          </Grid>
          <Grid col={3} className="padding-1">
            <u>DOB</u>:{" "}
            {`${profileFormData.day}/${profileFormData.month}/${profileFormData.year}`}
          </Grid>
          <Grid col={3} className="padding-1">
            <u>SSN</u>: {profileFormData.ssn}
          </Grid>
          <Grid col={9} className="padding-1 ">
            <u>Address</u>:{" "}
            {checkAddressPresent(
              profileFormData.address1,
              profileFormData.city,
              profileFormData.state,
              profileFormData.zipcode
            )
              ? `${profileFormData.address1} ${profileFormData.city}, ${profileFormData.state} ${profileFormData.zipcode}`
              : "N/A"}
          </Grid>
          <Grid col={3} className="padding-1">
            <u>Filing Status</u>: {taxFormData.filingStatus}
          </Grid>
        </Grid>
        <Grid row gap="md" className="padding-top-1 padding-bottom-1 border">
          <Grid col={4} className="padding-1">
            <u>W2 Income</u>: {taxFormData.w2Income}
          </Grid>
          <Grid col={6} className="padding-1">
            <u>W2 Witheld</u>:{" "}
            {taxFormData.w2Witheld === "" ? "N/A" : taxFormData.w2Witheld}
          </Grid>

          <Grid col={4} className="padding-1">
            <u>W2 Business Address</u>:{" "}
            {checkAddressPresent(
              taxFormData.w2Address1,
              taxFormData.w2City,
              taxFormData.w2State,
              taxFormData.w2Zipcode
            )
              ? `${taxFormData.w2Address1} ${taxFormData.w2City}, ${taxFormData.w2State} ${taxFormData.w2Zipcode}`
              : "N/A"}
          </Grid>
        </Grid>
        <Grid row gap="md" className="padding-top-1 padding-bottom-1 border">
          <Grid col={4} className="padding-1">
            <u>1099 Income</u>: {taxFormData.ten99Income}
          </Grid>
          <Grid col={6} className="padding-1">
            <u>1099 Deductions</u>:{" "}
            {taxFormData.ten99Deductions === ""
              ? "N/A"
              : taxFormData.ten99Deductions}
          </Grid>

          <Grid col={4} className="padding-1">
            <u>1099 Business Address</u>:{" "}
            {checkAddressPresent(
              taxFormData.ten99Address1,
              taxFormData.ten99City,
              taxFormData.ten99State,
              taxFormData.ten99Zipcode
            )
              ? `${taxFormData.ten99Address1} ${taxFormData.ten99City}, ${taxFormData.ten99State} ${taxFormData.ten99Zipcode}`
              : "N/A"}
          </Grid>
        </Grid>
      </GridContainer>
    </>
  );
}

export default ReviewFile;
