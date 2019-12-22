import React, {useContext} from 'react';
import './WindowModal.css';
import Context from './Context';
import ModalContext from "../baseTable/ModalContext";
import { IoIosClose } from 'react-icons/io';
import InformationOfUser from './ContactsModal/ContactsModal.js';
import OrderMenuOfUser from './MenuBodyModal/MenuBodyModal.js';
import { Sorting_ListOrders } from "../baseTable/Fuctions";


function ModalWindow() {
    let { List_Orders, infoModal, setInfoModal, ShowModal, List_Menu } = useContext(ModalContext);
    // Modal Change order in menus. Up and down value
    const toggleMenu = (Product, toggle) => {
        const ID_List_orders = infoModal.id;
        let flag = false;
        if(toggle === 'up') Sorting_ListOrders(flag, Product, List_Orders,List_Menu, infoModal, setInfoModal);
        else {
            //Array of id_menu of menus
            let ARR = [];
            List_Orders.forEach(order => { if(order.id === ID_List_orders) ARR = order.id_menu });
            for(let i = 0; i < ARR.length; i++) {
                if( ARR[i] === Product ) { ARR.splice(i, 1); break }
            }
            //Update infoModal
            setInfoModal(prev => ({...prev, id_menu: ARR}));
            //Return mutation id_menus
            List_Orders.forEach((order, index, arr) => {
                if( order.id === ID_List_orders ) {
                    //Delete order if no have id_menus
                    (ARR.length)
                        ? order.id_menu = ARR
                        : arr.splice(index, 1)
                }
            });
        }
        //Save to LocalStorage
        if(localStorage.getItem('List_Orders') !== null && List_Orders && !flag) localStorage.setItem('List_Orders', JSON.stringify(List_Orders));
    };

    const removeMenu = (id) => {
        const ID_List_orders = infoModal.id;
        //Array of id_menu of menus
        let ID_menus = [];
        List_Orders.forEach(order => { if( order.id === ID_List_orders ) ID_menus = order.id_menu });
        ID_menus = ID_menus.filter(ID => ID !== id);
        //Update infoModal
        setInfoModal(prev => ({...prev, id_menu: ID_menus}));
        //Return mutation id_menus
        List_Orders.forEach((order, index, arr) => {
            if( order.id === ID_List_orders ) {
                //Delete order if no have id_menus
                (ID_menus.length)
                    ? order.id_menu = ID_menus
                    : arr.splice(index, 1)
            }
        });
        //Save to LocalStorage
        if(localStorage.getItem('List_Orders') !== null && List_Orders) localStorage.setItem('List_Orders', JSON.stringify(List_Orders));
    };

    return (
        <Context.Provider value={{ removeMenu, toggleMenu }}>
            <div className='ModalWindow'>
                <div className='ModalWindow-body'>
                    <div className='Close_modal'><IoIosClose onClick={ShowModal.bind(null, false)}/></div>
                    <div className="ModalWindow-left">
                        <InformationOfUser />
                    </div>
                    <div className="ModalWindow-right">
                        <OrderMenuOfUser infoModal={infoModal}/>
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}

export default ModalWindow;