import axios from "axios";
import { useAuthStore } from "@/store/AuthStore";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export const useUser = () => {
  const { setUserInfo } = useAuthStore();
  const { data } = useSWR("/api/user", fetcher);
  setUserInfo(data);
};

// hey I am working on a project that uses swr zustand react on frontend and cookie based jwt authentication on backend now I am confused like how to fetch user details and be sure it is logged in every time till the tokens doesnt expired 

// I am not sure how to manage swr and zustand like which part is responsible for what and I want if acces token expired then how can I refresh tpken and do silent reauthentication I have endpoint set for it in backend 

// I am using axios should I use axios interceptors for it and like the user details endpoint should first vaildate using middleware which I have already so only email name is passed like how can I ensure on client side user is logged in 