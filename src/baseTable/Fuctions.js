import React from "react";
import moment from "moment";
import {Pagination} from "react-bootstrap";

//Get time Now
const TimeNow = ( m = moment(new Date()) ) => m.hour()*60 + m.minute();

//Add Pass names for specialists
const ListWorkersAddName = (Specialists, Height) => {
    let ListWorkers = [];
    Specialists.forEach((elem, index) => {
        elem['height'] = Height[index].value;
        ListWorkers.push(elem, {id:'pass_'+elem.id, title:''})
    });
    return ListWorkers;
};

//Generate pagination list for Dates
const GeneratePagination = (StartDate, EndDate) => {
    const start = moment.parseZone(StartDate, 'DD MM YYYY');
    const end = moment.parseZone(EndDate, 'DD MM YYYY');

    if (!start.isValid() || !end.isValid() || end < start) return(<Pagination.Item>Insert Date is no valid!</Pagination.Item>);

    const rows = [];
    let k = 0; //ID
    const BeforeFromNow = Math.abs( moment( end ).fromNow() );  // Count days before EndTime
    const AfterFromNow = moment(start).fromNow();           // Count days beforeStartTime
    //Dates before today
    for(let i = AfterFromNow; i > 0; i--){
        const dd = moment().subtract(i, 'days').format('DD');
        const dayOf = moment().subtract(i, 'days').format('dd');
        const Month = moment().subtract(i, 'days').format('MMM');
        k=++k;
        (dd === '01') ? rows.push({id:Month, d:Month, disable: 'disabled_pagin'}, {id:k, d:dd, dayOf:dayOf})    :
        (dayOf === 'Sa' || dayOf === 'Su') ? rows.push({id:k, d:dd, disable: 'disabled_pagin', dayOf:dayOf})    :
        rows.push({id:k, d:dd, dayOf:dayOf})
    }
    //Dates after today
    for(let i = 0; i < BeforeFromNow; i++){
        const check = moment().add(i, 'days');
        const dd = check.format('DD');
        const dayOf = check.format('dd');
        const Month = check.format('MMM');
        k=++k;
        (dd === '01') ? rows.push({id:Month, d:Month, disable: 'disabled_pagin'}, {id:k, d:dd, dayOf:dayOf})   :
        (check.isSame(moment(), 'day')) ? rows.push({id:k, d:dd, active: true, dayOf:dayOf})        :
        (dayOf === 'Sa' || dayOf === 'Su') ? rows.push({id:k, d:dd, disable: 'disabled_pagin', dayOf:dayOf})   :
        rows.push({id:k, d:dd, dayOf:dayOf})
    }
    return rows
};

//Return time, price, firstName to order
const getTimePrice = (ListMenu, data) => {
    if(!data) return false;
    const idMenus = data.id_menu;
    const menus = [];
    for(let i=0; i<idMenus.length; i++){
        for(let j=0; j<ListMenu.length; j++){
            if(ListMenu[j].id === idMenus[i]) menus.push(ListMenu[j])
        }
    }
    let NameFirst = '';
    for(let k=0; k < menus.length; k++){
        if(k === 0) NameFirst = menus[k].name
    }
    const Time = menus.reduce((result, num) => result + num.time, 0);
    const Price = menus.reduce((result, num) => result + num.price, 0);
    const ColSpan = Math.ceil(Time/30);
    const Width_percent = Math.round((Time/30) / ColSpan * 100) + '%';
    return {time:Time, price:Price, name_first_menu:NameFirst, ColSpan:ColSpan, Width_percent: Width_percent}
};

//Return classes for orders
const CheckTimeAndReturnClasses = ( CheckTime, Payd, Status ) => {
    if(isNaN(CheckTime)) return false; //Check on Number
    //Get now minutes
    const TimeNowToday = TimeNow();
    if(CheckTime <= TimeNowToday){
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
const ChangeTotalTimePrice = (getDataFromArr) => {
    const TimeTot = getDataFromArr.reduce((result, num) => result + num.time, 0);
    const PriceTot = getDataFromArr.reduce((result, num) => result + num.price, 0);
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
const getStartEndTimes = (StartMinutes, EndMinutes) => {
    if(typeof(StartMinutes) === 'number' && typeof(EndMinutes) === 'number'){
        const Start = moment().startOf('day').add(StartMinutes, 'minutes').format('HH:mm');
        const End = moment().startOf('day').add(StartMinutes + EndMinutes, 'minutes').format('HH:mm');
        if(StartMinutes > 1) return {Start:Start, End:End };
        else return {Start:StartMinutes, End:End }
    }
    else return false
};

//Sorting groups by flag
const SortingListOrders = (flag, Product, List_Orders,List_Menu, infoModal, setInfoModal) => {
    const active_Menus = [];
    infoModal.id_menu.forEach(id_menu =>{
        List_Menu.forEach(order_menu =>{if(order_menu.id === id_menu) active_Menus.push(order_menu)})
    });
    const TotalMenuToggle = ChangeTotalTimePrice(active_Menus);
    const TotalTime = infoModal.time_start + TotalMenuToggle.time;

    List_Orders.forEach(list => {if(list.id === infoModal.id) flag = true});
    //Filter group
    const FilteredListOrders = List_Orders.filter(list => list.group === infoModal.group);
    //Sort and del any copy menus
    const SortingListOrders = FilteredListOrders.sort(function (a,b) {return a.time_start < b.time_start ? -1 : 1}).reduce(function(FilteredListOrders, el){
        if(!FilteredListOrders.length || FilteredListOrders[FilteredListOrders.length - 1].id !== el.time_start) FilteredListOrders.push(el);
        return FilteredListOrders
    }, []);
    //Sort to Time_start and push new menu if second order no have many time
    SortingListOrders.forEach((list, index, arr) => {
        if(list.id === infoModal.id && arr[index+1]) {
            if(arr[index+1].time_start > TotalTime){
                setInfoModal(prev => ({...prev, id_menu: [...prev.id_menu, Product]}));
                list.id_menu.push(Product);
            }
        }
    });
};

//Sorting by time_start
const SortOtherListGroup = (groups) => groups.sort(function (a,b) {return a.time_start < b.time_start ? -1 : 1}).reduce(function(groups, el){
        if(!groups.length || groups[groups.length - 1].id !== el.time_start) groups.push(el);
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

    let NewMenus = Menus.slice(); //Create copy
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
        if(!NewMenus.length || NewMenus[NewMenus.length - 1].id !== el.id) NewMenus.push(el);
        return NewMenus
    }, [])
};

export {
    ListWorkersAddName,
    GeneratePagination,
    TimeNow,
    getTimePrice,
    CheckTimeAndReturnClasses,
    ChangeTotalTimePrice,
    getTimeToMin,
    getStartEndTimes,
    SortingListOrders,
    SortOtherListGroup,
    ValueOfMenus
}

