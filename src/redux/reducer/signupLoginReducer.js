const initialState = {
    saving: false,
    logginIn: false,
    firebaseError: null,
    token: null,
    userId: null,

}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SIGNUP_USER_START': return { ...state, saving: true };
        case 'SIGNUP_USER_SUCCESS': return { ...state, saving: false, token: action.token, userId: action.userId };
        case 'SIGNUP_USER_ERROR': return { ...state, saving: false, firebaseError: action.error.response.data.error.message };
        case 'LOGIN_USER_START': return { ...state, loginIn: true };
        case 'LOGIN_USER_SUCCESS': return { ...state, loginIn: false, token: action.token, userId: action.userId };
        case 'LOGIN_USER_ERROR': return { ...state, loginIn: false, firebaseError: action.error.response.data.error.message };
        case 'LOGOUT': return {...state, token: null, userId: null, firebaseError: null}
        default: return state;
    }
}

export default reducer;