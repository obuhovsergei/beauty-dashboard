import React from 'react';
import moment from 'moment';
import {Container, Row, Col} from 'react-bootstrap';
import RenderDataPagination from './paginatorDate';
import RenderTable from './RenderTable';

function BaseTable() {
    //const [modalBox, setModalBox] = useState(false);

    return (
        <Container>
            <Row>
                <Col xs={2}>1 of 3</Col>
                <Col xs={10}>
                <RenderDataPagination
                    StartDate={moment().subtract(4,'days').format('DD MM YYYY')}
                    EndDate={moment().add(17, 'days').format('DD MM YYYY')}
                />
                </Col>
                <Col xs={2}>1 of 3</Col>
                <Col xs={10}>
                    <RenderTable
                        Date={moment().format('DD MM YYYY')}
                    />
                </Col>
            </Row>

        </Container>
    )
}

export default BaseTable