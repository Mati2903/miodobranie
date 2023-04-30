import styles from "../../styles/Shop.module.css";
import { useSelector } from "react-redux";

import ProductsList from "../../../components/ProductsList";
import CartButton from "../../../components/CartButton";
import Cart from "../../../components/Cart";

const Shop = ({ products }) => {
	const isOpen = useSelector((state) => state.visibility.isOpen);

	return (
		<div className={styles.container}>
			<ProductsList products={products} />
			<CartButton />
			{isOpen ? <Cart /> : null}
		</div>
	);
};

export async function getStaticProps() {
	const res = await fetch(`${process.env.CMS_URL}/api/products?populate=*`); //without populate prop, there is no access to media lib
	const products = await res.json();

	return {
		props: {
			products,
		},
		revalidate: 60,
	};
}

export default Shop;
