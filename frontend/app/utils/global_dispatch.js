let dispatch = null

export const setDispatch = (_dispatch) => {
    dispatch = _dispatch
}

export const dispatchAction = (action) => {
    dispatch(action);
}