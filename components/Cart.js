import { useSelector, useDispatch } from "react-redux";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineClose,
	AiOutlineDelete,
} from "react-icons/ai";

import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
	closeCart,
} from "../redux/cartSlice";
import styles from "../src/styles/Cart.module.css";

const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const totalPrice = () => {
		return cart.reduce(
			(acc, item) => acc + item.quantity * item.attributes.price,
			0
		);
	};

	const handleClose = () => {
		dispatch(closeCart());
	};

	return (
		<div className={styles.cart}>
			<h2 className={styles.cart__heading}>Koszyk</h2>
			<button className={styles.cart__closeBtn} onClick={handleClose}>
				<AiOutlineClose />
			</button>
			{cart.length === 0 && <p>Brak produktów w koszyku</p>}
			{cart.map((item) => (
				<div className={styles.cart__product} key={item.id}>
					<h3>{item.attributes.name}</h3>
					<p>Cena za sztukę: {item.attributes.price} zł</p>
					<p>Ilość sztuk: {item.quantity}</p>
					<div className={styles.cart__buttonsGroup}>
						<button
							className={styles.cart__minusBtn}
							onClick={() => dispatch(decrementQuantity(item.id))}
						>
							<AiOutlineMinus />
						</button>
						<p>{item.quantity}</p>
						<button
							className={styles.cart__plusBtn}
							onClick={() => dispatch(incrementQuantity(item.id))}
						>
							<AiOutlinePlus />
						</button>
						<button
							className={styles.cart__deleteBtn}
							onClick={() => dispatch(removeFromCart(item.id))}
						>
							<AiOutlineDelete />
						</button>
					</div>
					<p>Cena: {item.quantity * item.attributes.price} zł</p>
					<span className={styles.cart__productDivider}></span>
				</div>
			))}
			{cart.length !== 0 && (
				<p className={styles.cart__sum}>
					Suma całości koszyka: {totalPrice()} zł
				</p>
			)}
		</div>
	);
};

export default Cart;
