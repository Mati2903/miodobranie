import "@/styles/globals.css";
import { store, persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
}

// App.getInitialProps = async ({ Component, ctx }) => {
// 	const { token } = cookies.get(ctx);
// 	const pageProps = Component.getInitialProps
// 		? await Component.getInitialProps(ctx)
// 		: {};

// 	return { pageProps, token };
// };

export default App;
