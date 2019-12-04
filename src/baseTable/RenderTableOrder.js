import React, {useState, useEffect} from 'react';
import moment from 'moment';
import { IoMdTime } from "react-icons/io";

function return_TIME_PRICE_ (Main_menu, data) {
    const id_menus = data.id_menu;
    let menus = [];
    for(let i=0; i<id_menus.length; i++){
        for(let j=0; j<Main_menu.length; j++){
            if(Main_menu[j].id === id_menus[i]) menus.push(Main_menu[j])
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
    const m = moment(new Date()).add(10, 'hour');
    const Time_Now_Today = m.hour()*60 + m.minute();
    if(CheckTime <= Time_Now_Today){
        if(!Status) return {
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

function Order({groupS, Main_menu, id}) {
    const startTime = moment().startOf('day').add(groupS.time_start, 'minutes').format('HH:mm');
    const TIME_PRICE = return_TIME_PRICE_(Main_menu, groupS);
    const ColSpan = Math.ceil(TIME_PRICE.time/30);
    const Width_percent = Math.round((TIME_PRICE.time/30) / ColSpan * 100) + '%';

    const [time_Classes, setTime_Classes] = useState(Check_TIME_and_Return_Classes_(groupS.time_start + TIME_PRICE.time, groupS.payd , groupS.status));

    useEffect(() => {
        let orderNew = null;
        orderNew = setInterval(() => {
            setTime_Classes(time_Classes => Check_TIME_and_Return_Classes_(groupS.time_start + TIME_PRICE.time, groupS.payd , groupS.status));
        }, 60000);
        return () => setInterval(orderNew);
    }, [time_Classes]);

    const ClassesBox = time_Classes.BoxShadow + ' InitData_in_Table'; //Create Classes for Box in Table

    return (<td key={id} style={{height: '86px', width:'152px', padding: '0 .2rem'}} colSpan={ColSpan}>

        <div className={ClassesBox} style={{width:Width_percent}}>
            <span>
                <strong className={time_Classes.Time}>
                    <IoMdTime/>
                    {startTime}
                </strong>
                <span style={{fontSize:'.5rem', display:'none'}} className={time_Classes.DidNotCome}>Did not come</span>
                <span className={time_Classes.Money}>{TIME_PRICE.price}$</span>
            </span>
            <span>{groupS.name}</span>
            <span>{TIME_PRICE.name_first_menu}</span>
        </div>
    </td>)
}

export default Order