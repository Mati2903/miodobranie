import { useSelector, useDispatch } from "react-redux";
import { openCart, closeCart } from "../redux/cartSlice";
import { BsFillBasket3Fill } from "react-icons/bs";
import styles from "../src/styles/CartButton.module.css";

const CartButton = () => {
	const isOpen = useSelector((state) => state.visibility.isOpen);
	const dispatch = useDispatch();

	const handleCartButtonClick = () => {
		isOpen ? dispatch(closeCart()) : dispatch(openCart());
	};

	return (
		<>
			{!isOpen && (
				<button className={styles.cartBtn} onClick={handleCartButtonClick}>
					<BsFillBasket3Fill />
				</button>
			)}
		</>
	);
};

export default CartButton;
