import React, {useState}from 'react';
import moment from 'moment';
import ModalContext from "./ModalContext";
import {Container, Row, Col} from 'react-bootstrap';
import RenderDataPagination from './paginatorDate';
import RenderTable from './RenderTable';
import ModalWindow from "../modalWindow/modal_window";
import Specialists_list from "./Specialists";

import Specialists from '../DB/Specialists';    // All Specialists
import List_Menu from '../DB/List_Menu';        // List menus for Orders
import List_Orders from '../DB/List_Orders';    // List Orders

const TimeBorderTable = {
    start:510, //Begin timetable in minutes
    end:1020,  //End timetable in minutes
    step:30    //Step of time in minutes
}; // From 9:00 to 18:00
const defaultINFO = {
    id: 1,
    group: 1,
    name: "",
    telephone: "",
    date:"",
    time_start:1,
    comments:"",
    status: false,
    payd: false,
    id_menu: []
}; //Default information if click on NON order

function BaseTable() {
    const [modalBox, setModalBox] = useState(false); //Open Modal
    const [infoModal, setInfoModal] = useState(defaultINFO);


    function ShowModal( showmodal, Order, worker) {
        if(typeof(Order) === 'object') setInfoModal(infoModal => Order);
        else {
            if(worker && typeof(worker) === 'number'){
                defaultINFO.time_start = Order;
                defaultINFO.group = worker;
                setInfoModal(infoModal => defaultINFO);
            }
            else return setModalBox(modalBox => false);
        }
        setModalBox(modalBox => showmodal);
    }

    return (
        <ModalContext.Provider value={{ShowModal, setModalBox, Specialists, List_Menu, List_Orders, TimeBorderTable, infoModal}}>
            <Container>
                <Row>
                    <Col xs={3}></Col>
                    <Col xs={9} >
                        <RenderDataPagination
                            StartDate={moment().subtract(1,'days').format('DD MM YYYY')}
                            EndDate={moment().add(14, 'days').format('DD MM YYYY')}
                        />
                    </Col>
                    <Col xs={3} className='FixLeft'>
                        <Specialists_list />
                    </Col>
                    <Col xs={9} className='FixRight'>
                        <RenderTable />
                    </Col>
                </Row>
                {modalBox && <ModalWindow/>}
            </Container>
        </ModalContext.Provider>
    )
}

export default BaseTable