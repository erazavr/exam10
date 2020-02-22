import React, {Component} from 'react';
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {sendNews} from "../../store/actions";
import {connect} from "react-redux";

class AddNewPost extends Component {
    state = {
        title: '',
        description: '',
        image: ''
    };
    submitFormHandler = async event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key])
        });
        await this.props.sendNews(formData);
        this.props.history.push('/')

    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]:event.target.files[0]
        })
    };
    render() {
        return (
            <Container>
                <Form onSubmit={this.submitFormHandler}>
                    <h1>Add new posts</h1>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Enter title"  onChange={this.inputChangeHandler} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" placeholder="Enter your text" onChange={this.inputChangeHandler} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input type="file" name="image" id="image" onChange={this.fileChangeHandler}/>
                    </FormGroup>
                    <Button>Save</Button>
                </Form>
            </Container>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    sendNews: news => dispatch(sendNews(news))
});

export default connect(null, mapDispatchToProps)(AddNewPost);