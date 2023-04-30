import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../redux/cartSlice";

const AddToCartBtn = ({ product }) => {
	const dispatch = useDispatch();

	const handleAddToCart = (e, product) => {
		e.preventDefault();
		dispatch(addToCart(product));
		dispatch(openCart());
	};

	return (
		<div>
			<button onClick={(e) => handleAddToCart(e, product)}>
				Dodaj do koszyka
			</button>
		</div>
	);
};

export default AddToCartBtn;
