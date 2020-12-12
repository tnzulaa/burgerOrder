import axios from '../../axios-orders';
import { loginUserSuccess } from './loginActions';

export const signupUser = (email,password) => {
    return function(dispatch){
        dispatch(signupUserStart());
        const data = {
            email, 
            password, 
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArLN57MkHq6obZk4k86oXp6fdxRFdXhMo', data)
        .then(result => {
            const token = result.data.idToken;
            const userId = result.data.localId;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            dispatch(signupUserSuccess(token, userId));
            alert('Амжилттай');
            })
        .catch(err => {
            dispatch(signupUserError(err));
            console.log(err);
            alert('Холболт амжилтгүй');
        });
        

    }
}

export const signupUserStart = () => {
    return {
        type: 'SIGNUP_USER_START'
    }
}

export const signupUserSuccess = (token, userId) => {
    return {
        type: 'SIGNUP_USER_SUCCESS',
        token,
        userId
    }
}

export const signupUserError = (error) => {
    return {
        type: 'SIGNUP_USER_ERROR',
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expireDate');
    return {
        type: 'LOGOUT'
    }
}

export const autoLogoutAfterMillisec = (ms) => {
   
    return function(dispatch){
        // Token шинэчлэх хүсэлт явуулах
        // axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyArLN57MkHq6obZk4k86oXp6fdxRFdXhMo', 
        // {
        //     grant_type: 'refresh_token',
        //     refresh_token: localStorage.get('refresh_token')

        // })       
        // .then(result => {
        //     const token = result.data.id_token;
        //     const userId = result.data.user_id;

        //     dispatch(loginUserSuccess(token, userId));
        //     })
        // .catch(err => {
        //     dispatch(signupUserError(err));
        //     console.log(err);
        //     alert('Холболт амжилтгүй');
        // });

        // Token хугацаа дуусахад logout хийнэ
        setTimeout(() => {
            dispatch(logout());
        }, ms)
    }
}