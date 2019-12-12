import React from "react";
import moment from "moment";
import {Pagination} from "react-bootstrap";

function Time_Now() {
    const m = moment(new Date()).add(-10, 'hour');
    return m.hour()*60 + m.minute()
}

function List_Workers_add(Specialists){
    let List_Workers = [];
    Specialists.forEach(elem => List_Workers.push(elem, {id:'pass_'+elem.id, title:''}));
    return List_Workers;
}

function Generate_Paginator(StartDate, EndDate) {
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
            rows.push({id:Month, d:Month, disable: 'disabled_pagin'})
            rows.push({id:k, d:dd, dayOf:dayOf})
        }
        else if(dayOf === 'Sa' || dayOf === 'Su') rows.push({id:k, d:dd, disable: 'disabled_pagin', dayOf:dayOf})
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

    return rows
}

function return_TIME_PRICE_(List_Menu, data) {
    const id_menus = data.id_menu;
    let menus = [];
    for(let i=0; i<id_menus.length; i++){
        for(let j=0; j<List_Menu.length; j++){
            if(List_Menu[j].id === id_menus[i]) menus.push(List_Menu[j])
        }
    }
    let NameFirst = '';
    for(let k=0; k < menus.length; k++){
        if(k === 0) NameFirst = menus[k].name
    }
    const Time = menus.reduce((result, num) => result + num.time, 0);
    const Price = menus.reduce((result, num) => result + num.price, 0);
    return {time:Time, price:Price, name_first_menu:NameFirst}
}

function Check_TIME_and_Return_Classes_( CheckTime, Payd, Status ) {
    if(isNaN(CheckTime)) return false; //Check on Number
    //Get now minutes
    const Time_Now_Today = Time_Now();

    if(CheckTime <= Time_Now_Today){
        if(!Status || Status && !Payd) return {
            DidNotCome:'DidNotCome',
            Time:'ClockNotCome',
            Money:'moneyGray',
            BoxShadow:'redShadow'
        };
        if(Status && Payd) return {
            Time:'ClockCome',
            Money:'moneyGreen',
            BoxShadow:'grayShadow'
        }
    }
    else return {
        Time:'ClockWaitCome',
        Money:'moneyGray',
        BoxShadow:'defaultShadow'
    }
}

function ChangeTotalTimePrice(getDatafromArr){
    const TimeTot = getDatafromArr.reduce((result, num) => result + num.time, 0);
    const PriceTot = getDatafromArr.reduce((result, num) => result + num.price, 0);
    let Arr = {price:PriceTot, time:TimeTot};
    return Arr
}

function getTimeToMin(mins){
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return  (hours&&minutes) ? hours + ' hour ' + minutes + ' minutes':
        (hours&&!minutes)?hours + ' hour ':
            minutes + ' minutes'
}

function Return_Start_End_Times (StartMinutes, EndMinutes){
    if(typeof(StartMinutes) === 'number' && typeof(EndMinutes) === 'number'){
        const Start = moment().startOf('day').add(StartMinutes, 'minutes').format('HH:mm');
        const End = moment().startOf('day').add(StartMinutes + EndMinutes, 'minutes').format('HH:mm');
        if(StartMinutes > 1) return {Start:Start, End:End }
        else return {Start:StartMinutes, End:End }
    }
    else return false
}

function Sorting_ListOrders(flag, Product, List_Orders,List_Menu, infoModal) {
    const active_Menus = [];
    infoModal.id_menu.forEach(id_menu =>{
        List_Menu.forEach(order_menu =>{if(order_menu.id === id_menu) active_Menus.push(order_menu)})
    });
    const TotalMenu_Toggle = ChangeTotalTimePrice(active_Menus);
    const TotalTime = infoModal.time_start + TotalMenu_Toggle.time;

    List_Orders.forEach(list => {if(list.id === infoModal.id) flag = true});
    //Filter group
    const Filtered_List_Orders = List_Orders.filter(list => list.group === infoModal.group);
    //Sort and del any copy menus
    const sorting_List_Orders = Filtered_List_Orders.sort(function (a,b) {return a.time_start < b.time_start ? -1 : 1}).reduce(function(Filtered_List_Orders, el){
        if(!Filtered_List_Orders.length || Filtered_List_Orders[Filtered_List_Orders.length - 1].id !== el.time_start) Filtered_List_Orders.push(el)
        return Filtered_List_Orders
    }, []);
    //Sort to Time_start
    sorting_List_Orders.forEach((list, index, arr) => {
        if(list.id === infoModal.id && arr[index+1]) {
            if(arr[index+1].time_start > TotalTime){infoModal.id_menu.push(Product)}
        }
    });
}

export {
    List_Workers_add,
    Generate_Paginator,
    Time_Now,
    return_TIME_PRICE_,
    Check_TIME_and_Return_Classes_,
    ChangeTotalTimePrice,
    getTimeToMin,
    Return_Start_End_Times,
    Sorting_ListOrders
}

