import React, {useContext, useRef, useEffect} from 'react';
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
    const { ShowModal, List_Menu, List_Orders } = useContext(ModalContext);
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            moveGroups(dragIndex, hoverIndex); //Moving Orders
            item.index = hoverIndex
        },

    });
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id, index, worker, nameGroup},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: () => (!isNaN(worker) && nameGroup),
        end:(item, monitor) => {
            //Save to LocalStorage
            if(monitor.didDrop() && localStorage.getItem('List_Orders') !== null && List_Orders) localStorage.setItem('List_Orders', JSON.stringify(List_Orders));
        }
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const TIME_PRICE = return_TIME_PRICE_(List_Menu, groupS);

    let time_Classes = {}; //Classes of orders

    useEffect(() => {
        let orderNew = null;
        orderNew = setInterval(() => {
            if(groupS) time_Classes= Check_TIME_and_Return_Classes_(groupS.time_start + TIME_PRICE.time, groupS.payd , groupS.status);
        }, 1000);
        return () => clearInterval(orderNew);
    },[time_Classes]);


    if(groupS){
        const startTime = moment().startOf('day').add(groupS.time_start, 'minutes').format('HH:mm');
        time_Classes= Check_TIME_and_Return_Classes_(groupS.time_start + TIME_PRICE.time, groupS.payd , groupS.status);
        return (<td  key={id} className='OutsideOrder' colSpan={TIME_PRICE.ColSpan} >
            <div ref={ref}
                 className={time_Classes.BoxShadow + ' InitData_in_Table'}
                 style={{width:TIME_PRICE.Width_percent, opacity}}
                 onClick={ShowModal.bind(null, true, groupS)}>
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
        if(isNaN(worker)) return (
            <td
                onClick={ShowModal.bind(null, true, id, worker)}
                key={id}
                className='DefaultBox'
            > </td>
        ); //default Data no REFS
        else return (
            <td
                ref={ref}
                onClick={ShowModal.bind(null, true, id, worker)}
                key={id}
                className='DefaultBox'
            > </td>
        ) //default Data have REFS
    }

};

export default Order