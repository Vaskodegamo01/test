import React, { Fragment } from 'react';
import {Grid, Col, Thumbnail, Button, Row, Modal, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const PhotoComponent = (props) => {
    return (
        <Fragment>
            <Grid>
                <Row>
                    {props.photos.map((photo, index) => {
                        return (
                            <Col xs={6} md={4} key={index}>
                                <Thumbnail src={'http://localhost:8000/uploads/' + photo.photo}>
                                    <h2>{photo.title}</h2>
                                    <span>Photo made by: <Link to={'/author/' + photo.author._id }>{photo.author.username}</Link></span>
                                    <p>
                                        <Button bsStyle="primary" onClick={(event, id) => props.handleShow(event, photo._id)}>
                                            See full
                                        </Button>
                                    </p>
                                </Thumbnail>
                            </Col>
                        )
                    })}
                </Row>
            </Grid>

            <Modal
                show={props.seeFull}
                onHide={props.hide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        Full photo size
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image style={{width: '570px', height: '335px'}} src={'http://localhost:8000/uploads/' + props.photo}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.hide}>Close</Button>
                </Modal.Footer>
            </Modal>

        </Fragment>
    )
};

export default PhotoComponent;