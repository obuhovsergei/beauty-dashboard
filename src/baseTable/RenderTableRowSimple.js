import React, {useContext} from 'react';
import ModalContext from "./ModalContext";
import Order from "./RenderTableOrder";
import {return_TIME_PRICE_} from './Fuctions';

function RenderTableRowSimple({worker, Time_Minutes_Body, groupS }) {
    const { ShowModal, List_Menu } = useContext(ModalContext);
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
                        />)
                    }
                    for(let y=0; y<ColSpan; y++){
                        const num = groupS[i].time_start + ( 30 * y );
                        if(num === row_times.id) return false
                    }
                }
                return (
                    <td
                        onClick={ShowModal.bind(null, true, row_times.id, worker.id)}
                        key={row_times.id}
                        className='DefaultBox'
                    > </td>
                ) //default Data
            })
        }
        </tr>
    )
}

export default RenderTableRowSimple