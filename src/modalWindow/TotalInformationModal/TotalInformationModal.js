import React, {useContext} from "react";
import { getTimeToMin, Return_Start_End_Times } from "../../baseTable/Fuctions";
import {Button, Col, Row} from "react-bootstrap";
import { IoMdTime } from "react-icons/io";
import ModalContext from "../../baseTable/ModalContext";
import './TotalInformationModal.css'


const TotalInformationModal = ({TotalMenu}) => {
    const { infoModal, setInfoModal, List_Orders } = useContext(ModalContext);
    const Start_End = Return_Start_End_Times(infoModal.time_start, TotalMenu.time);

    const Pay = (statusPay) => {
        if(statusPay && infoModal.id_menu.length){
            infoModal.payd = statusPay;
            infoModal.status = true;
            setInfoModal(infoModal);
            //Save to LocalStorage
            if(localStorage.getItem('List_Orders') !== null && List_Orders) localStorage.setItem('List_Orders', JSON.stringify(List_Orders));
        }
    };
    return(
        <Row className='Buttons_modal_save'>
            <Col xs={4} className='BoldTime'>
                <span className='d-flex justify-content-start align-content-center'>
                    <span className='paddingGridTime'> <IoMdTime/> {Start_End.Start} -</span>
                    <span className='paddingGridTime'>{Start_End.End}</span>
                </span>
            </Col>
            <Col xs={8} className='d-flex justify-content-end reverse'>
                <span className='paddingGrid'>{getTimeToMin(TotalMenu.time)}</span>
                <span className='paddingGrid'><strong>{TotalMenu.price}$</strong></span>
                {infoModal.payd?(
                    <Button variant="success" size="sm" disabled={true}><IoMdTime/> Payd</Button>
                ):(
                    <Button variant="success" size="sm" onClick={Pay.bind(null, true)}><IoMdTime/> Pay</Button>
                )}
            </Col>
        </Row>
    )
}
export default TotalInformationModal