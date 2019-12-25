import React, {useContext} from 'react';
import './WindowModal.css';
import Context from './Context';
import ModalContext from "../baseTable/ModalContext";
import { IoIosClose } from 'react-icons/io';
import InformationOfUser from './ContactsModal/ContactsModal.js';
import OrderMenuOfUser from './MenuBodyModal/MenuBodyModal.js';
import { SortingListOrders } from "../baseTable/Fuctions";


function ModalWindow() {
    let { ListOrders, infoModal, setInfoModal, ShowModal, ListMenu } = useContext(ModalContext);
    // Modal Change order in menus. Up and down value
    const toggleMenu = (Product, toggle) => {
        const IDListOrders = infoModal.id;
        let flag = false;
        if(toggle === 'up') SortingListOrders(flag, Product, ListOrders,ListMenu, infoModal, setInfoModal);
        else {
            //Array of id_menu of menus
            let ARR = [];
            ListOrders.forEach(order => { if(order.id === IDListOrders) ARR = order.id_menu });
            for(let i = 0; i < ARR.length; i++) {
                if( ARR[i] === Product ) { ARR.splice(i, 1); break }
            }
            //Update infoModal
            setInfoModal(prev => ({...prev, id_menu: ARR}));
            //Return mutation id_menus
            ListOrders.forEach((order, index, arr) => {
                if( order.id === IDListOrders ) {
                    //Delete order if no have id_menus
                    (ARR.length)
                        ? order.id_menu = ARR
                        : arr.splice(index, 1)
                }
            });
        }
        //Save to LocalStorage
        if(localStorage.getItem('ListOrders') !== null && ListOrders && !flag) localStorage.setItem('ListOrders', JSON.stringify(ListOrders));
    };

    const removeMenu = (id) => {
        const IDListOrders = infoModal.id;
        //Array of id_menu of menus
        let IDMenus = [];
        ListOrders.forEach(order => { if( order.id === IDListOrders ) IDMenus = order.id_menu });
        IDMenus = IDMenus.filter(ID => ID !== id); //Filtering for ID
        //Update infoModal
        setInfoModal(prev => ({...prev, id_menu: IDMenus}));
        //Return mutation id_menus
        ListOrders.forEach((order, index, arr) => {
            if( order.id === IDListOrders ) {
                //Delete order if no have id_menus
                (IDMenus.length)
                    ? order.id_menu = IDMenus
                    : arr.splice(index, 1)
            }
        });
        //Save to LocalStorage
        if(localStorage.getItem('ListOrders') !== null && ListOrders) localStorage.setItem('ListOrders', JSON.stringify(ListOrders));
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
                        <OrderMenuOfUser infoModal={ infoModal }/>
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}

export default ModalWindow;