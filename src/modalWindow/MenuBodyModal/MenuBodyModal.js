import React, {useContext} from "react";
import MenuList from '../OrderMenuListModal/OrderMenuListModal';
import TotalInfoRender from "../TotalInformationModal/TotalInformationModal";
import AddNewProductsModal from "../AddNewProductsModal/AddNewProductsModal";
import ModalContext from "../../baseTable/ModalContext";
import {ChangeTotalTimePrice, ValueOfMenus} from "../../baseTable/Fuctions";
import './MenuBodyModal.css'


const Order_menu_of_User = () => {
    const { infoModal} = useContext(ModalContext);
    const List_Menu = JSON.parse(localStorage.getItem("List_Menu")); //Костыль
    // Modal Active Menus
    const ActiveMenus = [];
    // ЗДЕСЬ ОБНОВЛЕНИЕ МЕНЮ ЧЕРЕЗ useState СДЕЛАТЬ!

    infoModal.id_menu.forEach(id_menu =>{
        List_Menu.forEach(order_menu =>{if(order_menu.id === id_menu) ActiveMenus.push(order_menu)})
    });
    //Modal Total Price
    const TotalMenu = ChangeTotalTimePrice(ActiveMenus); /* Change Price and Time from Menus*/
    const Orders_menus = ValueOfMenus(ActiveMenus); //Sort and del
    return (
        <div className="Menu_modal">
            {Orders_menus.length ? (
                <ul className='List_Total_Specialists'>
                    { Orders_menus.map(menu => {
                        return (<MenuList menu={menu} key={menu.id} />)
                    })}
                </ul>
            ):(
                <p className='noMenu'>Sorry, you no have any orders</p>
            )}
            <AddNewProductsModal />
            <TotalInfoRender TotalMenu={TotalMenu} key={(new Date()).getTime()} />
        </div>
    )
};

export default Order_menu_of_User;