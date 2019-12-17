import React, {useContext} from 'react';
import './WindowModal.css';
import Context from './Context';
import ModalContext from "../baseTable/ModalContext";
import { IoIosClose } from 'react-icons/io';
import InformationOfUser from './ContactsModal/ContactsModal.js';
import OrderMenuOfUser from './MenuBodyModal/MenuBodyModal.js';
import { Sorting_ListOrders } from "../baseTable/Fuctions";


function ModalWindow() {
    let { List_Orders, infoModal, ShowModal, List_Menu } = useContext(ModalContext);

    // Modal Change order in menus. Up and down value
    function toggleMenu(Product, toggle) {
        const ID_List_orders = infoModal.id;
        let flag = false;
        if(toggle === 'up') Sorting_ListOrders(flag, Product, List_Orders,List_Menu, infoModal);

        else List_Orders.forEach(infoModal => {
            if(infoModal.id === ID_List_orders){
                for(let ID_menu in infoModal.id_menu){
                    if(infoModal.id_menu[ID_menu] === Product){
                        infoModal.id_menu.splice(ID_menu, 1);
                        break
                    }
                }
            }
        });
        //Save to LocalStorage
        if(localStorage.getItem('List_Orders') !== null && List_Orders && !flag) localStorage.setItem('List_Orders', JSON.stringify(List_Orders));
    }

    function removeMenu(id) {
        const ID_List_orders = infoModal.id;
        let Arr = [];
        List_Orders.forEach(infoModal => {
            if(infoModal.id === ID_List_orders){
                for(let j=0; j<infoModal.id_menu.length; j++){
                     if(infoModal.id_menu[j] !== id) Arr.push(infoModal.id_menu[j])
                }
            }
        })
        infoModal.id_menu = Arr;
        //Delete if No have any Orders
        if(!infoModal.id_menu.length){
            let INDEX_DEL = 0
            List_Orders.forEach((list, index) => {if(list.id ===infoModal.id) INDEX_DEL = index})
            List_Orders.splice(INDEX_DEL, 1);
        }

        //Save to LocalStorage
        if(localStorage.getItem('List_Orders') !== null && List_Orders) localStorage.setItem('List_Orders', JSON.stringify(List_Orders));
    }

    return (
        <Context.Provider value={{ removeMenu, toggleMenu }}>
            <div className='ModalWindow'>
                <div className='ModalWindow-body'>
                    <div className='Close_modal'><IoIosClose onClick={ShowModal.bind(null, false)}/></div>
                    <div className="ModalWindow-left">
                        <InformationOfUser />
                    </div>
                    <div className="ModalWindow-right">
                        <OrderMenuOfUser />
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}

export default ModalWindow;