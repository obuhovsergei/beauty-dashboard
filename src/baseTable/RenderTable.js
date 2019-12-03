import React from 'react';
import {Table} from 'react-bootstrap';
import RenderTableHeader from './RenderTableHeader';
import RenderTableBody from './RenderTableBody';
import DATA_workers from '../DB/List_workers';
import List_workers from '../DB/main_list_workers';
import Main_menu from '../DB/main_menu';
import moment from "moment";


function RenderTable(){

    const TimeBorderTable = {
        start:510, //Begin timetable in minutes
        end:1080,  //End timetable in minutes
        step:30    //Step of time in minutes
    }; // From 9:00 to 18:00

    let Head = [];
    let Body_Def = [];
    for(let i = TimeBorderTable.start; i <= TimeBorderTable.end; i = i + TimeBorderTable.step){
        const Ttt = moment.utc().startOf('day').add(i + TimeBorderTable.step, 'minutes').format('mm');
        if(Ttt === '00') Head.push({id : i + TimeBorderTable.step, value: moment.utc().startOf('day').add(i + TimeBorderTable.step, 'minutes').format('HH:mm')});
        Body_Def.push({id : i + TimeBorderTable.step, value: ''})
    }

    return(
        <Table striped className='TableData'>
            <thead>
            <tr>
                <RenderTableHeader
                    DataHead={Head}
                />
            </tr>
            </thead>
            <tbody>
                <RenderTableBody
                    List_job_for_workers={DATA_workers}
                    List_Workers={List_workers}
                    DataBody={Body_Def}
                    Main_menu={Main_menu}
                />
            </tbody>
        </Table>
    )
}

export default RenderTable