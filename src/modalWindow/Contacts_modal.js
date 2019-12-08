import React, {useContext} from "react";
import {Button, Form, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';
import ModalContext from "../baseTable/ModalContext";


function Information_of_User()  {
    const { infoModal } = useContext(ModalContext);

    const [contactInfo, setContactInfo] = React.useState(infoModal);
    function Change_Status(evt){
        let status = true;
        if('false' === evt) status = false;
        setContactInfo(contactInfo => {return {...contactInfo, status:status}})
    }


    return (
        <div className="Info_modal">
            <Form.Group className="Name">
                <Form.Label>Name client</Form.Label>
                <Form.Control
                    name="Name client"
                    type="text"
                    maxLength={30}
                    defaultValue={contactInfo.name} />
            </Form.Group>

            <Form.Group className="Telephone">
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                    name="Telephone"
                    type="text"
                    maxLength={12}
                    defaultValue={contactInfo.telephone} />
            </Form.Group>

            <Form.Group className="Client_card">
                <Button
                    variant="outline-light"
                    size="lg"
                    block >
                    Client card
                </Button>
            </Form.Group>

            <Form.Group className="Comments">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                    name="Comments"
                    type="text"
                    maxLength={30}
                    defaultValue={contactInfo.comments} />
            </Form.Group>

            <Form.Group className="Buttons_modal_save">
                <Row className="Save_Status">
                    <Col xs={12} md={6}>
                        <Button
                            variant="info"
                            size="sm"
                            className="Save_modal"
                            block >
                            Save
                        </Button>
                    </Col >
                    <Col xs={12} md={6}>
                        <DropdownButton
                            onSelect={Change_Status}
                            id="dropdown-basic-button"
                            variant="Info"
                            title="status"
                            size="sm"
                            drop='up'
                        >
                            <Dropdown.Header>User come or not</Dropdown.Header>
                            <Dropdown.Item eventKey="false" active={!contactInfo.status}>Did not come </Dropdown.Item>
                            <Dropdown.Item eventKey="true" active={contactInfo.status}> Come </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
            </Form.Group>
        </div>
    );
}

export default Information_of_User