import React, {useContext} from "react";
import { getTimeToMin, getStartEndTimes } from "../../baseTable/Fuctions";
import {Button, Col, Row} from "react-bootstrap";
import { IoMdTime } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import ModalContext from "../../baseTable/ModalContext";
import './TotalInformationModal.css'


const TotalInformationModal = ({TotalMenu}) => {
    const { infoModal, setInfoModal, ListOrders } = useContext(ModalContext);
    const StartEndTimes = getStartEndTimes(infoModal.time_start, TotalMenu.time);

    const Pay = (statusPay) => {
        if(statusPay && infoModal.id_menu.length){
            infoModal.payd = statusPay;
            infoModal.status = true;
            setInfoModal(infoModal);
            //Save to LocalStorage
            if(localStorage.getItem('ListOrders') !== null && ListOrders) localStorage.setItem('ListOrders', JSON.stringify(ListOrders));
        }
    };
    return(
        <Row className='Buttons_modal_save'>
            <Col xs={4} className='BoldTime'>
                <span className='d-flex justify-content-start align-content-center'>
                    <span className='paddingGridTime'> <IoMdTime/> {StartEndTimes.Start} -</span>
                    <span className='paddingGridTime'>{StartEndTimes.End}</span>
                </span>
            </Col>
            <Col xs={8} className='d-flex justify-content-end reverse'>
                <span className='paddingGrid'>{getTimeToMin(TotalMenu.time)}</span>
                <span className='paddingGrid'><strong>{TotalMenu.price}$</strong></span>
                {infoModal.payd?(
                    <Button variant="success" size="sm" disabled={true}><MdAttachMoney/> Payd</Button>
                ):(
                    <Button variant="success" size="sm" onClick={Pay.bind(null, true)}><MdAttachMoney/> Pay</Button>
                )}
            </Col>
        </Row>
    )
};
export default TotalInformationModal