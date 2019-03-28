import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Button, Col, Form, FormGroup, PageHeader} from "react-bootstrap";
import {facebookLogin, registerUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement";
import config from '../../config';
import image from '../../assets/images/fb.jpg';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'



class Register extends Component {
    state = {
        username: '',
        password: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
        event.preventDefault();

        this.props.registerUser(this.state);
    };

    fieldHasError = fieldName => {
        return this.props.error && this.props.error.errors[fieldName];
    };

    facebookResponse = response => {
        if(response.id) {
            this.props.facebookLogin(response)
        }
    };

    render() {
        return (
            <Fragment>
                <PageHeader>Register new user</PageHeader>
                <Form horizontal onSubmit={this.submitFormHandler}>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <FacebookLogin
                                appId={config.facebookAppId}
                                fields="name,email,picture"
                                render={renderProps => (
                                    <Button onClick={renderProps.onClick}><img height='30px' width='30px' src={image} alt="fb"/></Button>
                                )}
                                callback={this.facebookResponse}
                            />
                        </Col>
                    </FormGroup>

                    <FormElement
                        propertyName="username"
                        title="Username"
                        placeholder="Enter username"
                        type="text"
                        value={this.state.username}
                        changeHandler={this.inputChangeHandler}
                        autoComplete="new-username"
                        error={this.fieldHasError('username') && this.props.error.errors.username.message}
                    />

                    <FormElement
                        propertyName="password"
                        title="Password"
                        placeholder="Enter password"
                        type="password"
                        value={this.state.password}
                        changeHandler={this.inputChangeHandler}
                        autoComplete="new-password"
                        error={this.fieldHasError('password') && this.props.error.errors.password.message}
                    />

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button
                                bsStyle="primary"
                                type="submit"
                            >Register</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData)),
    facebookLogin: (data) => dispatch(facebookLogin(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);