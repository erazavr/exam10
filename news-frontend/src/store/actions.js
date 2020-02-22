import axiosApi from "../axiosApi";

export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});
export const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS, post});
export const fetchCommentSuccess = comment => ({type: FETCH_COMMENTS_SUCCESS, comment});

export const getNews = () => {
    return async dispatch => {
        const response = await axiosApi.get('/news')
        dispatch(fetchNewsSuccess(response.data))
    }
};

export const sendNews = news => {
    return async dispatch => {
        await axiosApi.post('/news', news);
        dispatch(getNews())
    }
};

export const deleteNews = id => {
    return async dispatch => {
        await axiosApi.delete('/news/'+id);
        dispatch(getNews())
    }
};


export const getNewsById = id => {
    return async dispatch => {
        const response = await axiosApi.get('/news/' + id);
        dispatch(fetchPostSuccess(response.data))
    }
};

export const getComments = id => {
    return async dispatch => {
        const response = await axiosApi.get('/comments?news_id=' + id);
        dispatch(fetchCommentSuccess(response.data))
    }
};

export const sendComment = comment => {
    return async dispatch => {
        await axiosApi.post('/comments', comment);
        dispatch(getComments(comment.newsId))
    }
};

export const deleteComment = (comment, id) => {
    return async dispatch => {
        await axiosApi.delete('/comments/'+ id);
        dispatch(getComments(comment))
    }
};
