import Link from "next/link";
import { useDispatch } from "react-redux";
import { closeCart } from "../redux/cartSlice";

const BackBtn = () => {
	const dispatch = useDispatch();

	return (
		<Link href="/shop">
			<button onClick={() => dispatch(closeCart())}>Wróć do listy</button>
		</Link>
	);
};

export default BackBtn;
