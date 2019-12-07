import React from "react";
import moment from 'moment';
import getTimeToMin from "./getTimeToMin";
import {Button, Col, Row} from "react-bootstrap";
import { IoMdTime } from "react-icons/io";

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

function Return_Start_End_Times (StartMinutes, EndMinutes){
    if(typeof(StartMinutes) === 'number' && typeof(EndMinutes) === 'number'){
        const Start = moment().startOf('day').add(StartMinutes, 'minutes').format('HH:mm');
        const End = moment().startOf('day').add(StartMinutes + EndMinutes, 'minutes').format('HH:mm');
        if(StartMinutes > 1) return {Start:Start, End:End }
        else return {Start:StartMinutes, End:End }
    }
    else return false
}

function Total_info_render({TotalMenu, infoModal}){
    const Start_End = Return_Start_End_Times(infoModal.time_start, TotalMenu.time);
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
                <Button variant="success" size="sm"><IoMdTime/> Pay</Button>
            </Col>

        </Row>
    )
}
export default Total_info_render