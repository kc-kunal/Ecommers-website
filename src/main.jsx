import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from "./context/DataContext.jsx";
import {ToastContainer} from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      >
        <App className="overflow-x-hidden"/>
        <ScrollToTop color='white' smooth style={{backgroundColor:'#fa2d37',display:"flex",justifyContent:"center",alignItems:"center",}} />
        <ToastContainer

          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ClerkProvider>
    </DataProvider>
  </StrictMode>
);
