import React from 'react';
import {Pagination} from 'react-bootstrap';
import moment from 'moment';
import './Table.css';
//Исправление косяка moment
moment.fn.fromNow = function (a) {
    var duration = moment().diff(this, 'days');
    return duration;
};


function DatePagination({StartDate, EndDate}){
    const start = moment.parseZone(StartDate, 'DD MM YYYY');
    const end = moment.parseZone(EndDate, 'DD MM YYYY');

    if (!start.isValid() || !end.isValid() || end < start) return(<Pagination.Item>Insert Date is no valid!</Pagination.Item>);

    let rows = [];
    let k = 0; //ID
    const BeforeFromNow = Math.abs(moment(end).fromNow());  // Количество дней до EndTime
    const AfterFromNow = moment(start).fromNow();           // Количество дней до StartTime

    for(let i = AfterFromNow; i > 0; i--){
        const dd = moment().subtract(i, 'days').format('DD');
        const dayOf = moment().subtract(i, 'days').format('dd');
        const Month = moment().subtract(i, 'days').format('MMM');
        k=++k;
        if(dd === '01'){
            rows.push({id:Month, d:Month, disable: 'disabled_padin'})
            rows.push({id:k, d:dd, dayOf:dayOf})
        }
        else if(dayOf === 'Sa' || dayOf === 'Su') rows.push({id:k, d:dd, disable: 'disabled_padin', dayOf:dayOf})
        else rows.push({id:k, d:dd, dayOf:dayOf});
    }

    for(let i = 0; i < BeforeFromNow; i++){
        const check = moment().add(i, 'days');
        const dd = check.format('DD');
        const dayOf = check.format('dd');
        const Month = check.format('MMM');
        k=++k;
        if(dd === '01'){
            rows.push({id:Month, d:Month, disable: 'disabled_padin'})
            rows.push({id:k, d:dd, dayOf:dayOf})
        }
        else if (check.isSame(moment())) rows.push({id:k, d:dd, active: true, dayOf:dayOf})
        else if(dayOf === 'Sa' || dayOf === 'Su') rows.push({id:k, d:dd, disable: 'disabled_pagin', dayOf:dayOf})
        else rows.push({id:k, d:dd, dayOf:dayOf})
    }
    return(rows.map(row => {
            return (
                <Pagination.Item active={row.active} className={row.disable} key={row.id}>{row.d}<span style={{fontSize :'.9rem'}}>{row.dayOf}</span></Pagination.Item>
            )}
    ))
}

function RenderDataPagination(props) {

    return(
        <Pagination className='Pagination_date'>
            <DatePagination
            StartDate={props.StartDate}
            EndDate={props.EndDate}
            />
        </Pagination>
    )
}

export default RenderDataPagination