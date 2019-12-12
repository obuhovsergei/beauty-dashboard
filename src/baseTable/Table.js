import React, {useState}from 'react';
import moment from 'moment';
import ModalContext from "./ModalContext";
import {Container, Row, Col} from 'react-bootstrap';
import RenderDataPagination from './paginatorDate';
import RenderTable from './RenderTable';
import ModalWindow from "../modalWindow/modal_window";
import Specialists_list from "./Specialists";

import Specialists_JSON from '../DB/Specialists';    // All Specialists
import List_Menu_JSON from '../DB/List_Menu';        // List menus for Orders
import List_Orders_JSON from '../DB/List_Orders';    // List Orders

if(localStorage.getItem('Specialists') === null) localStorage.setItem('Specialists', JSON.stringify(Specialists_JSON));
if(localStorage.getItem('List_Menu') === null) localStorage.setItem('List_Menu', JSON.stringify(List_Menu_JSON));
if(localStorage.getItem('List_Orders') === null) localStorage.setItem('List_Orders', JSON.stringify(List_Orders_JSON));

const Specialists = JSON.parse(localStorage.getItem("Specialists"));
const List_Menu = JSON.parse(localStorage.getItem("List_Menu"));
let List_Orders = JSON.parse(localStorage.getItem("List_Orders"));

const TimeBorderTable = {
    start:510, //Begin timetable in minutes
    end:1020,  //End timetable in minutes
    step:30    //Step of time in minutes
}; // From 9:00 to 18:00

function BaseTable() {
    const [modalBox, setModalBox] = useState(false); //Open Modal
    const [infoModal, setInfoModal] = useState();


    function ShowModal( showmodal, Order, worker) {
        if(typeof(Order) === 'object') setInfoModal(infoModal => Order);
        else{
            if(worker && typeof(worker) === 'number'){
                const defaultINFO = {
                    id: 0,
                    group: 1,
                    name: "New Client",
                    telephone: "+1111111111",
                    date: moment().startOf('day').format('DD-MM-YYYY'),
                    time_start:1,
                    comments:"",
                    status: false,
                    payd: false,
                    id_menu: []
                }; //Default information if click on NON order
                defaultINFO.time_start = Order;
                defaultINFO.group = worker;
                setInfoModal(infoModal => defaultINFO);
            }
            else return setModalBox(modalBox => false);
        }
        setModalBox(modalBox => showmodal);
    }

    return (
        <ModalContext.Provider value={{ShowModal, setModalBox, Specialists, List_Menu, List_Orders, TimeBorderTable, infoModal, setInfoModal}}>
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