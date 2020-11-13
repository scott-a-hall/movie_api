import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
    return (
        <Row className="justify-content-md-center">
            <Col md={4}>
                <Form.Control
                    onChange={e => props.setFilter(e.target.value)}
                    value={props.visibilityFilter}
                    placeholder="filter"
                />
            </Col>
        </Row>
    );
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);