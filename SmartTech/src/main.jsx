import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "@/routers/routers.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <RouterProvider router={router}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </RouterProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </React.StrictMode>
);
