import React from 'react';
import { Button } from 'react-bootstrap';
import './modal_window.css';
import Context from './Context'
import { IoIosClose} from 'react-icons/io';
import Information_of_User from './Contacts_modal.js';
import Order_menu_of_User from './Order_menu.js';
import ChangeTotalTimePrice from "./ChangeTotalTimePrice";


function ModalWindow() {
    //Modal Menus
    const [order_menus, setOrder_menus] = React.useState([
        {id:1, name:"Haircut standart", value:1, time:30, timeDef:30, price:13, priceDef:13},
        {id:2, name:"Face cleaning", value:1, time:30, timeDef:30, price:13, priceDef:13},
        {id:3, name:"Face cleaning №1", value:1, time:15, timeDef:15, price:10, priceDef:10}
    ]);

    // Modal Windows State
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Modal Total Price
    const [TotalMenu, setTotalMenu] = React.useState([{price:0, time:0}]);
    ChangeTotalTimePrice(order_menus, TotalMenu); /* Change Price and Time from Menus*/


    // Modal Change order in menus. Up and down value
    function toggleMenu(id, toggle) {
        setOrder_menus(
            order_menus.map(menu => {
                if(menu.id === id){
                    if(toggle === 'down' && menu.value > 1){
                        menu.value--;
                        menu.time -= menu.timeDef;
                        menu.price -= menu.priceDef;
                    }
                    else {
                        menu.value++;
                        menu.time += menu.timeDef;
                        menu.price += menu.priceDef;
                    }
                }
                return menu
            })
        );
        ChangeTotalTimePrice(order_menus, TotalMenu) /* Change Price and Time from Menus*/
    }

    function removeMenu(id) {
        setOrder_menus(
            order_menus.filter(menu => menu.id !== id)
            );
        ChangeTotalTimePrice(order_menus, TotalMenu) /* Change Price and Time from Menus*/
    }

    return (
        <Context.Provider value={{ removeMenu, toggleMenu }}>

            <Button variant="primary" onClick={handleShow}>
                Показать модалку
            </Button>
            {show &&(
                <div className='ModalWindow'>
                    <div className='ModalWindow-body'>
                        <div className='Close_modal'><IoIosClose onClick={handleClose}/></div>
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
            )}

        </Context.Provider>
    );
}

export default ModalWindow;