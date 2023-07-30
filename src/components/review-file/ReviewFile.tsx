import { Grid, GridContainer } from "@trussworks/react-uswds";

function ReviewFile({ profileFormData, taxFormData }) {
  return (
    <>
      <h2>Personal Info</h2>
      <GridContainer>
        <Grid row gap="sm">
          <Grid col={12} className="margin-1">
            Name: {profileFormData.firstName} {profileFormData.lastName}
          </Grid>
          <Grid col={6} className="margin-1">
            Email: {profileFormData.email}
          </Grid>
          <Grid col={4} className="margin-1">
            DOB:{" "}
            {`${profileFormData.day}/${profileFormData.month}/${profileFormData.year}`}
          </Grid>
          <Grid col={4} className="margin-1">
            SSN: {profileFormData.ssn}
          </Grid>
          <Grid col={4} className="margin-1">
            Address:{" "}
            {`${profileFormData.address1} ${profileFormData.city}, ${profileFormData.state} ${profileFormData.zipcode}`}
          </Grid>
        </Grid>
      </GridContainer>

      <h2>W2 Tax Form</h2>
      <GridContainer>
        <Grid row gap="sm">
          <Grid col={4} className="margin-1">
            Income: {taxFormData.w2Income}
          </Grid>
          <Grid col={6} className="margin-1">
            Witheld: {taxFormData.w2Witheld}
          </Grid>

          <Grid col={4} className="margin-1">
            Address:{" "}
            {`${taxFormData.w2Address1} ${taxFormData.w2City}, ${taxFormData.w2State} ${taxFormData.w2Zipcode}`}
          </Grid>
        </Grid>
      </GridContainer>

      <h2>1099 Tax Form</h2>
      <GridContainer>
        <Grid row gap="sm">
          <Grid col={4} className="margin-1">
            Income: {taxFormData.ten99Income}
          </Grid>
          <Grid col={6} className="margin-1">
            Deductions: {taxFormData.ten99Witheld}
          </Grid>

          <Grid col={4} className="margin-1">
            Address:{" "}
            {`${taxFormData.ten99Address1} ${taxFormData.ten99City}, ${taxFormData.ten99State} ${taxFormData.ten99Zipcode}`}
          </Grid>
        </Grid>
      </GridContainer>

      <h2>Large gutter</h2>
    </>
  );
}

export default ReviewFile;
