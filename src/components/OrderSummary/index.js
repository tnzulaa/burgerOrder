import React from 'react';
import css from './style.module.css';
import Button from '../General/Button';
import { connect } from 'react-redux';

const OrderSummary = props => {

    return (
        <div>
            <h3>Таны захиалга</h3>
            <p>Таны сонгосон орцууд:</p>
            <ul>
                {
                    Object.keys(props.ingredients)
                    .map(el => 
                    <li key={el}>{props.ingredientNames[el]}:{props.ingredients[el]}
                    </li>)               
                }
            </ul>
            <p><strong>Захиалгын дүн: {props.price}₮</strong></p>
            <p>Цааш үргэлжлүүлэх үү</p>
            <Button clicked={props.onCancel} btnType='Danger' text="ТАТГАЛЗАХ"/>
            <Button clicked={props.onContinue} btnType='Success' text="ҮРГЭЛЖЛҮҮЛЭХ"/>
            
        </div>
    )
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        ingredientNames: state.burgerReducer.ingredientNames
    }
}
export default connect(mapStateToProps)(OrderSummary);
