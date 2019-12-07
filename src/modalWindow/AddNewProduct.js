import React, {useState} from "react";
import { IoIosAdd } from 'react-icons/io';
import {Dropdown, DropdownButton} from "react-bootstrap";
const styles = {
    addIcon:{
        background: '#FFFFFF',
        border: '1px solid #D9D9D9',
        width:'28px',
        height:'28px',
        borderRadius:'1em',
        float:'left',
        marginRight:'1em',
        boxShadow: '0px 1px 3px rgba(168, 168, 168, 0.21691)'
    },
    addGoods:{
        cursor:'pointer'
    }
}

function AddNewProduct({infoModal}) {
    const [dropdownMenus, setDropdownMenus] = useState(false);

    function ShowDropDownProduct(Show){
        setDropdownMenus(Show);
    }

    function OpenProducts(evt){
        if('false' === evt) setDropdownMenus(false);
    }

    console.log(infoModal);
    return (
        <div>
            {!dropdownMenus? (
                <div className="Add_services" style={styles.addGoods} onClick={ShowDropDownProduct.bind(null, true)}>
                    <IoIosAdd style={styles.addIcon} />
                    <span>Add goods or services</span>
                </div>
            ):(
                <DropdownButton
                    id="dropdown-basic-button"
                    variant="Info"
                    title="Add goods or services"
                    size="lg"
                    onSelect={OpenProducts}
                >
                    <Dropdown.Item eventKey="false"> Goods or services </Dropdown.Item>
                </DropdownButton>
            )
            }
        </div>


    )
}

export default AddNewProduct