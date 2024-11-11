import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
          let response = await axios.post(
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
          set({ loading: false, isAuthenticated: false });
          toast.error(error?.response?.data?.message);
          console.log(error);
        }
      },

      login: async (loginFields) => {
        try {
          set({ loading: true });
          let response = await axios.post(
            `${API_USER_ENDPOINT}/login`,
            loginFields,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          if (response?.data?.success) {
            set({
              loading: false,
              user: response?.data?.user,
              isAuthenticated: true,
              // isCheckingAuth: true,
            });
            toast.success(response?.data?.message);
            console.log(response?.data);
          }
        } catch (error) {
          set({ loading: false, isAuthenticated: false,  isCheckingAuth: true, });
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },

      verifyEmail: async (value) => {
        try {
          set({ loading: true });
          let response = await axios.post(
            `${API_USER_ENDPOINT}/verifiedEmail`,
            { verificationCode: value },
            {
              headers: {
                "Content-Type": "APPLICAtion/json",
              },
              withCredentials: true,
            }
          );

          if (response?.data?.success) {
            set({
              loading: false,
              user: response?.data?.user,
              isAuthenticated: true,
            });
            console.log(response?.data);
            toast?.success(response?.data?.success);
          }
        } catch (error) {
          set({ loading: false, isAuthenticated: false });
          toast?.error(error?.response?.data?.success);
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          axios.defaults.withCredentials = true;
          let response = await axios.post(`${API_USER_ENDPOINT}/logout`);

          if (response?.data?.success) {
            set({ loading: false, user: null, isAuthenticated: false });
            toast?.success(response?.data?.message);
            console.log(response?.data);
          }
        } catch (error) {
          set({ loading: false, isCheckingAuth: true, user:null });
          toast?.error(error?.response?.data?.success);
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },

      checkAuth: async () => {
        try {
          axios.defaults.withCredentials = true;
          let response = await axios.post(`${API_USER_ENDPOINT}/checkAuth`);

          if (response?.data?.success) {
            set({
              user: response?.data?.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
            toast?.success(response?.data?.success);
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            isCheckingAuth: false,
          });
          toast?.error(error?.response?.data?.success);
          console.log(error);
        } 
      },

      forgotPassword: async (email) => {
        try {
          set({ loading: true });
          let response = await axios.post(
            `${API_USER_ENDPOINT}/forgotPassword`,
            email,
            {
              headers: {
                "Content-Type": "application/json ",
              },
              withCredentials: true,
            }
          );

          if (response?.data?.success) {
            set({ loading: false, isAuthenticated: true });
            toast?.success(response?.data?.message);
          }
        } catch (error) {
          set({
            loading: false,
          });
          toast?.error(error?.response?.data?.success);
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (newPasswordLink, newPassword) => {
        try {
          set({ loading: true });
          let response = await axios.post(
            `${API_USER_ENDPOINT}/setNewPassword:${newPasswordLink}`,
            newPassword,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          if (response?.data?.success) {
            set({ loading: false });
            toast?.success(response?.data?.message);
          }
        } catch (error) {
          set({
            loading: false,
          });
          toast?.error(error?.response?.data?.success);
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },

      updateProfile: async (profileData) => {
        try {
          axios.defaults.withCredentials = true;
          set({ loading: true });
          let response = await axios.patch(
            `${API_USER_ENDPOINT}/updateProfile`,
            profileData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response?.data?.success) {
            set({
              loading: false,
              user: response?.data?.user,
              isAuthenticated: true,
            });
            toast?.success(response?.data?.message);
          }
        } catch (error) {
          set({
            loading: false,
          });
          toast?.error(error?.response?.data?.success);
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },
    }),

    {
      name: "user-data",
      //   storage: createJSONStorage(() => localStorage),
    }
  )
);
