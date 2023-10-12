import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (
    router.pathname.includes("chapter") ||
    router.pathname.includes("bookmark") ||
    router.pathname.includes("admin") ||
    router.pathname.includes("ipConfig")
  ) {
    return (
      <Provider store={store}>
        <div className="pt-[4rem]">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <div className="pt-[4rem]">
        <Navbar />
        <HomeLayout>
          <Component {...pageProps} />
        </HomeLayout>
      </div>
    </Provider>
  );
}
