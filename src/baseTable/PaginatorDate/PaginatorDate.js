import React from 'react';
import {Pagination} from 'react-bootstrap';
import moment from 'moment';
import './PaginatorDate.css';
import { Generate_Paginator } from '../Fuctions';

//Bug fix moment
moment.fn.fromNow = function () {return moment().diff(this, 'days')};

const DatePagination = ({StartDate, EndDate}) => {
    const rows = Generate_Paginator(StartDate, EndDate);
    return(
        <Pagination className='Pagination_date'>
            {rows.map(row => {
                return (
                    <Pagination.Item active={row.active} className={row.disable} key={row.id}>
                        {row.d}
                        <span className='DayOf'>{row.dayOf}</span>
                    </Pagination.Item>
                )})
            }
        </Pagination> )
};

export default DatePagination