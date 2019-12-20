import React, {useState}from 'react';
import moment from 'moment';
import ModalContext from "./ModalContext";
import {Container, Row, Col} from 'react-bootstrap';
import RenderDataPagination from './PaginatorDate/PaginatorDate';
import RenderTable from './RenderTable/RenderTable';
import ModalWindow from "../modalWindow/WindowModal";
import SpecialistsList from "./Specialists/Specialists";
import { Specialists, List_Menu, List_Orders } from './GetJSON';

const TimeBorderTable = {
    start:510,  //Begin timetable in minutes
    end:1020,   //End timetable in minutes
    step:30,    //Step of time in minutes
    endDate: 14 //End Date to paginator
}; // From 9:00 to 18:00

const BaseTable = () => {
    const [modalBox, setModalBox] = useState(false); //Open Modal
    const [infoModal, setInfoModal] = useState({});
    const [height, setHeight] = useState([
        {class:'TR1', value:82},
        {class:'TR2', value:82},
        {class:'TR3', value:82},
        {class:'TR4', value:82},
        {class:'TR5', value:82}
    ]);

    const ShowModal = ( showmodal, Order, worker) => {
        if(typeof(Order) === 'object') setInfoModal(() => Order);
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
                setInfoModal(() => defaultINFO);
            }
            else return setModalBox(() => false);
        }
        setModalBox(() => showmodal);
    };

    return (
        <ModalContext.Provider value={{ShowModal, setModalBox, Specialists, List_Menu, List_Orders, TimeBorderTable, infoModal, setInfoModal, setHeight}}>
            <Container>
                <Row>
                    <Col xs={3}> </Col>
                    <Col xs={9} >
                        <RenderDataPagination
                            StartDate={moment().subtract(1,'days').format('DD MM YYYY')}
                            EndDate={moment().add(TimeBorderTable.endDate, 'days').format('DD MM YYYY')}
                        />
                    </Col>
                    <Col xs={3} className='FixLeft'>
                        <SpecialistsList Height={height}/>
                    </Col>
                    <Col xs={9} className='FixRight'>
                        <RenderTable />
                    </Col>
                </Row>
                {modalBox && <ModalWindow/>}
            </Container>
        </ModalContext.Provider>
    )
};

export default BaseTable