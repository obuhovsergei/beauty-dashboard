import React from 'react';
import {Pagination} from 'react-bootstrap';
import moment from 'moment';
import './Table.css';
import { Generate_Paginator } from './Fuctions';

//Исправление косяка moment
moment.fn.fromNow = function (a) {
    var duration = moment().diff(this, 'days');
    return duration;
};


function DatePagination({StartDate, EndDate}){
    const rows = Generate_Paginator(StartDate, EndDate);
    console.log(rows)
    return(
        <Pagination className='Pagination_date'>
            {rows.map(row => {
                return (
                    <Pagination.Item active={row.active} className={row.disable} key={row.id}>{row.d}<span style={{fontSize :'.9rem'}}>{row.dayOf}</span></Pagination.Item>
                )})
            }
        </Pagination> )
}

export default DatePagination