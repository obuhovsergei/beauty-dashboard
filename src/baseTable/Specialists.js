import React from 'react';
import {ListGroup, Image} from 'react-bootstrap';
import Spec from '../img/Spec.jpg';

function Specialists_list({Specialists}) {
    let List_Workers_add_pass = [];
    Specialists.map(elem => List_Workers_add_pass.push(elem, {id:'pass_'+elem.id, title:''}));
    return (
        <ListGroup
            className='List_Specialsts'
            variant='flush'
        >
            {List_Workers_add_pass.map(List =>{
                if(typeof (List.id) === 'number'){
                    return (<ListGroup.Item key={List.id} className='d-flex justify-content-start align-content-center'>
                        <span className='paddingGridTime'>
                            <Image src={Spec} style={{width:'2.3rem', marginTop: '.3rem'}} roundedCircle={true}/>
                        </span>
                        <div className='paddingGridTime'>
                            <span>{List.title}</span>
                            <span>Specialist</span>
                        </div>

                    </ListGroup.Item>)
                }
                else return (<ListGroup.Item key={List.id} ></ListGroup.Item>)

            })}

        </ListGroup>
    )
}

export default Specialists_list