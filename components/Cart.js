import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineClose,
	AiOutlineDelete,
} from "react-icons/ai";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useClickOutside } from "@mantine/hooks";
import Link from "next/link";

import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
	closeCart,
} from "../redux/cartSlice";
import styles from "../src/styles/Cart.module.css";

const Cart = ({ summary }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const ref = useClickOutside(() => dispatch(closeCart()));

	const handleClose = () => {
		dispatch(closeCart());
	};

	const totalPrice = () => {
		return cart.reduce(
			(acc, item) => acc + item.quantity * item.attributes.price,
			0
		);
	};

	return (
		<div className={summary ? `${styles.summary}` : `${styles.cart}`} ref={ref}>
			<h2 className={styles.cart__heading}>
				{summary ? "Podsumowanie" : "Koszyk"}
			</h2>
			{summary ? (
				<Link className={styles.cart__backToShop} href="/shop">
					<RiArrowGoBackFill /> Wróć do zakupów
				</Link>
			) : (
				<button className={styles.cart__closeBtn} onClick={handleClose}>
					<AiOutlineClose />
				</button>
			)}

			{cart.length > 0 && (
				<div className={styles.cart__tableHeaders}>
					<p>Produkt</p>
					<p>Sztuki</p>
					<p>Cena</p>
				</div>
			)}
			<span className={styles.cart__productDivider}></span>
			{/* if no products in cart, display text */}
			{cart.length === 0 && (
				<p className={styles.cart__noProductsInfo}>Brak produktów w koszyku</p>
			)}
			{cart.map((item) => (
				<Fragment key={item.id}>
					<div className={styles.cart__product}>
						<h3 className={styles.cart__productHeading}>
							{item.attributes.name}
						</h3>
						{/* <p>Cena za sztukę: {item.attributes.price} zł</p> */}
						{/* <p>Ilość sztuk: {item.quantity}</p> */}
						<div className={styles.cart__quantityButtons}>
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
						<p className={styles.cart__productPriceSum}>
							{item.quantity * item.attributes.price} zł
						</p>
					</div>
					<span className={styles.cart__productDivider}></span>
				</Fragment>
			))}
			{cart.length !== 0 && (
				<>
					<p className={styles.cart__sum}>Wartość koszyka: {totalPrice()} zł</p>
					{summary ? (
						<Link className={styles.cart__payment} href="/payment">
							Przejdź do płatności
						</Link>
					) : (
						<Link className={styles.cart__summary} href="/shop/summary">
							Przejdź do podsumowania
						</Link>
					)}
				</>
			)}
		</div>
	);
};

export default Cart;
