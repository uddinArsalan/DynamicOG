import { createContext, useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import { useAuthStore } from "@/store/AuthStore";
import axiosInstance from "@/axios/axiosInstance";

const AppContext = createContext({});

export function useApp() {
  return useContext(AppContext);
}

function AppProvider({ children }: { children: React.ReactNode }) {
  const { setUserInfo, setLoggedIn } = useAuthStore();
  useEffect(() => {
    async function authenticateUser() {
      try {
        const { data } = await axiosInstance.get("/user");
        console.log(data.data.user)
        setUserInfo(data.data.user);
        setLoggedIn(true);
      } catch (error) {
        setUserInfo(null);
        setLoggedIn(false);
        console.error("Error authenticating user:", error);
      }
    }

    authenticateUser();
  }, []);

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
