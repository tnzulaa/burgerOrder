import React, { Component, Fragment } from 'react';
import css from './style.module.css';
import Toolbar from '../../components/Toolbar';
import BurgerPage from '../BurgerPage';
import Sidebar from '../../components/Sidebar';
import OrderPage from '../OrderPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import  ShippingPage  from '../ShippingPage';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import { connect } from 'react-redux';
import Logout from '../../components/Logout';
import * as actions from '../../redux/actions/loginActions';
import * as signupActions from '../../redux/actions/signupActions'


class App extends Component {
  state = {
    showSidebar: false,
  } 
  toggleSideBar = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expireDate = new Date(localStorage.getItem('expireDate'));
    const refreshToken = localStorage.getItem('refreshToken');

    if(token){
      if(expireDate > new Date()){
        // Token-ы хугацаа дуусаагүй тул авто логин хийнэ
        this.props.autoLogin(token, userId);
        // Token-ы хугацаа дуусахад үлдэж байгаа хугацааг тооцоолж уг хугацаа дуусахад авто logout хийнэ
        this.props.autoLogoutAfterMillisec(expireDate.getTime() - new Date().getTime());
      }else{
        // Token-ы хугацаа дууссан тул logout хийнэ
        this.props.logout();
      }
      
    }

  }

  render(){
    return (
      <div> 
        <Toolbar toggleSideBar={this.toggleSideBar}/>  
        <Sidebar 
          showSidebar={this.state.showSidebar} 
          toggleSideBar={this.toggleSideBar}/>
        <main className={css.Content}>
        
        {this.props.userId ? <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/orders" component={OrderPage} />
            <Route path="/ship" component={ShippingPage} />
            <Route path="/" component={BurgerPage}/>
          </Switch> : 
          <Switch>            
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Redirect to="/login" />                        
          </Switch>}       
        </main>        
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.signupLoginReducer.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId) => dispatch(actions.loginUserSuccess(token, userId)),
    logout: () => dispatch(signupActions.logout()),
    autoLogoutAfterMillisec: () => dispatch(signupActions.autoLogoutAfterMillisec())

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
