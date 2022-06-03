import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import axios from "axios";
import api from "../../shared/api";

// actions
const CREATE_REVIEW = "CREATE_REVIEW";
const EDIT_REVIEW = "EDIT_REVIEW";
const GET_REVIEW = "GET_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";
// action creators
const createReview = createAction(
    CREATE_REVIEW,
    (review, roomTitle) => ({review, roomTitle})
);
const editReview = createAction(
    EDIT_REVIEW,
    (postId,review) => ({postId,review})
);
const getReview = createAction(
    GET_REVIEW,
    (review, reviewId) => ({review, reviewId})
);
const deleteReview = createAction(DELETE_REVIEW, (postId) => ({postId}));
const initialState = {
    review_list: []
};

const createReviewDB = (review, roomTitle) => {
    return async function (dispatch, getState, {history}) {
        const token = sessionStorage.getItem("Authorization");
        try {
            api
                .post("/user-reviews", {
                    title: roomTitle,
                    review: review
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => dispatch(createReview({
                    ...res.data
                })))
        } catch (err) {
            alert("저장을 실패했습니다.");
        };
    };
};

const getReviewDB = () => {
    return async function (dispatch, getState, {history}) {
        const token = sessionStorage.getItem("Authorization");
        try {
            api
                .get("/user-reviews",{
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => dispatch(getReview(res.data)))
        } catch (err) {
            alert("review를 불러오는데 실패했습니다.");
        };
    };
};
const editReviewDB = (review, postId) => {
    return async function (dispatch, getState, {history}) {
        const token = sessionStorage.getItem("Authorization");
        try {
            await api
                .patch(`/user-reviews/${postId}`, {
                    review: review
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => dispatch(editReview(res.data,review)))
        } catch (err) {
            alert("수정을 실패했습니다.");
        };
    };
};
const deleteReviewDB = (postId) => {
    return async function (dispatch, getState, {history}) {
        const token = sessionStorage.getItem("Authorization");
        try {
            await api
                .delete(`/user-reviews/${postId}`, {
                    headers : {
                        Authorization: token
                    }
                })
                .then((res) => {
                    dispatch(deleteReview(res.data))})
            history.push('/mypage/review')
        } catch (err) {
            alert("수정을 실패했습니다.");
        };
    };
};
export default handleActions({
    [CREATE_REVIEW]: (state, action) => produce(state, (draft) => {
        draft
            .review_list
            .unshift(action.payload.review);
    }),
    [EDIT_REVIEW]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.postId);
        draft.list[idx] = { ...draft.list[idx], review:action.payload.review};
    }),
    [GET_REVIEW]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.review
    }),
    [DELETE_REVIEW]: (state, action) => produce(state, (draft) => {
        let idx = draft
        .list
        .findIndex((p) => p.id === action.payload.postId
        );
        draft.list.splice(idx, 1);
        }),
}, initialState);
const actionCreators = {
    createReviewDB,
    createReview,
    editReview,
    editReviewDB,
    getReview,
    getReviewDB,
    deleteReview,
    deleteReviewDB
};
export {
    actionCreators
};