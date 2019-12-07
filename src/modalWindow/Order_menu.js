import React from "react";
import PropTypes from 'prop-types';
import Menu_List from './Order_menu_list';
import Total_info_render from "./Total_info_render";
import AddNewProduct from "./AddNewProduct";

const styles = {
    ul:{
        listStyle:'none',
        margin:0,
        padding:0
    },
    noMenu:{
        textAlign:'center'
    },
    Total_info:{
        margin:'2em 0 0',
        background: '#FFFFFF',
        border: '1px solid #E1E1E1',
        borderRadius: '4px',
        height: '36px'
    },
    Pay:{
        textTransform: 'uppercase',
        float: 'right',
        height: '36px'
    },
    Total_price:{
        textTransform: 'bold',
        textAlign: 'center',
        padding: '.25rem 2rem',
        height: '36px',
        float:'right'
    }
};

function ValueOfMenus(Menus){
    let val = -1;
    let id = 0;
    let arr =[];
    for(let i = 0; i<Menus.length; i++){
        if(val === Menus[i].id ){
            id = Menus[i].id
        }
        else {
            arr.push(Menus[i])
            val = Menus[i].id;
        }
    }
    for(let i = 0; i<arr.length; i++){
        if(id === arr[i].id){
            arr[i].value = arr[i].value+1;
            arr[i].time = arr[i].time*2;
            arr[i].price = arr[i].price*2;
        }
    }
    return arr
}

function Order_menu_of_User({order_menus, total_menu, infoModal}) {
    const Orders_menus = ValueOfMenus(order_menus);
    return (
        <div className="Menu_modal">
            <div className="Order_menu">
                {Orders_menus.length ? (
                    <ul style={styles.ul}>
                        { Orders_menus.map(menu => {
                            return (<Menu_List menu={menu} key={menu.id} />)
                        })}
                    </ul>
                ):(
                    <p style={styles.noMenu}>Sorry, you no have any orders</p>
                )}
                <AddNewProduct
                    infoModal={infoModal}
                />
                { total_menu.map(TotalMenu => {
                    return (<Total_info_render TotalMenu={TotalMenu} infoModal={infoModal} key={(new Date()).getTime()} />)
                })}
            </div>
        </div>
    )
}

Order_menu_of_User.propTypes = {
    order_menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    total_menu: PropTypes.array.isRequired
}

export default Order_menu_of_User;