import React, {useContext} from 'react';
import RenderTableWorkerTr from "../RenderTableWorkerTr/RenderTableWorkerTr";
import ModalContext from "../ModalContext";


const RenderTableBody = ({DataBody}) => {
    const { Specialists } = useContext(ModalContext);

    const List_Workers_add_pass = [];
    Specialists.map(elem => List_Workers_add_pass.push(elem, {id:'pass_'+elem.id, title:''}));
    return(
        List_Workers_add_pass.map(worker =>{

            return (
                <RenderTableWorkerTr
                    worker={worker}
                    key={worker.id}
                    Time_Minutes_Body={DataBody}
                />
            )
        })
    )
};

export default RenderTableBody