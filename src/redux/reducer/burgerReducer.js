
const initialState = { 
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        purchasing: false,
        totalPrice:1000,
        ingredientNames: {
            bacon: 'Гахайн мах',
            cheese:'Бяслаг',
            salad: 'Салад',
            meat: 'Үхрийн мах'
        },
    }

const INGREDIENT_PRICE = {salad: 150, cheese: 250, bacon: 800, meat: 1500};

const reducer = (state = initialState, action) => {

    // console.log('reducerees', action);
    if(action.type === 'ADD_INGREDIENT'){
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ortsNer]: state.ingredients[action.ortsNer] + 1,
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ortsNer],
            purchasing: true
        }
        }else if(action.type === 'REMOVE_INGREDIENT'){
            const newPrice = state.totalPrice - INGREDIENT_PRICE[action.ortsNer];
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ortsNer]: state.ingredients[action.ortsNer] - 1,
            },
            totalPrice: newPrice,
            purchasing: newPrice > 1000,
        }

    }

    return state;

}

export default reducer;