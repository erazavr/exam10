import React, {Component} from 'react';
import {deleteComment, getComments, getNewsById, sendComment} from "../../store/actions";
import {connect} from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    Col,
    Container, Form,
    FormGroup, Input, Label,
    Row
} from "reactstrap";


class OnePost extends Component {
    state = {
        newsId: '',
        author: '',
        comment: '',

    };
    componentDidMount() {
        this.props.getNewsById(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id)
    }
    submitFormHandler = async event => {

        event.preventDefault();
        await this.props.sendComment(this.state)

    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
            newsId: this.props.match.params.id
        });
    };
    render() {
        console.log(this.props.comments && this.props.comments)
        const post = this.props.post;
        const comments = this.props.comments;
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        {post &&
                            Object.keys(post).map(item => (
                                <div className='mt-3' key={post[item].id}>
                                        <h1 className='mb-5'>{post[item].title}</h1>
                                        <CardSubtitle>At {post[item].date}</CardSubtitle>
                                        <CardText className='mb-5'>{post[item].description}</CardText>
                                </div>
                            ))
                        }

                    </Col>
                    <Col xs={12}>
                        <h1>Comments</h1>

                        {comments &&
                            Object.keys(comments).map(comment => (
                                <Card className='mt-3' key={comments[comment].id}>
                                    <CardBody>
                                        <CardTitle><b>{comments[comment].author}</b> wrote:</CardTitle>
                                        <CardText>{comments[comment].comment}</CardText>
                                        <Button color="danger" onClick={()=>this.props.deleteComment(this.state.newsId, comments[comment].id)}>Delete</Button>
                                    </CardBody>
                                </Card>
                            ))
                        }
                    </Col>
                    <Form onSubmit={this.submitFormHandler}>
                        <h1>Add new posts</h1>
                        <FormGroup>
                            <Label for="author">Name</Label>
                            <Input type="text" name="author" id="author" placeholder="Enter your name"  onChange={this.inputChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="comment">Comment</Label>
                            <Input type="textarea" name="comment" id="comment" placeholder="Enter your text" onChange={this.inputChangeHandler} required/>
                        </FormGroup>
                        <Button color="primary">Add</Button>
                    </Form>
                </Row>

            </Container>
        );
    }
}
const mapStateToProps = state => ({
    post: state.post,
    comments: state.comments
});
const mapDispatchToProps = dispatch => ({
    getNewsById: id => dispatch(getNewsById(id)),
    getComments: id => dispatch(getComments(id)),
    sendComment: comment => dispatch(sendComment(comment)),
    deleteComment: (comment, id) => dispatch(deleteComment(comment, id))
});
export default connect(mapStateToProps, mapDispatchToProps)(OnePost);