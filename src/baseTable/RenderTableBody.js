import React from 'react';
import RenderTableRowSimple from "./RenderTableRowSimple";


function RenderTableBody({DataBody, List_Workers, List_job_for_workers, Main_menu}) {
    const Time_Minutes_Body = DataBody;
    let List_Workers_add_pass = [];
    List_Workers.map(elem => List_Workers_add_pass.push(elem, {id:'pass_'+elem.id, title:''}));
    //let Workers_on_today = props.List_job_for_workers.filter(worker => worker.date === moment().format('DD-MM-YYYY')); //Sorted from today

    return(
        List_Workers_add_pass.map(worker =>{
            const groupS = List_job_for_workers.filter(list_workers => list_workers.group === worker.id);
            return (
                <RenderTableRowSimple
                    worker={worker}
                    key={worker.id}
                    Time_Minutes_Body={Time_Minutes_Body}
                    groupS={groupS}
                    Main_menu={Main_menu}
                />
            )
        })
    )
}

export default RenderTableBody