import {FETCH_COMMENTS_SUCCESS, FETCH_NEWS_SUCCESS, FETCH_POST_SUCCESS} from "./actions";

const initialState = {
    news: [],
    post: null,
    comments: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS_SUCCESS:
            return {...state, news: action.news};
        case FETCH_POST_SUCCESS:
            return {...state, post: action.post};
        case FETCH_COMMENTS_SUCCESS:
            return {...state, comments: action.comment};
        default:
            return state
    }
};
export default reducer