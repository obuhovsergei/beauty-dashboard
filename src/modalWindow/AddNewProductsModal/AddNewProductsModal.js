import React, {useContext, useState} from "react";
import { IoIosAdd } from 'react-icons/io';
import {ListGroup} from "react-bootstrap";
import ModalContext from "../../baseTable/ModalContext";
import {Sorting_ListOrders} from "../../baseTable/Fuctions";
import './AddNewProductsModal.css'

const styles = {
    openServices:{
        border: '1px solid #8D43FF',
        boxShadow: '0 2px 11px rgba(82, 66, 108, 0.157665)',
        borderRadius: '4px'
    }
}

const AddNewProductsModal = () => {
    const [dropdownMenus, setDropdownMenus] = useState(false);
    const {List_Menu, infoModal, setInfoModal, List_Orders} = useContext(ModalContext);
    const [openServices, setOpenServices] = useState({})
    //Open ListMenu and change Styles
    const ShowDropDownProduct = (Show) => {
        setDropdownMenus(Show);
        setOpenServices(styles.openServices);
    };
    //Add New products
    const AddProducts = (Product, disable) => {
        setDropdownMenus(false);    //Close Menus
        setOpenServices({});        //Css remove on menus
        if(!disable && Product) {
            //Checking infoModal in List_Orders
            let newOrder = false;
            List_Orders.forEach(list => {if(list.id === infoModal.id) newOrder = true});
            if(!newOrder){
                infoModal.id = List_Orders[List_Orders.length - 1].id + 1; //Add ID New Order
                setInfoModal(infoModal);
                List_Orders.push(infoModal);
            }
            //Add New products
            let flag = false;
            Sorting_ListOrders(flag, Product, List_Orders,List_Menu, infoModal);

            //Save to LocalStorage
            if(localStorage.getItem('List_Orders') !== null && List_Orders && !flag) localStorage.setItem('List_Orders', JSON.stringify(List_Orders));
        }
    };

    let New_List_Menu = JSON.parse(JSON.stringify(List_Menu)); //Cloning List_Menu
    //Default NewList Disabled
    New_List_Menu.forEach(NewList => NewList['disable'] = false);
    //Change NewList to Disabled
    infoModal.id_menu.forEach(IDMenu => {
        New_List_Menu.forEach(NewList => {if(IDMenu === NewList.id) NewList['disable'] = true})
    });

    return (
        <div className='New_Products' style={openServices}>
            {!dropdownMenus? (
                <div className="Add_services" onClick={ShowDropDownProduct.bind(null, true)}>
                    <IoIosAdd className='addIcon' />
                    <span className='AddGoodSpan'>Add goods or services</span>
                </div>
            ):(
                <ListGroup className='Menu_List_Name_value' variant='flush'>
                    <ListGroup.Item disabled className='Add_New_Products_List'>
                        <span>Products</span>
                    </ListGroup.Item>

                    {New_List_Menu.map(Menu =>
                        <ListGroup.Item
                            className='Add_New_Products_List'
                            key={Menu.id}
                            disabled={Menu.disable}
                            onClick={AddProducts.bind(null, Menu.id, Menu.disable)}
                        >
                            <span>{Menu.name}</span>
                            <span>{Menu.priceDef}$</span>
                        </ListGroup.Item>
                    )}

                </ListGroup>
            )}
        </div>
    )
};

export default AddNewProductsModal