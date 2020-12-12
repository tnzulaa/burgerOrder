import React from 'react';
import Button from '../General/Button';
import Spinner from '../General/Spinner';
import css from './style.module.css';
import axios from '../../axios-orders';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/orderActions';

class ContactData extends React.Component{

    state = {       
        name: null,
        street: null,
        city: null
    }

    componentDidUpdate(){
        if(this.props.newOrderStatus.finished && !this.props.newOrderStatus.error)
        this.props.history.replace('/orders');
    }
    saveOrder = () => {
        const newOrder = {
            userId: this.props.userId,
            orts: this.props.ingredients,
            price: this.props.price,
            hayag: {
                name: this.state.name,
                street: this.state.street,
                city: this.state.city,
            }
        }
       this.props.saveOrderAction(newOrder);
        // this.setState({loading: true});
       
    }

    changeName = (e) => {
        this.setState({name : e.target.value})
    }
    changeStreet = (e) => {
        this.setState({street : e.target.value})
    }
    changeCity = (e) => {
        this.setState({city : e.target.value})
    }

    render(){
        return <div className={css.ContactData}>
            Дүн: {this.props.price}₮
            <div>
                {this.props.newOrderStatus.error && `Захиалгыг хадгалах явцад алдаа гарлаа ${this.props.newOrderStatus.error}`}
            </div>
            {this.props.newOrderStatus.saving ? (<Spinner />) : (<div> <input onChange={this.changeName} type="text" name="name" placeholder="Таны нэр"/>
            <input onChange={this.changeStreet} type="text" name="street" placeholder="Таны хаяг"/>
            <input onChange={this.changeCity} type="text" name="city" placeholder="Таны аймаг, хот"/>
            <Button text="ИЛГЭЭХ" btnType="Success" clicked={this.saveOrder}/></div>)}
            
        </div>
    }
}

// state-г props-оороо хүлээж авахдаа
const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        newOrderStatus: state.orderReducer.newOrder,
        userId: state.signupLoginReducer.userId
    }
}

// store-н dispatch функцыг ашиглан action цацах
const mapDispatchToProps = dispatch => {
    return {
        saveOrderAction: newOrder => dispatch(actions.saveOrder(newOrder))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ContactData));