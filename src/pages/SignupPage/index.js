import React from 'react';
import Button from '../../components/General/Button';
import css from './style.module.css';
import * as actions from '../../redux/actions/signupActions';
import { connect } from 'react-redux';
import Spinner from '../../components/General/Spinner';
import { Redirect } from 'react-router-dom';

class Signup extends React.Component {
    state = { 
        email: '',
        password1: '',
        password2: '',
        error: ''
    }

    signup = () => {
               
        if((this.state.password1 !== '') === (this.state.password2 !== '')){
            this.props.signupUser(this.state.email,this.state.password1)
        }else {
            this.setState({error: 'Нууц үгүүд хоорондоо таарахгүй байна!'});
        }
        
    }

    changeEmail = (event) => {
        this.setState({email: event.target.value});
    }
    changePassword1 = (event) => {
        this.setState({password1: event.target.value});
    }
    changePassword2 = (event) => {
        this.setState({password2: event.target.value});
    }

    render(){
        return <div className={css.Signup}>
            {this.props.userId && <Redirect to='/orders' />}
            <h1>Бүртгэлийн форм</h1>
            <div>Та өөрийн мэдээллээ оруулна уу</div>
            <input onChange={this.changeEmail} type='text' placeholder="Имэйл хаяг" />
            <input onChange={this.changePassword1} type='password' placeholder="Нууц үгээ оруулна уу" />
            <input onChange={this.changePassword2} type='password' placeholder="Нууц үгээ давтан оруулна уу" />
            {this.state.error && <div style={{color:'red'}}>{this.state.error}</div>}
            {this.props.firebaseError && <div style={{color:'red'}}>{this.props.firebaseError}</div>}
            {this.props.saving && <Spinner />}
            <Button text="БҮРТГҮҮЛЭХ" btnType='Success' clicked={this.signup} />
        </div>
    }
}

const mapStateToProps = state => {
    return {
        saving: state.signupLoginReducer.saving,
        firebaseError: state.signupLoginReducer.firebaseError,
        userId: state.signupLoginReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupUser: (email, password) => dispatch(actions.signupUser(email, password))
        }

}
export default connect(mapStateToProps,mapDispatchToProps)(Signup);