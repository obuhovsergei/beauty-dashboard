import React from 'react';
import moment from "moment";

function RenderTableHeader({DataHead}) {
    let m = moment(new Date());
    //let Time_Now_Today = m.hour()*60 + m.minute();
    let Time_Now_Today = 765;
    const HourNow = moment().startOf('day').add(Time_Now_Today, 'minutes').format('HH');
    const MinutesNow = moment().startOf('day').add(Time_Now_Today, 'minutes').format('mm');
    const TimeNow = moment().startOf('day').add(Time_Now_Today, 'minutes').format('HH:mm');
    return(DataHead.map(row => {
        const HourCheck = moment().startOf('day').add(row.id, 'minutes').format('HH');
        if(Time_Now_Today > row.id && HourCheck < HourNow) return(<td key={row.id} className='THeadPrevNow' colSpan={2} style={{textAlign: 'center', fontWeight: 'bold',fontSize: '0.8rem'}}>{row.value}</td>);
        else if(HourCheck === HourNow) {
            const Width_percent = Math.round(MinutesNow / 60 * 100) + '%';
            return(
                <td
                    key={row.id}
                    className='THeadNow'
                    colSpan={2}
                >
                    {row.value}
                    <div
                        className='THeadNowBack'
                        style={{width:Width_percent}}
                    >
                        <hr className='LINE_timeline'/>
                        <span>{TimeNow}</span>
                    </div>
                </td>);
        }
        else return(<td key={row.id} colSpan={2} style={{textAlign: 'center', fontWeight: 'bold',fontSize: '0.8rem'}}>{row.value}</td>)
    }))
}


export default RenderTableHeader