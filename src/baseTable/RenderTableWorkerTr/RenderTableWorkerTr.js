import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import ModalContext from "../ModalContext";
import Order from "../RenderTableOrder/RenderTableOrder";
import {getTimePrice, SortOtherListGroup} from '../Fuctions';
import update from "immutability-helper";

const RenderTableWorkerTr = ({worker, TimeMinutesBody}) => {
    const { ListMenu, ListOrders, setHeight } = useContext(ModalContext);

    const groupS = ListOrders.filter(list_workers => list_workers.group === worker.id); //Filtering groups on active specialist
    const [groups, setGroups] = useState(groupS); // get group for dragging
    const moveGroups = useCallback(
        (dragObject, hoverObject) => {
            setGroups(ListOrders.filter(list_workers => list_workers.group === worker.id)); //Fix asinh new order
            //Indexes
            const dragIndex = groups.findIndex(item => item.time_start === dragObject);
            const hoverIndex = groups.findIndex(item => item.time_start === hoverObject);
            if(dragIndex === -1) return false; //False if drag NOT order
            //Get dragGroup by time start
            const dragGroup = groups.find(item => item.time_start === dragObject);
            const dragTime = dragGroup.time_start;

            //If hover order is correct
            if(hoverIndex !== -1){
                //Get hoverGroup by time start
                const hoverGroup = groups.find(item => item.time_start === hoverObject);
                const hoverTime = hoverGroup.time_start;

                if(dragGroup.group === hoverGroup.group){
                    dragGroup.time_start = hoverTime;
                    hoverGroup.time_start = dragTime;

                    setGroups(
                        update(groups, {
                            $splice: [
                                [dragIndex, 1],
                                [hoverIndex, 0, dragGroup],
                            ],
                        }),
                    )
                }
                else return false;

            }
            // Else hover td not have orders
            else {

                const drag = groups.find(item => item.time_start === dragObject);
                //Sorting Groups
                const SortedOtherGroup = SortOtherListGroup(groups);

                //Get Total Time dragObject
                const Total_TIME_dragGroup = getTimePrice(ListMenu, drag);
                const Total_TIME_otherGroup = hoverObject + Total_TIME_dragGroup.time;

                //Get first Group of hoverDrag
                const draggingGroup = SortedOtherGroup.find(item => {
                    if(item.time_start > hoverObject && item.time_start !== dragObject) return item;
                    else return false
                });

                //if next order have next groups
                if(draggingGroup && Total_TIME_otherGroup > draggingGroup.time_start) {
                    //Get other groups after hoverObject
                    const hoverAllGroups = SortedOtherGroup.filter(item => item.time_start > hoverObject);
                    //Get time to splice other groups
                    let timeSplice = Total_TIME_dragGroup.time - (draggingGroup.time_start - hoverObject);
                    const endOfTimeSplice = timeSplice%30; //If % lost
                    if(endOfTimeSplice != null) timeSplice = timeSplice + endOfTimeSplice;
                    //Add time to other groups
                    hoverAllGroups.map(group => group.time_start += timeSplice);
                    setGroups(groups); //set dragging group
                }
                //if not have any groups
                else {
                    drag.time_start = hoverObject;
                    const fixDragging = groups.findIndex(item => item.time_start === hoverObject);
                    setGroups(
                        update(groups, {
                            $splice: [
                                [fixDragging, 1],
                                [fixDragging, 0, drag ]
                            ]
                        })
                    )
                }
            }
        },
        [groups, ListMenu, ListOrders, worker.id],
    );

    //Set height for specialists
    const RefHeight = useRef(null);

    useEffect(() => {
        const Class = RefHeight.current.className;
        const Height = RefHeight.current.clientHeight;
        if(!Class.includes('pass')) setHeight(prev => {
            prev.forEach(row => {
                if(row.class === Class) row.value = Height });
            return prev;
        })
    });

    return(
        <tr key={worker.id} ref={RefHeight} className={'TR'+ worker.id}>{
            TimeMinutesBody.map(row_times => {
                for(let i=0; i < groupS.length; i++){
                    const TIME_PRICE = getTimePrice(ListMenu, groupS[i]);
                    const ColSpan = Math.ceil(TIME_PRICE.time/30);
                    if(groupS[i].time_start === row_times.id){
                        return (<Order
                            groupS={groupS[i]}
                            id={row_times.id}
                            key={row_times.id}
                            moveGroups={moveGroups}
                            index={row_times.id}
                            worker={worker.id}
                            nameGroup={groupS[i].name}
                        />)
                    }

                    //Delete other <td's> after each order
                    for(let y=0; y<ColSpan; y++){
                        const num = groupS[i].time_start + ( 30 * y );
                        if(num === row_times.id) return false
                    }
                }
                return(
                    <Order
                        id={row_times.id}
                        key={row_times.id}
                        moveGroups={moveGroups}
                        index={row_times.id}
                        worker={worker.id}
                    />
                )
            })
        }
        </tr>
    )
};

export default RenderTableWorkerTr