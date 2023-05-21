import "@/styles/globals.css";
import { store, persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { MantineProvider } from "@mantine/core";

function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<MantineProvider withNormalizeCSS>
					<Component {...pageProps} />
				</MantineProvider>
			</PersistGate>
		</Provider>
	);
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(App);
