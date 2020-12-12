import React from 'react';
import * as actions from '../../redux/actions/burgerActions';
import { connect } from 'react-redux';
import BuildControl from '../BuildControl';
import css from './style.module.css';



const BuildControls = props =>{
    const disabledIngredients = {...props.burgeriinOrts};
    // disabledIngredients обьектын аттрибутуудын утгыг <= 0 бол харгалзан true, false болгон сольж байна
    for(let key in disabledIngredients){
        disabledIngredients[key] = disabledIngredients[key] <= 0;
    } 
 
    return (
        <div className={css.BuildControls}>
            <p>Бургерийн үнэ:<strong>{props.price}</strong></p>
            {Object.keys(props.ingredientNames).map(el => (
                <BuildControl 
                key={el}
                ortsNemeh={props.ortsNemeh} 
                ortsHasah={props.ortsHasah} 
                disabled={disabledIngredients} 
                type={el} 
                orts={props.ingredientNames[el]} />
            ))}
            <button onClick={props.showConfirmModal} className={css.OrderButton} disabled={!props.purchasing}>ЗАХИАЛАХ</button>
        </div>
        
    );
    
}  

const mapStateToProps = state => {
    return {
        burgeriinOrts: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        purchasing: state.burgerReducer.purchasing,
        ingredientNames: state.burgerReducer.ingredientNames,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        ortsNemeh: ortsNer => {
            dispatch(actions.addIngredient(ortsNer));
        },
        ortsHasah: ortsNer => {
            dispatch(actions.removeIngredient(ortsNer));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BuildControls);    
