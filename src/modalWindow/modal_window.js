import React, {useContext} from 'react';
import './modal_window.css';
import Context from './Context';
import ModalContext from "../baseTable/ModalContext";
import { IoIosClose } from 'react-icons/io';
import Information_of_User from './Contacts_modal.js';
import Order_menu_of_User from './Order_menu.js';
import { ChangeTotalTimePrice } from "../baseTable/Fuctions";


function ModalWindow() {
    const { List_Menu, infoModal, ShowModal } = useContext(ModalContext);

    // Modal Active Menus
    let ActiveMenus = [];
    infoModal.id_menu.forEach(id_menu =>{
        List_Menu.forEach(order_menu =>{if(order_menu.id === id_menu) ActiveMenus.push(order_menu)})
    });
    const [order_menus, setOrder_menus] = React.useState(ActiveMenus);

    //Modal Total Price
    const TotalMenu = ChangeTotalTimePrice(order_menus, [{price:0, time:0}]); /* Change Price and Time from Menus*/


    // Modal Change order in menus. Up and down value
    function toggleMenu(id, toggle) {
        /*let flag = false;
        let Up_Menu;
        for(let i=0; i<order_menus.length; i++) {
            if(order_menus[i].id === id){
                if(toggle === 'down'){
                    if(order_menus[i].value === 1) setOrder_menus(order_menus.filter(menu => menu.id !== id));
                    else if(order_menus[i].value > 1) flag = true;
                    else setOrder_menus(order_menus.filter(menu => menu.id !== id));
                }
                else Up_Menu = order_menus[i];
            }
        }
        if(toggle === 'up')setOrder_menus(order_menu=> [... order_menu, Up_Menu]);
        if(flag){
            console.log(order_menus)
            setOrder_menus(order_menus=> {
                return order_menus.map(menu => {
                    if(menu.id === id){
                        menu.value = menu.value - 1;
                        return menu
                    }

                })
            })
        }*/
    }

    function removeMenu(id) {
        //setOrder_menus(order_menus.filter(menu => menu.id !== id));
    }
    return (
        <Context.Provider value={{ removeMenu, toggleMenu }}>
            <div className='ModalWindow'>
                <div className='ModalWindow-body'>
                    <div className='Close_modal'><IoIosClose onClick={ShowModal.bind(null, false)}/></div>
                    <div className="ModalWindow-left">
                        <Information_of_User />
                    </div>
                    <div className="ModalWindow-right">
                        <Order_menu_of_User
                            order_menus = {order_menus}
                            total_menu = {TotalMenu}
                        />
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}

export default ModalWindow;