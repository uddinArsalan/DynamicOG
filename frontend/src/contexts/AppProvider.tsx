import { createContext, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";

const AppContext = createContext({});

export function useApp() {
  return useContext(AppContext);
}

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext.Provider value={{}}>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
    </AppContext.Provider>
  );
}

export default AppProvider;
