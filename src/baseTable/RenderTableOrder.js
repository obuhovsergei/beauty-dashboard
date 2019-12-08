import React, {useState, useEffect, useContext} from 'react';
import moment from 'moment';
import { IoMdTime } from "react-icons/io";
import ModalContext from "./ModalContext";
import { return_TIME_PRICE_ , Check_TIME_and_Return_Classes_} from './Fuctions';


function Order({groupS, id}) {
    const { ShowModal, List_Menu } = useContext(ModalContext);

    const startTime = moment().startOf('day').add(groupS.time_start, 'minutes').format('HH:mm');
    const TIME_PRICE = return_TIME_PRICE_(List_Menu, groupS);
    const ColSpan = Math.ceil(TIME_PRICE.time/30);
    const Width_percent = Math.round((TIME_PRICE.time/30) / ColSpan * 100) + '%';

    const [time_Classes, setTime_Classes] = useState(Check_TIME_and_Return_Classes_(groupS.time_start + TIME_PRICE.time, groupS.payd , groupS.status));

    useEffect(() => {
        let orderNew = null;
        orderNew = setInterval(() => {
            setTime_Classes(time_Classes => Check_TIME_and_Return_Classes_(groupS.time_start + TIME_PRICE.time, groupS.payd , groupS.status));
        }, 1000);
        return () => clearInterval(orderNew);
    });

    const ClassesBox = time_Classes.BoxShadow + ' InitData_in_Table'; //Create Classes for Box in Table
    return (<td key={id} style={{height: '5rem', width:'152px', padding: '0 .2rem'}} colSpan={ColSpan}>
        <div className={ClassesBox} style={{width:Width_percent}} onClick={ShowModal.bind(null, true, groupS)}>
            <span>
                <strong className={time_Classes.Time}>
                    <IoMdTime/>
                    {startTime}
                </strong>
                <span style={{fontSize:'.5rem', display:'none'}} className={time_Classes.DidNotCome}>Did not come</span>
                <span className={time_Classes.Money}>{TIME_PRICE.price}$</span>
            </span>
            <span>{groupS.name}</span>
            <span>{TIME_PRICE.name_first_menu}</span>
        </div>
    </td>)
}

export default Order