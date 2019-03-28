import React, { Component } from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Label} from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {addPhoto} from "../../store/actions/photosActions";

class AddPhoto extends Component {

    state = {
        title: '',
        photo: ''
    };

    addPhoto = photo => {
        this.props.addPhoto(photo);
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });
        this.addPhoto(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value, author: this.props.user.user._id
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };


    render() {

        if (!this.props.user) {
            return <Redirect to="/register"/>
        }

        return (
            <Form horizontal onSubmit={this.submitFormHandler}>

                <Label style={{fontSize: '16px'}} bsStyle="primary">Add new photo</Label>

                <FormGroup controlId="title">
                    <Col componentClass={ControlLabel} sm={2}>
                        Title
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            required
                            placeholder="Enter photo title"
                            name="title"
                            value={this.state.title}
                            onChange={this.inputChangeHandler}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="photo">
                    <Col componentClass={ControlLabel} sm={2}>
                        Photo
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            required
                            type="file"
                            name="photo"
                            onChange={this.fileChangeHandler}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button bsStyle="primary" type="submit">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.users
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addPhoto: (photo) => dispatch(addPhoto(photo))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);