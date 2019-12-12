import React, {useContext} from "react";
import { getTimeToMin, Return_Start_End_Times } from "../baseTable/Fuctions";
import {Button, Col, Row} from "react-bootstrap";
import { IoMdTime } from "react-icons/io";
import ModalContext from "../baseTable/ModalContext";

const styles = {
    Total_info:{
        margin:'2em 0 0',
        background: '#FFFFFF',
        border: '1px solid #E1E1E1',
        borderRadius: '4px'
    },
    reverse:{
        paddingRight:0
    }
};



function Total_info_render({TotalMenu}){
    const { infoModal, setInfoModal, List_Orders } = useContext(ModalContext);
    const Start_End = Return_Start_End_Times(infoModal.time_start, TotalMenu.time);

    function Pay(statusPay) {
        if(statusPay, infoModal.id_menu.length){
            infoModal.payd = statusPay;
            infoModal.status = true;
            setInfoModal(infoModal);
            //Save to LocalStorage
            if(localStorage.getItem('List_Orders') !== null && List_Orders) localStorage.setItem('List_Orders', JSON.stringify(List_Orders));
        }
    }
    return(
        <Row style={styles.Total_info} className='Buttons_modal_save'>
            <Col xs={4} style={{fontWeight:'bold'}}>
                <span className='d-flex justify-content-start align-content-center'>
                    <span className='paddingGridTime'> <IoMdTime/> {Start_End.Start} -</span>
                    <span className='paddingGridTime'>{Start_End.End}</span>
                </span>
            </Col>
            <Col xs={8} className='d-flex justify-content-end' style={styles.reverse}>
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
export default Total_info_render