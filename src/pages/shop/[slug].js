import styles from "../../styles/Product.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { API_URL } from "../../../utils/urls";
import BackBtn from "../../../components/BackBtn";
import AddToCartBtn from "../../../components/AddToCartBtn";
import Cart from "../../../components/Cart";
import { useSelector } from "react-redux";

//props from SSR and StaticPaths next functions below
const Product = ({ id, product }) => {
	const [data, setData] = useState(null);

	const isOpen = useSelector((state) => state.visibility.isOpen);

	useEffect(() => {
		fetch(`${API_URL}/api/products/${id}?populate=image`)
			.then((res) => res.json())
			.then((data) => {
				setData(`${API_URL}${data.data.attributes.image.data.attributes.url}`);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<Head>
				{product.attributes.meta_title && (
					<title>{product.attributes.meta_title}</title>
				)}
				{product.meta_description} &&
				<meta
					name="description"
					content={product.attributes.meta_description}
				/>
			</Head>
			<BackBtn />
			<h3 className={styles.product__heading}>{product.attributes.name}</h3>
			<img src={data} className={styles.product__img} />
			<p>Cena: {product.attributes.price} zł</p>
			<p>{product.attributes.content}</p>
			<AddToCartBtn product={product} />
			{isOpen ? <Cart /> : null}
		</div>
	);
};

// static generation with fetching data from cms
export async function getStaticProps({ params: { slug } }) {
	try {
		const res = await fetch(
			`${API_URL}/api/products?filters[slug][$eq]=${slug}`
		);
		const found = await res.json();

		return {
			props: {
				id: found.data[0].id,
				product: found.data[0], //because of the nature of API response
			},
		};
	} catch (err) {
		console.log(err);
	}
}

export async function getStaticPaths() {
	try {
		const res = await fetch(`${API_URL}/api/products?populate=image`);
		const products = await res.json();

		return {
			paths: products.data.map((product) => ({
				params: { slug: String(product.attributes.slug) },
			})),
			fallback: false, //show 404 page if there is no such path
		};
	} catch (err) {
		console.log(err);
	}
}

export default Product;
