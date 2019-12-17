import React, {useContext} from 'react';
import {Table} from 'react-bootstrap';
import RenderTableHeader from '../RenderTableHeader/RenderTableHeader';
import RenderTableBody from '../RenderTableBody/RenderTableBody';
import moment from "moment";
import ModalContext from "../ModalContext";
import './RenderTable.css'


const RenderTable = () => {
    const { TimeBorderTable } = useContext(ModalContext);
    const Head = [];
    const Body_Def = [];
    for(let i = TimeBorderTable.start; i <= TimeBorderTable.end; i = i + TimeBorderTable.step){
        const Ttt = moment.utc().startOf('day').add(i + TimeBorderTable.step, 'minutes').format('mm');
        if(Ttt === '00') Head.push({id : i + TimeBorderTable.step, value: moment.utc().startOf('day').add(i + TimeBorderTable.step, 'minutes').format('HH:mm')});
        Body_Def.push({id : i + TimeBorderTable.step, value: ''})
    }

    return(
        <Table striped className='TableData'>
            <thead>
                <tr><RenderTableHeader DataHead={Head}/></tr>
            </thead>
            <tbody>
                <RenderTableBody DataBody={Body_Def}/>
            </tbody>
        </Table>
    )
}

export default RenderTable