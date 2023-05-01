import styles from "../src/styles/ProductsList.module.css";
import Link from "next/link";
import { fromImgToUrl } from "../utils/urls";
import AddToCartBtn from "./AddToCartBtn";
import { useDispatch } from "react-redux";
import { closeCart } from "../redux/cartSlice";

const ProductsList = ({ products }) => {
	const dispatch = useDispatch();
	return (
		<div className={styles.container}>
			{products &&
				products.data.map((product) => {
					return (
						<div key={product.id} className={styles.productContainer}>
							<Link
								href={`/shop/${product.attributes.slug}`}
								onClick={() => dispatch(closeCart())}
								className={styles.productLink}
							>
								{product.attributes.name}
								<img
									src={fromImgToUrl(product.attributes.image.data.attributes)}
									className={styles.image}
								/>
								<p>Cena: {product.attributes.price.toFixed(2)} zł</p>
							</Link>
							<AddToCartBtn product={product} />
						</div>
					);
				})}
		</div>
	);
};

export default ProductsList;
