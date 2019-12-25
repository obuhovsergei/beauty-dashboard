import React, {useState}from 'react';
import moment from 'moment';
import ModalContext from "./ModalContext";
import {Container, Row, Col} from 'react-bootstrap';
import RenderDataPagination from './PaginatorDate/PaginatorDate';
import RenderTable from './RenderTable/RenderTable';
import ModalWindow from "../modalWindow/WindowModal";
import SpecialistsList from "./Specialists/Specialists";
import { Specialists, ListMenu, ListOrders } from './GetJSON';

const TimeBorderTable = {
    start:510,  //Begin timetable in minutes
    end:1020,   //End timetable in minutes
    step:30,    //Step of time in minutes
    endDate: 13 //End Date to paginator
}; // From 9:00 to 18:00


const BaseTable = () => {
    const [modalBox, setModalBox] = useState(false); //Open Modal
    const [infoModal, setInfoModal] = useState({});  //Modal Window info

    //Height of specialists
    const [height, setHeight] = useState([
        {class:'TR1', value:82},
        {class:'TR2', value:82},
        {class:'TR3', value:82},
        {class:'TR4', value:82},
        {class:'TR5', value:82}
    ]);

    const ShowModal = ( showModal, Order, worker) => {
        if(typeof(Order) === 'object') setInfoModal(() => Order); //if clicking on order, set infoModal
        else{
            //Else clicking on not order
            if(worker && typeof(worker) === 'number'){
                const defaultINFO = {
                    id: 0,
                    group: worker,
                    name: "New Client",
                    telephone: "+1111111111",
                    date: moment().startOf('day').format('DD-MM-YYYY'),
                    time_start:Order,
                    comments:"",
                    status: false,
                    payd: false,
                    id_menu: []
                }; //Get default information if click on NON order
                setInfoModal(() => defaultINFO); //set default infoModal
            }
            else return setModalBox(() => false);
        }
        setModalBox(() => showModal);
    };

    return (
        <ModalContext.Provider value={{ShowModal, setModalBox, Specialists, ListMenu, ListOrders, TimeBorderTable, infoModal, setInfoModal, setHeight}}>
            <Container>
                <Row>
                    <Col xs={3}> </Col>
                    <Col xs={9}>
                        <RenderDataPagination
                            StartDate={ moment().format('DD MM YYYY') }
                            EndDate={ moment().add(TimeBorderTable.endDate, 'days').format('DD MM YYYY') }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} className='FixLeft'>
                        <SpecialistsList Height={ height }/>
                    </Col>
                    <Col xs={9} className='FixRight'>
                        <RenderTable />
                    </Col>
                </Row>
                { modalBox && <ModalWindow/> }
            </Container>
        </ModalContext.Provider>
    )
};


export default BaseTable