import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

let API_RESTAURENT_ENDPOINT = "http://localhost:8000/api/v1/restaurent";
axios.defaults.withCredentials = true;
// restaurentPhoto
export let useRestaurentdata = create(
  persist(
    (set) => ({
      loading: false,
      myRestaurent: null,
      searchRestaurentResult: null,
      createRestaurent: async (formdata) => {
        try {
          let response = await axios.post(
            `${API_RESTAURENT_ENDPOINT}/createRestaurent`,
            formdata
          );

          if (response?.data?.success) {
            set({ loading: false, myRestaurent: response?.data?.restaurent });
            console.log(response?.data);
            toast.success(response?.data?.message);
          }
        } catch (error) {
          set({ loading: false });
          if (error?.response?.status === 400) {
            set({ myRestaurent: null });
          }
          console.log(error);
          toast?.error(error?.response?.data?.message);
        }
      },

      getRestaurent: async () => {
        try {
          set({ loading: true });
          let response = await axios.get(
            `${API_RESTAURENT_ENDPOINT}/getRestaurent`
          );

          if (response?.data?.success) {
            set({ loading: false, myRestaurent: response?.data?.restaurent });
            toast?.success(response?.data?.message);
          }
        } catch (error) {
          set({ loading: false });

          if (error?.response?.status === 400) {
            set({ myRestaurent: null });
          }
          toast?.error(error?.response?.data?.message);
          console.log(error);
        }
      },

      updateRestaurent: async (formdata) => {
        try {
          set({ loading: true });
          let response = await axios.patch(
            `${API_RESTAURENT_ENDPOINT}/updateRestaurent`,
            formdata
          );

          if (response?.data?.success) {
            set({ loading: false, myRestaurent: response?.data?.restaurent });
            console.log(response?.data);
            toast.success(response?.data?.message);
          }
        } catch (error) {
          set({ loading: false });
          toast?.error(error?.response?.data?.message);
        }
      },

      searchRestaurent: async (searchText, searchQuery, selectCuisiens) => {
        try {
          set({ loading: true });
          let params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectCuisiens", selectCuisiens);

          // Construct the URL properly using `params.toString()`
          let response = await axios.post(
            `${API_RESTAURENT_ENDPOINT}/searchRestaurent/${searchText}?${params.toString()}`
          );

          if (response?.data?.success) {
            set({ loading: false, searchRestaurentResult: response?.data?.restaurent });
            console.log(response?.data);
            toast.success(response?.data?.message);
            
          }
        } catch (error) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
    }),
    {
      name: "restaurent-data",
    }
  )
);
