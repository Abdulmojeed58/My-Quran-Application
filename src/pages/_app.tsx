import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import HomeLayout from "@/components/Layouts/HomeLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <HomeLayout>
        <Component {...pageProps} />
      </HomeLayout>
    </Provider>
  );
}
