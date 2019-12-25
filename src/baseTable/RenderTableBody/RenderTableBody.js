import React, {useContext} from 'react';
import RenderTableWorkerTr from "../RenderTableWorkerTr/RenderTableWorkerTr";
import ModalContext from "../ModalContext";


const RenderTableBody = ({DataBody}) => {
    const { Specialists } = useContext(ModalContext);

    // eslint-disable-next-line no-unused-vars
    const ListWorkersCurrent = [];
    Specialists.forEach(elem => ListWorkersCurrent.push(elem, {id:'pass_'+elem.id, title:''}));
    return(
        ListWorkersCurrent.map(worker =>{
            return (
                <RenderTableWorkerTr
                    worker={worker}
                    key={worker.id}
                    TimeMinutesBody={DataBody}
                />
            )
        })
    )
};

export default RenderTableBody