import { Card, CardBody, CardHeader } from "@trussworks/react-uswds";
import "./TaxView.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getTaxCalcBeforeSubmit } from "../../utils/api/taxApi";

function TaxView() {
  const user = useSelector((state: RootState) => state.user.user);
  const [taxBreakdown, setTaxBreakdown] = useState({
    totalIncome: 0,
    amountOwed: 0,
    incomeAfterTaxes: 0,
    taxRate: 0,
  });
  let taxDocumentLength = 0;
  if (user?.taxDocuments) {
    taxDocumentLength = user.taxDocuments.length;
  }

  useEffect(() => {
    if (user?.taxDocuments && user.taxDocuments.length > 0) {
      const latestTaxDoc = user.taxDocuments[user.taxDocuments.length - 1];
      const totIncome =
        parseInt(latestTaxDoc.form1099s[0].income) +
        parseInt(latestTaxDoc.formW2s[0].income);
      // console.log(latestTaxDoc, totIncome);
      (async () => {
        const taxCalc = await getTaxCalcBeforeSubmit(latestTaxDoc);
        console.log(taxCalc);
        const afterTax = totIncome - taxCalc;
        const taxRate = Math.round((taxCalc / totIncome) * 10000) / 100;
        setTaxBreakdown({
          ...taxBreakdown,
          totalIncome: totIncome,
          amountOwed: taxCalc,
          incomeAfterTaxes: afterTax,
          taxRate: taxRate,
        });
      })();
    }
  }, []);

  return (
    <>
      {taxDocumentLength > 0 ? (
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
                <span className="text-black">
                  ${taxBreakdown.totalIncome.toLocaleString()}
                </span>
              </div>
              <div className="margin-top-2 margin-bottom-2">
                <p className="font-sans-6 text-primary">Amount Owed</p>
                <span className="text-black">
                  ${taxBreakdown.amountOwed.toLocaleString()}
                </span>
              </div>
              <div className="margin-top-2 margin-bottom-2">
                <p className="font-sans-6 text-primary font-size-lg">
                  Income After Taxes
                </p>
                <span className="text-black">
                  ${taxBreakdown.incomeAfterTaxes.toLocaleString()}
                </span>
              </div>
              <div className="margin-top-2 margin-bottom-2">
                <p className="font-sans-6 text-primary font-size-lg">
                  Tax Rate
                </p>
                <span className="text-black">
                  {taxBreakdown.taxRate.toLocaleString()}%
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <div>
          <h1>There is currently no tax documents</h1>
          <p>Please file your taxes</p>
        </div>
      )}
    </>
  );
}

export default TaxView;
