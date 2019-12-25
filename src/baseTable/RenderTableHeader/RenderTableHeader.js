import React, {useState, useEffect } from 'react';
import moment from "moment";
import { TimeNow } from '../Fuctions';
import './RenderTableHeader.css'


const RenderTableHeader = ({DataHead}) => {
    const TimeNowToday = TimeNow();
    const HourNow = moment().startOf('day').add(TimeNowToday, 'minutes').format('HH');
    const MinutesNow = moment().startOf('day').add(TimeNowToday, 'minutes').format('mm');

    const [timeNow, setTimeNow] = useState(moment().startOf('day').add(TimeNowToday, 'minutes').format('HH:mm'));
    //Rerender Thead for table
    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setTimeNow(() => moment().startOf('day').add(TimeNow(), 'minutes').format('HH:mm'));
            }, 1000);
        return () => clearInterval(interval);
    }, [timeNow]);


    return(DataHead.map(row => {
        const HourCheck = moment().startOf('day').add(row.id, 'minutes').format('HH');
        if(TimeNowToday > row.id && HourCheck < HourNow) return(<td key={row.id} className='THeadPrevNow' colSpan={2}>{row.value}</td>);
        else if(HourCheck === HourNow) {
            const Width_percent = Math.round(MinutesNow / 60 * 100) + '%';
            return(
                <td key={row.id} className='THeadNow' colSpan={2}>
                    {row.value}
                    <div className='THeadNowBack' style={{width:Width_percent}}>
                        <hr className='LINE_timeline'/>
                        <span>{timeNow}</span>
                    </div>
                </td>);
        }
        else return(<td key={row.id} colSpan={2} className='THeadPast'>{row.value}</td>)
    }))
};


export default RenderTableHeader