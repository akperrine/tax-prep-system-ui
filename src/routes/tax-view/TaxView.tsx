import { Card, CardBody, CardHeader } from "@trussworks/react-uswds";
import "./TaxView.css";

function TaxView() {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="tax-view-header-container">
            <h3 className="usa-card__heading">Your tax breakdown</h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="tax-view-body-container">
            <div className="margin-top-2 margin-bottom-2">
              <p className="font-sans-6 text-primary fs-1">Total Income </p>
              <span className="text-black">$80,000</span>
            </div>
            <div className="margin-top-2 margin-bottom-2">
              <p className="font-sans-6 text-primary">Amount Owed</p>
              <span className="text-black">$8,000</span>
            </div>
            <div className="margin-top-2 margin-bottom-2">
              <p className="font-sans-6 text-primary font-size-lg">
                Income After Taxes
              </p>
              <span className="text-black">$72,000</span>
            </div>
            <div className="margin-top-2 margin-bottom-2">
              <p className="font-sans-6 text-primary font-size-lg">Tax Rate</p>
              <span className="text-black">10%</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default TaxView;
