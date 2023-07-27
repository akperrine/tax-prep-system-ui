import { Button, Card, CardFooter, CardHeader } from "@trussworks/react-uswds";

function FileStart({ handleClick }) {
  return (
    <>
      <Card
        gridLayout={{ tablet: { col: 4 } }}
        containerProps={{ className: "border-ink" }}
      >
        <CardHeader>
          <h3 className="usa-card__heading">Ready to start new tax filing?</h3>
        </CardHeader>

        <CardFooter>
          <Button type="button" onClick={handleClick}>
            Yes
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default FileStart;
