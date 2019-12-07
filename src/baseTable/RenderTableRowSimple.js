import React, {useContext} from 'react';
import ModalContext from "./ModalContext";
import Order from "./RenderTableOrder";

function return_TIME_PRICE (Main_menu, data) {
    const id_menus = data.id_menu;
    let menus = [];
    for(let i=0; i<id_menus.length; i++){
        for(let j=0; j<Main_menu.length; j++){
            if(Main_menu[j].id === id_menus[i]) menus.push(Main_menu[j])
        }
    }
    let NameFirst = '';
    for(let k=0; k < menus.length; k++){
        if(k === 0) NameFirst = menus[k].name
    }
    const Time = menus.reduce((result, num) => result + num.time, 0);
    const Price = menus.reduce((result, num) => result + num.price, 0);
    return {time:Time, price:Price, name_first_menu:NameFirst}
}


function RenderTableRowSimple({worker, Time_Minutes_Body, groupS, Main_menu }) {
    const { ShowModal } = useContext(ModalContext);
    return(
        <tr key={worker.id}>{
            Time_Minutes_Body.map(row_times =>{
                for(let i=0; i < groupS.length; i++){
                    const TIME_PRICE = return_TIME_PRICE(Main_menu, groupS[i]);
                    const ColSpan = Math.ceil(TIME_PRICE.time/30);
                    if(groupS[i].time_start === row_times.id){
                        return (<Order
                            groupS={groupS[i]}
                            Main_menu={Main_menu}
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