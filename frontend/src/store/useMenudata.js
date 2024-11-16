import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useRestaurentdata } from "./useRestaurentdata";

let API_MENU_ENDPOINT = "http://localhost:8000/api/v1/menu";
axios.defaults.withCredentials = true;

export let useMenudata = create(
  persist(
    (set) => ({
      loading: false,
      menus: null,
      createMenu: async (formdata) => {
        try {
          set({ loading: true });
          let response = await axios.post(
            `${API_MENU_ENDPOINT}/addMenu`,
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response?.data);

          if (response?.data?.success) {
            set({ loading: false, menus: response?.data?.menu });
            toast?.success(response?.data?.message);

            useRestaurentdata
              ?.getState()
              ?.addMenuToRestaurent(response?.data?.menu);
          }
        } catch (error) {
          set({ loading: false });
          console.log(error);
        }
      },

      editMenu: async (formdata, menuId) => {
        try {
          set({ loading: true });
          let response = await axios.patch(
            `${API_MENU_ENDPOINT}/editMenu/${menuId}`,
            formdata
          );

          if (response?.data?.success) {
            set({ loading: false, menus: response?.data?.menu });
            console.log(response?.data);

            useRestaurentdata?.getState()?.EditMenuData(response?.data?.menu);
            toast?.success(response?.data?.message);
          }
        } catch (error) {
          set({ loading: false });
          console.log(error);
        }
      },
    }),
    {
      name: "menu-data",
    }
  )
);
