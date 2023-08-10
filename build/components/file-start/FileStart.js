import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonGroup, Modal, ModalFooter, ModalHeading, ModalToggleButton, } from "@trussworks/react-uswds";
import { useRef } from "react";
function FileStart({ handleClick }) {
    const modalRef = useRef(null);
    return (_jsx("div", { children: _jsxs("div", { className: "display-flex flex-column flex-align-center flex-justify-center ", children: [_jsx("h2", { children: "Let's File your taxes" }), _jsx(ModalToggleButton, { modalRef: modalRef, size: "big", className: "padding-2 margin-3", children: "File your taxes" }), _jsxs(Modal, { ref: modalRef, id: "example-modal-1", "aria-labelledby": "modal-1-heading", "aria-describedby": "modal-1-description", children: [_jsx(ModalHeading, { id: "modal-1-heading", children: "Are you sure you want to continue?" }), _jsx("div", { className: "usa-prose", children: _jsx("p", { id: "modal-1-description", children: "Previous tax filing will be lost." }) }), _jsx(ModalFooter, { children: _jsxs(ButtonGroup, { children: [_jsx(ModalToggleButton, { modalRef: modalRef, onClick: handleClick, closer: true, children: "Continue" }), _jsx(ModalToggleButton, { modalRef: modalRef, closer: true, unstyled: true, className: "padding-105 text-center", children: "Go back" })] }) })] })] }) }));
}
export default FileStart;
