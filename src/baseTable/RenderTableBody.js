import React from 'react';
import moment from 'moment';
import Order from './RenderTableOrder';

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

function addOrder_for_Specialist (Specialist_id, TimeID, LengthOrders){
    if(isNaN(Specialist_id)) return false;
    const CountWorkers = LengthOrders.length + 1; //ID New Order
    const New_Order_Def = {
        id:CountWorkers,
        group: Specialist_id,
        name:'',
        telephone:'',
        date: moment(new Date()).format('DD-MM-YYYY'),
        time_start: TimeID,
        comments:'',
        status: false,
        payd: false,
        id_menu:[]
    };

    console.log(New_Order_Def);
}

function RenderTableBody(props) {

    const Time_Minutes_Body = props.DataBody;
    const List_Workers = props.List_Workers;
    const List_job_for_workers = props.List_job_for_workers;
    const Main_menu = props.Main_menu;

    let List_Workers_add_pass = [];
    List_Workers.map(elem => List_Workers_add_pass.push(elem, {id:'pass_'+elem.id, title:''}));
    //let Workers_on_today = props.List_job_for_workers.filter(worker => worker.date === moment().format('DD-MM-YYYY')); //Sorted from today

    return(
        List_Workers_add_pass.map(worker =>{
            const groupS = List_job_for_workers.filter(list_workers => list_workers.group === worker.id);
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
                                onClick={addOrder_for_Specialist.bind(null, worker.id, row_times.id, List_job_for_workers)}
                                key={row_times.id}
                                className='DefaultBox'
                            > </td>
                        ) //default Data
                    })

                    }
                </tr>
            )
        })


    )
}

export default RenderTableBody