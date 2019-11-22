import React, { useContext } from "react";
import { Row, Col, Image } from 'react-bootstrap';
import Scissors from '../img/Sclssors.png';
import PropTypes from 'prop-types';
import Context from "./Context";
import { IoIosTrash, IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import getTimeToMin from "./getTimeToMin";

const styles = {
    Image:{
        width: '2em',
        padding: '0.3em',
        background: 'radial-gradient(66.21% 66.21% at 50% 56.8%, #FFE7DB 0%, #FFD6C0 100%)',
        borderRadius: '1em',
        float: 'left'
    },
    Name:{
        paddingTop: '0.3em',
        float:'left',
        paddingLeft: '1em'
    },
    Price:{
        background: '#F7F7F7',
        boxShadow: '0px 2px 70px rgba(0, 0, 0, 0.0904665)',
        borderRadius: '0 0 10px 10px',
        margin:'0 1.5em',
        padding: '.3em 0',
        textAlign:'center'
    },
    Li:{
        marginBottom: '1.5em',
        //cursor:'pointer'
    },
    Value:{
        float:'right',
        cursor:'pointer'
    },
    Arrows:{
        background: '#F1F1F1',
        margin:'0 1em',
        borderRadius: '1em',
        cursor:'pointer'
    }
}

function Menu_List({ menu }){

    const { removeMenu, toggleMenu } = useContext(Context)

    return <li key={menu.id} className="Menu_Item" style={styles.Li}>
        <div className="Menu_List_Name_value">
            <Row>
                <Col xs={6}>
                    <Image src={Scissors} style={styles.Image} />
                    <h6 style={styles.Name}>{menu.name}</h6>
                </Col>
                <Col xs={6}>
                    <span
                        style={styles.Value}
                        onClick={ removeMenu.bind(null, menu.id)}
                    ><IoIosTrash /></span>
                    <div style={styles.Value}>
                        <IoIosArrowBack
                            style={styles.Arrows}
                            onClick={toggleMenu.bind(null, menu.id, 'down')}/>
                        <span>{menu.value}</span>
                        <IoIosArrowForward
                            style={styles.Arrows}
                            onClick={toggleMenu.bind(null, menu.id, 'up')}/>
                    </div>

                </Col>
            </Row>
        </div>
        <div className="Menu_List_Time_Price" style={styles.Price}>
            <span>{
                getTimeToMin(menu.time)} - {menu.price}$
            </span>
        </div>
    </li>
}

Menu_List.propTypes = {
    menu:PropTypes.object.isRequired
}

export default Menu_List;