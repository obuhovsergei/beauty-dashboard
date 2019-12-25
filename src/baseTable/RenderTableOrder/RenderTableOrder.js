import React, {useContext, useRef, useEffect, useState} from 'react';
import moment from 'moment';
import { IoMdTime } from "react-icons/io";
import ModalContext from "../ModalContext";
import { getTimePrice , CheckTimeAndReturnClasses} from '../Fuctions';
import {useDrag, useDrop} from "react-dnd";
import './RenderTableOrder.css'

const ItemTypes = { CARD: 'prop' };

const Order = ({groupS, id, moveGroups, index, worker, nameGroup}) => {
    const { ShowModal, ListMenu, ListOrders } = useContext(ModalContext);

    const ref = useRef(null); //Get ref for DnD
    //Drop function
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
    //Dragging function
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id, index, worker, nameGroup},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: () => (!isNaN(worker) && nameGroup),
        end:(item, monitor) => {
            //Save to LocalStorage
            if(monitor.didDrop() && localStorage.getItem('ListOrders') !== null && ListOrders) localStorage.setItem('ListOrders', JSON.stringify(ListOrders));
        }
    });
    const opacity = isDragging ? 0 : 1; //Opacity for Dragging order
    drag(drop(ref)); //Call dragging

    // Classes default
    const[timeClasses, setTimeClasses] = useState({
        Time:'ClockWaitCome',
        Money:'moneyGray',
        BoxShadow:'defaultShadow'
    });

    const TimePrice = getTimePrice(ListMenu, groupS);

    //First push classes
    useEffect(() =>{
        if(groupS) {
            const TIME_PRICE_ = getTimePrice(ListMenu, groupS);
            const Classes = CheckTimeAndReturnClasses(groupS.time_start + TIME_PRICE_.time, groupS.payd , groupS.status);
            if(groupS && TIME_PRICE_) setTimeClasses(Classes);
        }
    }, [groupS, ListMenu]);

    //Render each 1000 ms classes
    useEffect(() => {
        let orderNew = null;
        orderNew = setInterval(() => {
            if(groupS) {
                const Classes = CheckTimeAndReturnClasses(groupS.time_start + TimePrice.time, groupS.payd , groupS.status);
                if(groupS && TimePrice) setTimeClasses(Classes);
            }
        }, 1000);
        return () => clearInterval(orderNew);
    },[setTimeClasses, groupS, TimePrice]);


    if(groupS){
        const startTime = moment().startOf('day').add(groupS.time_start, 'minutes').format('HH:mm');

        return (<td  key={id} className='OutsideOrder' colSpan={TimePrice.ColSpan} >
            <div ref={ref}
                 className={timeClasses.BoxShadow + ' InitData_in_Table'}
                 style={{width:TimePrice.Width_percent, opacity}}
                 onClick={ShowModal.bind(null, true, groupS)}>
                <span>
                    <strong className={timeClasses.Time}>
                        <IoMdTime/>
                        {startTime}
                    </strong>
                    <span style={{display:'none'}} className={timeClasses.DidNotCome}>Did not come</span>
                    <span className={timeClasses.Money}>{TimePrice.price}$</span>
                </span>
                <span>{groupS.name}</span>
                {TimePrice.name_first_menu?(
                    <span>{TimePrice.name_first_menu}</span>
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