import React, {useContext, useState} from "react";
import { IoIosAdd } from 'react-icons/io';
import { ListGroup } from "react-bootstrap";
import ModalContext from "../../baseTable/ModalContext";
import { SortingListOrders } from "../../baseTable/Fuctions";
import './AddNewProductsModal.css'

const styles = {
    openServices:{
        border: '1px solid #8D43FF',
        boxShadow: '0 2px 11px rgba(82, 66, 108, 0.157665)',
        borderRadius: '4px'
    }
};

const AddNewProductsModal = () => {
    const [dropdownMenus, setDropdownMenus] = useState(false); //Dropdown for Menus
    const {ListMenu, infoModal, setInfoModal, ListOrders} = useContext(ModalContext);
    const [openServices, setOpenServices] = useState({}); // Styles for Menus
    //Open ListMenu and change Styles
    const ShowDropDownProduct = (Show) => {
        setDropdownMenus(Show);
        setOpenServices(styles.openServices);
    };
    //Close ListMenu and change Styles
    const CloseDropDownProduct = (Show) => {
        setDropdownMenus(Show);
        setOpenServices({});
    };
    //Add New products
    const AddProducts = (Product, disable) => {
        if(!disable && Product) {
            //Checking infoModal in List_Orders
            let newOrder = false;
            ListOrders.forEach(list => {if(list.id === infoModal.id) newOrder = true});
            if(!newOrder){
                infoModal.id = ListOrders[ListOrders.length - 1].id + 1; //Add ID New Order
                setInfoModal(infoModal);
                ListOrders.push(infoModal);
            }
            //Add New products
            let flag = false;
            SortingListOrders(flag, Product, ListOrders,ListMenu, infoModal, setInfoModal);

            //Save to LocalStorage
            if(localStorage.getItem('ListOrders') !== null && ListOrders && !flag) localStorage.setItem('ListOrders', JSON.stringify(ListOrders));
        }
    };

    let NewListMenu = JSON.parse(JSON.stringify(ListMenu)); //Cloning ListMenu
    //Default NewList Disabled
    NewListMenu.forEach(NewList => NewList['disable'] = false);
    //Change NewList to Disabled
    infoModal.id_menu.forEach(IDMenu => {
        NewListMenu.forEach(NewList => {if(IDMenu === NewList.id) NewList['disable'] = true})
    });

    return (
        <div className='New_Products' style={ openServices }>
            {!dropdownMenus? (
                <div className="Add_services" onClick={ShowDropDownProduct.bind(null, true)}>
                    <IoIosAdd className='addIcon' />
                    <span className='AddGoodSpan'>Add goods or services</span>
                </div>
            ):(
                <ListGroup className='Menu_List_Name_value' variant='flush' onClick={CloseDropDownProduct.bind(null, false)}>
                    <ListGroup.Item disabled className='Add_New_Products_List'>
                        <span>Products</span>
                    </ListGroup.Item>

                    { NewListMenu.map( Menu =>
                        <ListGroup.Item
                            className='Add_New_Products_List'
                            key={Menu.id}
                            disabled={Menu.disable}
                            onClick={AddProducts.bind(null, Menu.id, Menu.disable)}
                        >
                            <span>{Menu.name}</span>
                            <span>{Menu.priceDef}$</span>
                        </ListGroup.Item>
                    ) }

                </ListGroup>
            )}
        </div>
    )
};

export default AddNewProductsModal