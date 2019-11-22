import React, {useContext} from "react";
import PropTypes from 'prop-types';
import { IoIosAdd } from 'react-icons/io';
import Menu_List from './Order_menu_list';
import Total_info_render from "./Total_info_render";

const styles = {
    ul:{
        listStyle:'none',
        margin:0,
        padding:0
    },
    addIcon:{
        background: '#FFFFFF',
        border: '1px solid #D9D9D9',
        width:'28px',
        height:'28px',
        borderRadius:'1em',
        float:'left',
        marginRight:'1em',
        boxShadow: '0px 1px 3px rgba(168, 168, 168, 0.21691)',
        cursor:'pointer'
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



function Order_menu_of_User(props) {
    return (
        <div className="Menu_modal">
            <div className="Order_menu">
                {props.order_menus.length ? (
                    <ul style={styles.ul}>
                        { props.order_menus.map(menu => {
                            return <Menu_List menu={menu} key={menu.id} />
                        })}
                    </ul>
                ):(
                    <p style={styles.noMenu}>Sorry, you no have menu</p>
                )}

                <div className="Add_services">
                    <IoIosAdd style={styles.addIcon} />
                    <span>Add goods or services</span>
                </div>
                { props.total_menu.map(TotalMenu => {
                    return <Total_info_render TotalMenu={TotalMenu} key={(new Date).getTime()} />
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