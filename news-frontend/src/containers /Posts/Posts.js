import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, CardSubtitle, CardTitle, Col, Container, Row} from "reactstrap";
import {NavLink} from "react-router-dom";
import {deleteNews, getNews} from "../../store/actions";
import {connect} from "react-redux";
import {apiURL} from "../../constans";

class Posts extends Component {
    componentDidMount() {
        this.props.getNews();
    }

    render() {
        const news = this.props.news;
        const styles = {
            width: '100px',
            height: '100px'
        };
        return (
            <Container>
                <div className='d-flex align-items-center justify-content-between'>
                    <h1>Posts</h1>
                    <NavLink to='/add'>Add new post</NavLink>
                </div>
                <Row>
                    <Col xs={12}>
                        {this.props.news &&
                        Object.keys(news).map(post => (
                            <Card className='mt-3'  key={news[post].id}>
                                <CardBody>
                                    {news[post].image ? <CardImg top width="100%" src={`${apiURL}/uploads/${news[post].image}`} alt="Card image cap" style={styles}/>: null}
                                    <CardTitle>{news[post].title}</CardTitle>
                                    <CardSubtitle>At {news[post].date}</CardSubtitle>
                                    <NavLink to={`/news/${news[post].id}`} className='d-block'>Read Full Post>></NavLink>
                                    <Button color="danger" id={news[post].id} onClick={this.props.deleteNews}>Delete</Button>
                                </CardBody>
                            </Card>
                        ))
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}
const mapStateToProps = state => ({
    news: state.news
});
const mapDispatchToProps = dispatch => ({
    getNews: () => dispatch(getNews()),
    deleteNews: id => dispatch(deleteNews(id.currentTarget.id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);