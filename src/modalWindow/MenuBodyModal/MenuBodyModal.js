import React from "react";
import MenuList from '../OrderMenuListModal/OrderMenuListModal';
import TotalInfoRender from "../TotalInformationModal/TotalInformationModal";
import AddNewProductsModal from "../AddNewProductsModal/AddNewProductsModal";
import {ChangeTotalTimePrice, ValueOfMenus} from "../../baseTable/Fuctions";
import './MenuBodyModal.css'


const Order_menu_of_User = ({infoModal}) => {
    const ListMenu = JSON.parse(localStorage.getItem("ListMenu")); //Get current ListMenu
    // Modal Active Menus
    const ActiveMenus = [];
    infoModal.id_menu.forEach(id_menu =>{
        ListMenu.forEach(order_menu =>{if(order_menu.id === id_menu) ActiveMenus.push(order_menu)})
    });
    //Modal Total Price
    const TotalMenu = ChangeTotalTimePrice(ActiveMenus); // Change Price and Time from Menus
    const OrdersMenus = ValueOfMenus(ActiveMenus); //Sort and delete
    return (
        <div className="Menu_modal">
            {OrdersMenus.length ? (
                <ul className='List_Total_Specialists'>
                    { OrdersMenus.map(menu => {
                        return (<MenuList menu={menu} key={menu.id} />)
                    })}
                </ul>
            ):(
                <p className='noMenu'>Sorry, you no have any orders</p>
            )}
            <AddNewProductsModal />
            <TotalInfoRender TotalMenu={ TotalMenu } key={(new Date()).getTime()} />
        </div>
    )
};

export default Order_menu_of_User;