import React, {useContext} from 'react';
import {ListGroup, Image} from 'react-bootstrap';
import Spec from '../../img/Spec.jpg';
import { ListWorkersAddName }  from '../Fuctions';
import ModalContext from "../ModalContext";
import './Specialists.css'

const SpecialistsList = ({Height}) => {
    const { Specialists } = useContext(ModalContext); //Get specialists
    const ListWorkerAddPass = ListWorkersAddName(Specialists, Height); //Add pass row for specialists
    return (
        <ListGroup className='List_Specialist' variant='flush'>
            { ListWorkerAddPass.map( List => {
                if(typeof (List.id) === 'number'){
                    return (<ListGroup.Item key={List.id} style={{height:List.height}} className='d-flex justify-content-start align-content-center'>
                        <span className='paddingGridTime'>
                            <Image src={Spec} className='ImageSpecialist' roundedCircle={true}/>
                        </span>
                        <div className='paddingGridTime'>
                            <span>{List.title}</span>
                            <span>Specialist</span>
                        </div>
                    </ListGroup.Item>)
                }
                else return (<ListGroup.Item key={List.id} > </ListGroup.Item>)
            })}
        </ListGroup>
    )
};

export default SpecialistsList