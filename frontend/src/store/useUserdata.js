import { Toast } from "@/components/ui/toast";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

let API_USER_ENDPOINT = "http://localhost:8000/api/v1/user";
export let useUserdata = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      isAuthenticated: false,
      isCheckingAuth: true,
      signup: async (signupFields) => {
        try {
          set({ loading: true });
          let response =await axios.post(
            `${API_USER_ENDPOINT}/signup`,
             signupFields,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          if (response?.data?.success) {
            console.log(response?.data);
            toast.success(response?.data?.message);
            set({
              loading: false,
              user: response?.data?.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          set({ loading: false });
          console.log(error);
        }
      },
    }),

    {
      name: "user-data",
      //   storage: createJSONStorage(() => localStorage),
    }
  )
);
