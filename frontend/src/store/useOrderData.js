import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

let API_ORDER_ENDPOINT = "http://localhost:8000/api/v1/order";
axios.defaults.withCredentials = true;

export let useOrderData = create(
  persist(
    (set) => ({
      orders: [],
      totalOrders:[],
      createCheckOutSession: async (checkOutSessionRequest) => {
        try {
          let {data} = await axios.post(
            `${API_ORDER_ENDPOINT}/createCheckOutSession`,
            { checkOutSessionRequest: checkOutSessionRequest },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data);

        
          if (data?.success) {
            set({ orders: data,  });
            // window.location.href = data?.order?.success_url;
          }
        } catch (error) {
          console.log(error);
          // window.location.href = data?.order?.cencel_url;
        }
      },

      getOrderData: async () => {
        try {
          let response = await axios.get(`${API_ORDER_ENDPOINT}/getOrders`);
          console.log(response?.data);
          if (response?.data?.success) {
            set({ totalOrders: response?.data?.orders });
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    { name: "order-Data" }
  )
);
