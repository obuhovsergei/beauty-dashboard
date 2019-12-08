import React, {useContext} from 'react';
import RenderTableRowSimple from "./RenderTableRowSimple";
import ModalContext from "./ModalContext";


function RenderTableBody({DataBody}) {
    const { List_Orders, Specialists } = useContext(ModalContext);
    let List_Workers_add_pass = [];
    Specialists.map(elem => List_Workers_add_pass.push(elem, {id:'pass_'+elem.id, title:''}));

    return(
        List_Workers_add_pass.map(worker =>{
            const groupS = List_Orders.filter(list_workers => list_workers.group === worker.id);
            return (
                <RenderTableRowSimple
                    worker={worker}
                    key={worker.id}
                    Time_Minutes_Body={DataBody}
                    groupS={groupS}
                />
            )
        })
    )
}

export default RenderTableBody