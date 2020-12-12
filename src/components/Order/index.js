import React from 'react';
import css from './style.module.css';

const Order = (props) => {
    return (
        <div className={css.Order}>
            <p><strong>Орц:</strong> Үхрийн мах - {props.order.orts['meat']} | Бяслаг - {props.order.orts['cheese']} | Салад - {props.order.orts.salad} | Гахайн мах - {props.order.orts.bacon}</p>
            <p>Хаяг: {props.order.hayag['name']} | {props.order.hayag.street} | {props.order.hayag['city']}</p>
            <p>Үнийн дүн: <strong>{props.order.price}₮</strong></p>
        </div>
    )
}

export default Order;