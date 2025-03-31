import { useContext } from "react"
import Modal from "./Modal"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/formatting";
import Input from "./Input";
import Button from "./Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { data, isLoading: isSending, sendRequest, error, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    }

    let actions = (
        <>
            <Button onClick={handleClose} type="button" textOnly>Close</Button>
            <Button >Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending Order data . . .</span>;
    }

    if (data && !error) {
        return (
            <Modal open={userProgressCtx.progress === "checkout"} onClose={handleFinish}>
                <h2>Success</h2>
                <p>Your order submitted successfully!</p>
                <p>we will get back to you soon!</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }
    return (
        <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>checkout</h2>
                <p>Total Price: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <ErrorPage title="Failed To send Order" message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}

export default Checkout;