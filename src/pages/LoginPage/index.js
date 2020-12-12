import React from 'react';
import Button from '../../components/General/Button';
import css from './style.module.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/loginActions';
import Spinner from '../../components/General/Spinner';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    state = { 
        email: '',
        password: ''
    }

    changeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    changePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    login = () => {
        this.props.login(this.state.email, this.state.password);
        
    }

    render(){
        return <div className={css.Login}>
            <input onChange={this.changeEmail} type='text' placeholder="Имэйл хаяг" />
            <input onChange={this.changePassword} type='password' placeholder="Нууц үг" />
            {this.props.loginIn && <Spinner />}
             {this.props.firebaseError && <div style={{color:'red'}}>Алдаа: {this.props.firebaseError}</div>}
            {this.props.userId && <Redirect to='/' />}
            <Button text="ДАШКА" btnType='Success' clicked={this.login} />
        </div>
    }

}
const mapStateToProps = state => {
    return {
        loginIn: state.signupLoginReducer.loginIn,
        firebaseError: state.signupLoginReducer.firebaseError,
        userId: state.signupLoginReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(actions.loginUser(email, password))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);