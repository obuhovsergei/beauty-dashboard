import React, {useContext} from "react";
import Menu_List from './Order_menu_list';
import Total_info_render from "./Total_info_render";
import AddNewProduct from "./AddNewProduct";
import ModalContext from "../baseTable/ModalContext";
import {ChangeTotalTimePrice} from "../baseTable/Fuctions";

const styles = {
    ul:{
        listStyle:'none',
        margin:0,
        padding:0
    },
    noMenu:{
        textAlign:'center'
    },
    Total_info:{
        margin:'2em 0 0',
        background: '#FFFFFF',
        border: '1px solid #E1E1E1',
        borderRadius: '4px',
        height: '36px'
    },
    Pay:{
        textTransform: 'uppercase',
        float: 'right',
        height: '36px'
    },
    Total_price:{
        textTransform: 'bold',
        textAlign: 'center',
        padding: '.25rem 2rem',
        height: '36px',
        float:'right'
    }
};

function ValueOfMenus(Menus){
    //Count repeat ID's
    const CountOfMenus = Menus.reduce(function (item, i) {
        if (!item.hasOwnProperty(i.id)) item[i.id] = 0;
        item[i.id]++;
        return item;
    }, {});

    let NewMenus = Menus.slice();
    NewMenus.forEach((menu, index) => {
        for(let count in CountOfMenus){
            if(menu.id == count && CountOfMenus[count] > 1) {
                NewMenus[index].value = CountOfMenus[count];
                NewMenus[index].time = menu.timeDef * CountOfMenus[count];
                NewMenus[index].price = menu.priceDef * CountOfMenus[count];
            }
        }
    });
    //Sort and del any copy menus
    const newArr = NewMenus.sort(function (a,b) {return a.id < b.id ? -1 : 1}).reduce(function(NewMenus, el){
        if(!NewMenus.length || NewMenus[NewMenus.length - 1].id !== el.id) NewMenus.push(el)
        return NewMenus
    }, []);
    return newArr
}

function Order_menu_of_User() {
    const { infoModal} = useContext(ModalContext);
    const List_Menu = JSON.parse(localStorage.getItem("List_Menu")); //Костыль
    // Modal Active Menus
    let ActiveMenus = [];
    // ЗДЕСЬ ОБНОВЛЕНИЕ МЕНЮ ЧЕРЕЗ useState СДЕЛАТЬ!
    infoModal.id_menu.forEach(id_menu =>{
        List_Menu.forEach(order_menu =>{if(order_menu.id === id_menu) ActiveMenus.push(order_menu)})
    });
    //Modal Total Price
    const TotalMenu = ChangeTotalTimePrice(ActiveMenus); /* Change Price and Time from Menus*/

    const Orders_menus = ValueOfMenus(ActiveMenus); //Sort and del

    return (
        <div className="Menu_modal">
            <div className="Order_menu">
                {Orders_menus.length ? (
                    <ul style={styles.ul} className='List_Total_Specialists'>
                        { Orders_menus.map(menu => {
                            return (<Menu_List menu={menu} key={menu.id} />)
                        })}
                    </ul>
                ):(
                    <p style={styles.noMenu}>Sorry, you no have any orders</p>
                )}
                <AddNewProduct />
                <Total_info_render TotalMenu={TotalMenu} key={(new Date()).getTime()} />
            </div>
        </div>
    )
}

export default Order_menu_of_User;