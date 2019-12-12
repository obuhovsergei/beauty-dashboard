import React, { useContext } from "react";
import { Row, Col, Image } from 'react-bootstrap';
import Scissors from '../img/Sclssors.png';
import PropTypes from 'prop-types';
import Context from "./Context";
import { IoIosTrash, IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import { getTimeToMin } from "../baseTable/Fuctions";


function Menu_List({ menu }){
    const { removeMenu, toggleMenu } = useContext(Context);

    return (
        <li key={(new Date()).getTime()} className='Li_menus'>
            <div className="Menu_List_Name_value">
                <Row>
                    <Col xs={6}>
                        <Image src={Scissors} className='Image_menus' />
                        <h6 className='Name_menus'>{menu.name}</h6>
                    </Col>
                    <Col xs={6}>
                        <span
                            className='Value_menus'
                            onClick={removeMenu.bind(null, menu.id)}
                        ><IoIosTrash /></span>
                        <div className='Value_menus'>
                            <IoIosArrowBack
                                className='Arrows_menus'
                                onClick={toggleMenu.bind(null, menu.id, 'down')}/>
                            <strong>{menu.value}</strong>
                            <IoIosArrowForward
                                className='Arrows_menus'
                                onClick={toggleMenu.bind(null, menu.id, 'up')}/>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='Price_menus'>
                <span>
                    {getTimeToMin(menu.time)} - {menu.price}$
                </span>
            </div>
        </li>)
}

Menu_List.propTypes = {
    menu:PropTypes.object.isRequired
};

export default Menu_List;