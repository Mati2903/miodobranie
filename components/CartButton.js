import { useSelector, useDispatch } from "react-redux";
import { BsFillBasket3Fill } from "react-icons/bs";

import { openCart, closeCart } from "../redux/cartSlice";
import styles from "../src/styles/CartButton.module.css";

const CartButton = () => {
	const isOpen = useSelector((state) => state.visibility.isOpen);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const handleCartButtonClick = () => {
		isOpen ? dispatch(closeCart()) : dispatch(openCart());
	};

	// const handleMouseEnter = () => {
	// 	dispatch(openCart());
	// };

	// const handleMouseLeave = () => {
	// 	dispatch(closeCart());
	// };

	const productsQuantity = () => {
		return cart.reduce((acc, item) => acc + item.quantity, 0);
	};

	return (
		<>
			<button
				className={styles.cartBtn}
				onClick={handleCartButtonClick}
				// onMouseEnter={handleMouseEnter}
				// onMouseLeave={handleMouseLeave}
			>
				<BsFillBasket3Fill />
				{/* if any items in cart - display quantity on button */}
				{cart.length ? (
					<span className={styles.cartQuantity}>{productsQuantity()}</span>
				) : null}
			</button>
		</>
	);
};

export default CartButton;
