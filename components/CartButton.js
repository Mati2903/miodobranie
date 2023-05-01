import { useSelector, useDispatch } from "react-redux";
import { openCart, closeCart } from "../redux/cartSlice";
import { BsFillBasket3Fill } from "react-icons/bs";
import styles from "../src/styles/CartButton.module.css";

const CartButton = () => {
	const isOpen = useSelector((state) => state.visibility.isOpen);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const handleCartButtonClick = () => {
		isOpen ? dispatch(closeCart()) : dispatch(openCart());
	};

	const productsQuantity = () => {
		return cart.reduce((acc, item) => acc + item.quantity, 0);
	};

	return (
		<>
			{!isOpen && (
				<button className={styles.cartBtn} onClick={handleCartButtonClick}>
					<BsFillBasket3Fill />
					{cart.length ? (
						<span className={styles.cartQuantity}>{productsQuantity()}</span>
					) : null}
				</button>
			)}
		</>
	);
};

export default CartButton;
