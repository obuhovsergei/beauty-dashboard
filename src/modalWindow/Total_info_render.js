import getTimeToMin from "./getTimeToMin";
import {Button} from "react-bootstrap";
import React from "react";

const styles = {
    Total_info:{
        margin:'2em 0 0',
        background: '#FFFFFF',
        border: '1px solid #E1E1E1',
        borderRadius: '4px',
        height: '36px'
    }
}

function Total_info_render({TotalMenu}){
    return(
        <div style={styles.Total_info}>
            <div>
                <span style={styles.Total_price}>{getTimeToMin(TotalMenu.time)}</span>
                <span style={styles.Total_price}><strong>{TotalMenu.price}$</strong></span>
            </div>
            <Button variant="success" size="sm" style={styles.Pay}>Pay</Button>
        </div>
    )
}
export default Total_info_render