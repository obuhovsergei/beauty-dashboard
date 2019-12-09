import React, {useContext} from 'react';
import './modal_window.css';
import Context from './Context';
import ModalContext from "../baseTable/ModalContext";
import { IoIosClose } from 'react-icons/io';
import Information_of_User from './Contacts_modal.js';
import Order_menu_of_User from './Order_menu.js';


function ModalWindow() {
    const { List_Orders, infoModal, ShowModal } = useContext(ModalContext);

    // Modal Change order in menus. Up and down value
    function toggleMenu(id, toggle) {
        const ID_List_orders = infoModal.id;
        if(toggle === 'up') List_Orders.map(infoModal => {if(infoModal.id === ID_List_orders) infoModal.id_menu.push(id)})
        else List_Orders.map(infoModal => {if(infoModal.id === ID_List_orders){
            for(let j=0; j<infoModal.id_menu.length; j++){
                if(infoModal.id_menu[j] === id) {
                    infoModal.id_menu.splice(id, 1);
                    break
                }
            }
        }})
    }

    function removeMenu(id) {
        const ID_List_orders = infoModal.id;
        List_Orders.map(infoModal => {if(infoModal.id === ID_List_orders){
            let Arr = [];
            for(let j=0; j<infoModal.id_menu.length; j++){
                if(infoModal.id_menu[j] !== id) Arr.push(infoModal.id_menu[j])
            }
            infoModal.id_menu = Arr;
        }})
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
                        <Order_menu_of_User />
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}

export default ModalWindow;