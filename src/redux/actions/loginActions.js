import axios from '../../axios-orders';
import * as actions from './signupActions';

export const loginUser = (email,password) => {
    return function(dispatch){
        dispatch(loginUserStart());
        const data = {
            email, 
            password, 
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArLN57MkHq6obZk4k86oXp6fdxRFdXhMo', data)
        .then(result => {
            // localStorage руу хадгална
            const token = result.data.idToken;
            const userId = result.data.localId;
            const refreshToken = result.data.refreshToken;
            const expiresIn = result.data.expiresIn;
            const expireDate = new Date(new Date().getTime() + expiresIn * 1000);

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('expireDate', expireDate);

            dispatch(loginUserSuccess(token, userId));
            dispatch(actions.autoLogoutAfterMillisec(expiresIn * 1000));
            
            
            })
        .catch(err => {
            dispatch(loginUserError(err));
            console.log(err);
            alert('Холболт амжилтгүй');
        });
        

    }
}

export const loginUserStart = () => {
    return {
        type: 'LOGIN_USER_START'
    }
}

export const loginUserSuccess = (token, userId) => {
    return {
        type: 'LOGIN_USER_SUCCESS',
        token,
        userId
    }
}

export const loginUserError = (error) => {
    return {
        type: 'LOGIN_USER_ERROR',
        error
    }
}