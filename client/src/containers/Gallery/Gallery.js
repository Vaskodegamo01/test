import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchPhotos, fetchOnePhoto} from "../../store/actions/photosActions";

import PhotoComponent from '../../components/PhotoComponent/PhotoComponent';

class Gallery extends Component {

    state = {
        show: false
    };

    handleShow = (event, id) => {
        event.preventDefault();
        this.props.fetchOnePhoto(id);
        this.setState({show: true});
    };

    handleHide = (event) => {
        event.preventDefault();
        this.setState({show: false});
    };

    componentDidMount() {
        this.props.fetchPhotos();
    }

    render() {
        return (
            <Fragment>
                {!this.props.photos ? <div>Loading</div> :

                    <PhotoComponent
                        photo={this.props.onePhoto}
                        seeFull={this.state.show}
                        handleShow={this.handleShow}
                        hide={(event) => this.handleHide(event)}
                        photos={this.props.photos}/>

                }
            </Fragment>
        )
    }
}

const mapSateToProps = state => {
    return {
        photos: state.photos.photos,
        onePhoto: state.photos.FullRes.photo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPhotos: () => dispatch(fetchPhotos()),
        fetchOnePhoto: (id) => dispatch(fetchOnePhoto(id))
    }
};

export default connect(mapSateToProps, mapDispatchToProps)(Gallery);