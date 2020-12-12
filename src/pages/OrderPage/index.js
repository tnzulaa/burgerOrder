import React from 'react';
import css from './style.module.css';
import Spinner from '../../components/General/Spinner';
import Order from '../../components/Order';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/orderActions';



class OrderPage extends React.Component{
  
    componentDidMount = () => {
        this.props.loadOrders(this.props.userId);
       
    }  


    render(){  
           
        return(
        <div>
            {this.props.loading ? <Spinner /> : this.props.orders.map(el => 
            <Order key={el[0]} order={el[1]} />)}
            
        </div>)
    }
}

const mapStateToProps = state => {
    return{
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        userId: state.signupLoginReducer.userId
    }  
}

const mapDispatchToProps = dispatch => {
    return {
        // manai loadOrders gedeg ymruu redux-n loadOrders gedeg zuiliig oruulaad iree gej bga
         loadOrders: (userId) => dispatch(actions.loadOrders(userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderPage);