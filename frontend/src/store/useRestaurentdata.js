import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

let API_RESTAURENT_ENDPOINT = "http://localhost:8000/api/v1/restaurent";
axios.defaults.withCredentials = true;
// restaurentPhoto
export let useRestaurentdata = create(
  persist(
    (set, get) => ({
      loading: false,
      myRestaurent: null,
      searchRestaurentResult: null,
      appliedSearchFilter: [],
      selectedRestaurent: null,
      restaurentOrders: [],
      createRestaurent: async (formdata) => {
        try {
          let response = await axios.post(
            `${API_RESTAURENT_ENDPOINT}/createRestaurent`,
            formdata
          );

          if (response?.data?.success) {
            set({ loading: false, myRestaurent: response?.data?.restaurent });
            // console.log(response?.data);
            toast.success(response?.data?.message);
          }
        } catch (error) {
          set({ loading: false });
          if (error?.response?.status === 400) {
            set({ myRestaurent: null });
          }
          // console.log(error);
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
            set({
              loading: false,
              selectedRestaurent: response?.data?.restaurent,
            });
            toast?.success(response?.data?.message);
          }
        } catch (error) {
          set({ loading: false });

          if (error?.response?.status === 400) {
            set({ selectedRestaurent: null });
          }
          toast?.error(error?.response?.data?.message);
          // console.log(error);
        }
      },

      getRestaurentById: async (resId) => {
        try {
          let response = await axios.get(
            `${API_RESTAURENT_ENDPOINT}/singleRestaurent/${resId}`
          );
          if (response?.data?.success) {
            set({ selectedRestaurent: response?.data?.restaurent });
          }
        } catch (error) {
          // console.log(error);
        }
      },

      getRestaurentOrders: async () => {
        try {
          let response = await axios.get(
            `${API_RESTAURENT_ENDPOINT}/getRestaurentOrder`
          );

          // console.log(response?.data);

          if (response?.data?.success) {
            set({ restaurentOrders: response?.data?.order });
          }
        } catch (error) {
          // console.log(error);
        }
      },

      updateRestaurenOrderStatus: async (orderId, status) => {
        try {
          // console.log(orderId, status);

          let response = await axios.patch(
            `${API_RESTAURENT_ENDPOINT}/updateOrderstatus/${orderId}`,
            { status }
          );

          // console.log(response?.data);

          if (response?.data?.success) {
            const updatedOrders = get().restaurentOrders?.map((order) =>
              order._id === orderId
                ? { ...order, status: response?.data?.status }
                : order
            );
            set({ restaurentOrders: updatedOrders });
            toast.success("Order status updated successfully.");
          }
        } catch (error) {
          toast.error("Failed to update order status.");
        }
      },

      //todo
      updateRestaurent: async (formdata) => {
        try {
          set({ loading: true });
          let response = await axios.patch(
            `${API_RESTAURENT_ENDPOINT}/updateRestaurent`,
            formdata
          );

          if (response?.data?.success) {
            set({ loading: false, myRestaurent: response?.data?.restaurent });
            // console.log(response?.data);
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

          // Wait for 700ms before making the API call
          let params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectCuisiens", selectCuisiens.join(",")); // Join array to comma-separated string

          // await new Promise((resolve) => setTimeout(resolve, 2000)); // todo :understanding

          let response = await axios.post(
            `${API_RESTAURENT_ENDPOINT}/searchRestaurent/${searchText}?${params.toString()}`
          );

          if (response?.data?.success) {
            set({
              loading: false,
              searchRestaurentResult: response?.data?.restaurent,
            });
            toast.success(response?.data?.message);
          }
        } catch (error) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },

      cleanappliedFilter: () => {
        set(() => ({
          appliedSearchFilter: [],
        }));
      },

      selectedQuisiensDataGet: (text) => {
        set((state) => {
          let updatedFilter = state.appliedSearchFilter || [];

          // Check if `text` is already in `appliedSearchFilter`
          if (updatedFilter.includes(text)) {
            // Remove `text` if it already exists
            updatedFilter = updatedFilter.filter((allText) => allText !== text);
          } else {
            // Add `text` if it doesn't exist
            updatedFilter = [...updatedFilter, text];
          }

          // Return the new state with updated `appliedSearchFilter`
          return { appliedSearchFilter: updatedFilter };
        });
      },

      addMenuToRestaurent: (menu) => {
        set((state) => ({
          myRestaurent: {
            ...state?.myRestaurent,
            menus: [...state?.myRestaurent?.menus, menu],
          },
        }));
      },

      EditMenuData: (menu) => {
        set((state) => {
          const indexfind = state.myRestaurent?.menus?.findIndex(
            (menues) => menues._id === menu?._id
          );

          if (indexfind === -1) {
            // Menu item not found, return the state unchanged
            return state;
          }

          // Create before and after parts of the menu array
          const beforeMenu = state.myRestaurent?.menus.slice(0, indexfind);
          const afterMenu = state.myRestaurent?.menus.slice(indexfind + 1);

          return {
            myRestaurent: {
              ...state.myRestaurent,
              menus: [...beforeMenu, menu, ...afterMenu], // Update the menus array with the new menu
            },
          };
        });
      },
    }),
    {
      name: "restaurent-data",
    }
  )
);
