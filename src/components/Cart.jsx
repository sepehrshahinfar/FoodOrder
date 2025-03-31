import React, { useContext } from 'react'
import Modal from './Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Button from './Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }
    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }
    return (
        <Modal className='cart' open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        onDecrease={() => cartCtx.removeItem(item.id)}
                        onIncrease={() => cartCtx.addItem(item)}
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price} />))}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}

export default Cart