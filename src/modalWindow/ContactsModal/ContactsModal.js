import React, {useContext, useState} from "react";
import {Button, Form, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';
import ModalContext from "../../baseTable/ModalContext";
import './ContactsModal.css'

const Information_of_User = () => {
    const { infoModal, setInfoModal, ListOrders, ShowModal} = useContext(ModalContext);
    const [name, setName] = useState(infoModal.name);
    const [telephone, setTelephone] = useState(infoModal.telephone);
    const [comments, setComments] = useState(infoModal.comments);

    const Change_Status = (evt) => {
        let status = true;
        if('false' === evt) status = false;
        if(infoModal.id_menu.length){
            infoModal.status = status;
            setInfoModal(infoModal);
            //Save to LocalStorage
            if(localStorage.getItem('ListOrders') !== null && ListOrders) localStorage.setItem('ListOrders', JSON.stringify(ListOrders));
        }
    };

    const handleChange = (e) => {
        (e.target.name === 'Name client') ? setName(e.target.value)     : setName(infoModal.name);
        (e.target.name === 'Telephone') ? setTelephone(e.target.value)  : setTelephone(infoModal.telephone);
        (e.target.name === 'Comments') ? setComments(e.target.value)    : setComments(infoModal.comments);
    };

    const SaveContacts = () => {
        if(name && telephone && infoModal.id_menu.length){
            infoModal.name = name;
            infoModal.telephone = telephone;
            infoModal.comments = comments;
            setInfoModal(infoModal); // Set new infoModal
            //Save to LocalStorage
            if(localStorage.getItem('ListOrders') !== null && ListOrders) localStorage.setItem('ListOrders', JSON.stringify(ListOrders));
            ShowModal(false); //Close Modal
        }
    };


    return (
        <div className="Info_modal">
            <Form.Group className="Name">
                <Form.Label>Name client</Form.Label>
                <Form.Control
                    name="Name client"
                    type="text"
                    maxLength={30}
                    value={name}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="Telephone">
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                    name="Telephone"
                    type="text"
                    maxLength={12}
                    value={telephone}
                    onChange={handleChange}
                />
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
                    value={comments}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="Buttons_modal_save">
                <Row className="Save_Status">
                    <Col xs={12} md={6}>
                        <Button
                            variant="info"
                            size="sm"
                            className="Save_modal"
                            onClick={SaveContacts}
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
                            <Dropdown.Item eventKey="false" active={!infoModal.status}>Did not come </Dropdown.Item>
                            <Dropdown.Item eventKey="true" active={infoModal.status}> Come </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
            </Form.Group>
        </div>
    )
};

export default Information_of_User