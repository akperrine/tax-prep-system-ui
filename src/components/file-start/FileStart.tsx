import {
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  CardHeader,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  ModalToggleButton,
} from "@trussworks/react-uswds";
import { useEffect, useRef } from "react";

function FileStart({ handleClick }) {
  const modalRef = useRef<ModalRef>(null);

  return (
    <div>
      <div className="display-flex flex-column flex-align-center flex-justify-center">
        <h2>Let's File your taxes</h2>
        <ModalToggleButton
          modalRef={modalRef}
          size="big"
          className="padding-3 margin-3"
        >
          File your taxes
        </ModalToggleButton>
        <Modal
          ref={modalRef}
          id="example-modal-1"
          aria-labelledby="modal-1-heading"
          aria-describedby="modal-1-description"
        >
          <ModalHeading id="modal-1-heading">
            Are you sure you want to continue?
          </ModalHeading>
          <div className="usa-prose">
            <p id="modal-1-description">Previous tax filing will be lost.</p>
          </div>
          <ModalFooter>
            <ButtonGroup>
              <ModalToggleButton
                modalRef={modalRef}
                onClick={handleClick}
                closer
              >
                Continue
              </ModalToggleButton>
              <ModalToggleButton
                modalRef={modalRef}
                closer
                unstyled
                className="padding-105 text-center"
              >
                Go back
              </ModalToggleButton>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
  // return (
  //   <>
  //     <Card
  //       gridLayout={{ tablet: { col: 4 } }}
  //       containerProps={{ className: "border-ink" }}
  //     >
  //       <CardHeader>
  //         <h3 className="usa-card__heading">Ready to start new tax filing?</h3>
  //       </CardHeader>
  //       <CardFooter>
  //         <Button type="button" onClick={handleClick}>
  //           Yes
  //         </Button>
  //       </CardFooter>
  //     </Card>
  //   </>
  // );
}

export default FileStart;
