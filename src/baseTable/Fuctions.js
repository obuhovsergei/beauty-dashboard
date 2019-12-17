import React from "react";
import moment from "moment";
import {Pagination} from "react-bootstrap";

//Get time Now
const Time_Now = ( m = moment(new Date()).add(-12, 'hour') ) => m.hour()*60 + m.minute();

//Add Pass names for specialists
const List_Workers_add = (Specialists) => {
    let List_Workers = [];
    Specialists.forEach(elem => List_Workers.push(elem, {id:'pass_'+elem.id, title:''}));
    return List_Workers;
};

//Generate paginate list for Dates
const Generate_Paginator = (StartDate, EndDate) => {
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

//Return time, price, firstName to order
const return_TIME_PRICE_ = (List_Menu, data) => {
    const id_menus = data.id_menu;
    const menus = [];
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

//Return classes for orders
const Check_TIME_and_Return_Classes_ = ( CheckTime, Payd, Status ) => {
    if(isNaN(CheckTime)) return false; //Check on Number
    //Get now minutes
    const Time_Now_Today = Time_Now();
    if(CheckTime <= Time_Now_Today){
        if(Status && Payd) return {
            Time:'ClockCome',
            Money:'moneyGreen',
            BoxShadow:'grayShadow'
        };
        else return {
            DidNotCome:'DidNotCome',
            Time:'ClockNotCome',
            Money:'moneyGray',
            BoxShadow:'redShadow'
        };
    }
    else return {
        Time:'ClockWaitCome',
        Money:'moneyGray',
        BoxShadow:'defaultShadow'
    }
};

//Get Total price and time
const ChangeTotalTimePrice = (getDatafromArr) => {
    const TimeTot = getDatafromArr.reduce((result, num) => result + num.time, 0);
    const PriceTot = getDatafromArr.reduce((result, num) => result + num.price, 0);
    return {price:PriceTot, time:TimeTot}
};

//Get time from minutes
const getTimeToMin = (mins) => {
    const hours = Math.trunc(mins/60);
    const minutes = mins % 60;
    return  (hours&&minutes) ? hours + ' hour ' + minutes + ' minutes':
        (hours&&!minutes)?hours + ' hour ':
            minutes + ' minutes'
};

//Return total Start and End times
const Return_Start_End_Times = (StartMinutes, EndMinutes) => {
    if(typeof(StartMinutes) === 'number' && typeof(EndMinutes) === 'number'){
        const Start = moment().startOf('day').add(StartMinutes, 'minutes').format('HH:mm');
        const End = moment().startOf('day').add(StartMinutes + EndMinutes, 'minutes').format('HH:mm');
        if(StartMinutes > 1) return {Start:Start, End:End }
        else return {Start:StartMinutes, End:End }
    }
    else return false
};

//Sorting groups by flag
const Sorting_ListOrders = (flag, Product, List_Orders,List_Menu, infoModal) => {
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
};

//Sorting by time_start
const Sort_other_ListGroup = (groups) => groups.sort(function (a,b) {return a.time_start < b.time_start ? -1 : 1}).reduce(function(groups, el){
        if(!groups.length || groups[groups.length - 1].id !== el.time_start) groups.push(el)
        return groups
    }, []);

//Sorting by ID's and ++ menu values
const ValueOfMenus = (Menus) => {
    //Count repeat ID's
    const CountOfMenus = Menus.reduce(function (item, i) {
        if (!item.hasOwnProperty(i.id)) item[i.id] = 0;
        item[i.id]++;
        return item;
    }, {});

    let NewMenus = Menus.slice();
    NewMenus.forEach((menu, index) => {
        for(let count in CountOfMenus){
            if(menu.id === Number(count) && CountOfMenus[count] > 1) {
                NewMenus[index].value = CountOfMenus[count];
                NewMenus[index].time = menu.timeDef * CountOfMenus[count];
                NewMenus[index].price = menu.priceDef * CountOfMenus[count];
            }
        }
    });
    //Sort and del any copy menus
    return NewMenus.sort(function (a,b) {return a.id < b.id ? -1 : 1}).reduce(function(NewMenus, el){
        if(!NewMenus.length || NewMenus[NewMenus.length - 1].id !== el.id) NewMenus.push(el)
        return NewMenus
    }, [])
};

export {
    List_Workers_add,
    Generate_Paginator,
    Time_Now,
    return_TIME_PRICE_,
    Check_TIME_and_Return_Classes_,
    ChangeTotalTimePrice,
    getTimeToMin,
    Return_Start_End_Times,
    Sorting_ListOrders,
    Sort_other_ListGroup,
    ValueOfMenus
}

