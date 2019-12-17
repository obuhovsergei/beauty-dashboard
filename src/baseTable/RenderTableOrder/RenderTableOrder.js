import React, {useContext, useRef} from 'react';
import moment from 'moment';
import { IoMdTime } from "react-icons/io";
import ModalContext from "../ModalContext";
import { return_TIME_PRICE_ , Check_TIME_and_Return_Classes_} from '../Fuctions';
import {useDrag, useDrop} from "react-dnd";
import './RenderTableOrder.css'

const ItemTypes = {
    CARD: 'prop',
};

const Order = ({groupS, id, moveGroups, index, worker, nameGroup}) => {
    const { ShowModal, List_Menu } = useContext(ModalContext);
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor) {
            if (!ref.current) return
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) return;
            moveGroups(dragIndex, hoverIndex); //Moving Orders
            item.index = hoverIndex

        }
    });
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id, index, worker, nameGroup},
        collect: monitor => ({
            isDragging: monitor.isDragging(),

        }),
        canDrag: monitor => (!isNaN(worker) && nameGroup),
    });
    const opacity = isDragging ? 0 : 1
    drag(drop(ref));

    let time_Classes = {}; //Classes of orders

    /*useEffect(() => {
        let orderNew = null;
        orderNew = setInterval(() => {
            setTime_Classes(time_Classes => Check_TIME_and_Return_Classes_(groupS.time_start + TIME_PRICE.time, groupS.payd , groupS.status));
        }, 1000);
        return () => clearInterval(orderNew);
    });*/

    if(groupS){
        const startTime = moment().startOf('day').add(groupS.time_start, 'minutes').format('HH:mm');
        const TIME_PRICE = return_TIME_PRICE_(List_Menu, groupS);
        const ColSpan = Math.ceil(TIME_PRICE.time/30);
        const Width_percent = Math.round((TIME_PRICE.time/30) / ColSpan * 100) + '%';

        time_Classes = Check_TIME_and_Return_Classes_(groupS.time_start + TIME_PRICE.time, groupS.payd , groupS.status);

        return (<td  key={id} className='OutsideOrder' colSpan={ColSpan} >
            <div ref={ref}
                 className={time_Classes.BoxShadow + ' InitData_in_Table'}
                 style={{width:Width_percent, opacity}}
                 onClick={ShowModal.bind(null, true, groupS)}
            >
                <span>
                    <strong className={time_Classes.Time}>
                        <IoMdTime/>
                        {startTime}
                    </strong>
                    <span style={{display:'none'}} className={time_Classes.DidNotCome}>Did not come</span>
                    <span className={time_Classes.Money}>{TIME_PRICE.price}$</span>
                </span>
                <span>{groupS.name}</span>
                {TIME_PRICE.name_first_menu?(
                    <span>{TIME_PRICE.name_first_menu}</span>
                ):(
                    <span>No have menu</span>
                )}
            </div>
        </td>)
    }
    else {
        return (
            <td
                ref={ref}
                onClick={ShowModal.bind(null, true, id, worker)}
                key={id}
                className='DefaultBox'
            > </td>
        ) //default Data
    }

}

export default Order