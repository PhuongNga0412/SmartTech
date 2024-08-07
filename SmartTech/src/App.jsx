import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                // theme={localStorage.getItem("theme")}
                // transition={Bounce}
            />
        </>
    );
}

export default App;
