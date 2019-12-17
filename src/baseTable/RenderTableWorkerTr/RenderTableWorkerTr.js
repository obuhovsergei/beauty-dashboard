import React, {useCallback, useContext, useState} from 'react';
import ModalContext from "../ModalContext";
import Order from "../RenderTableOrder/RenderTableOrder";
import {return_TIME_PRICE_, Sort_other_ListGroup} from '../Fuctions';
import update from "immutability-helper";

const RenderTableWorkerTr = ({worker, Time_Minutes_Body}) => {
    const { List_Menu, List_Orders } = useContext(ModalContext);
    const groupS = List_Orders.filter(list_workers => list_workers.group === worker.id);
    const [groups, setGroups] = useState(groupS);

    const moveGroups = useCallback(
        (dragObject, hoverObject) => {
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
                const Sorted_otherGroup = Sort_other_ListGroup(groups);

                //Get Total Time dragObject
                const Total_TIME_dragGroup = return_TIME_PRICE_(List_Menu, drag);
                const Total_TIME_otherGroup = hoverObject + Total_TIME_dragGroup.time;

                //Get first Group of hoverDrag
                const hoverGroup_ = Sorted_otherGroup.find(item => {
                    if(item.time_start > hoverObject && item.time_start !== dragObject) return item;
                    else return false
                });
                //if next order have next groups
                if(hoverGroup_ && Total_TIME_otherGroup > hoverGroup_.time_start) {
                    //Get other groups after hoverObject
                    const hoverAllGroups = Sorted_otherGroup.filter(item => item.time_start > hoverObject);
                    //Get time to splice other groups
                    let timeSplice = Total_TIME_dragGroup.time - (hoverGroup_.time_start - hoverObject);
                    const endOfTimeSplice = timeSplice%30; //If % lost
                    if(endOfTimeSplice != null) timeSplice = timeSplice + endOfTimeSplice;
                    //Add time to other groups
                    hoverAllGroups.map(group => group.time_start += timeSplice);
                    setGroups(groups); //???
                }
                //if not have any groups
                else {
                    drag.time_start = hoverObject;
                    const dragIndex_ = groups.findIndex(item => item.time_start === hoverObject);
                    setGroups(
                        update(groups, {
                            $splice: [
                                [dragIndex_, 1],
                                [dragIndex_, 0, drag ]
                            ]
                        })
                    )
                }
            }
        },
        [groups, List_Menu],
    );
    return(
        <tr key={worker.id}>{
            Time_Minutes_Body.map(row_times =>{
                for(let i=0; i < groupS.length; i++){
                    const TIME_PRICE = return_TIME_PRICE_(List_Menu, groupS[i]);
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