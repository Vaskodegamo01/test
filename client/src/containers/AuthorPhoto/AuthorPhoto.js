import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchPhotosId, deletePhoto} from "../../store/actions/photosActions";
import {Col, Thumbnail, Button, Label} from 'react-bootstrap';

class AuthorPhoto extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPhotosId(id);
    }

    deleteHandler = (e, id) => {
        e.preventDefault();

        this.props.deletePhoto(id)
    };

    render() {
        return (
            <Fragment>
                {!this.props.authorPhotos ? <div>Loading</div> : this.props.authorPhotos.map((photo, index) => {
                    return (
                        <Col xs={5} md={3} key={index}>
                            <Thumbnail src={'http://localhost:8000/uploads/' + photo.photo}>
                                <h2>{photo.title}</h2>
                                <p>Photo made by: <b>{photo.author.username}</b></p>


                                {this.props.user && photo.author.username === this.props.user.username ? <Button
                                    bsStyle="danger"
                                    onClick={(e, id) => this.deleteHandler(e, photo._id)}
                                >
                                    Delete
                                </Button> : null}

                            </Thumbnail>
                        </Col>
                    )
                })}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        authorPhotos: state.photos.authorPhotos,
        user: state.users.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPhotosId: (id) => dispatch(fetchPhotosId(id)),
        deletePhoto: (id) => dispatch(deletePhoto(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPhoto);