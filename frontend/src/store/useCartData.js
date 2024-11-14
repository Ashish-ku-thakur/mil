import { create } from "zustand";
import { persist } from "zustand/middleware";

let useCartData = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) => {
        set((state) => {
          //already added or  not
          let existingItem = state?.cart.find(
            (items) => items?._id === item?._id
          );
          if (existingItem) {
            //increas + 1
            return {
              cart: state?.cart?.map((items) =>
                items?._id === item?._id
                  ? [...items, (quntity = quntity + 1)]
                  : items
              ),
            };
          } else {
            // nothing to do
            return {
              cart: [...state?.cart, (quntity = 1)],
            };
          }
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },

      removeFromTheCart: (menuId) => {
        set(() => {
          return { cart: state.cart.filter((items) => items._id !== menuId) };
        });
      },
      incrementQuentity: (menuId) => {
        set((state) => {
          return {
            cart: [
              ...state?.cart?.map((items) =>
                items?._id === menuId
                  ? { ...items, quntity: items.quntity + 1 }
                  : items
              ),
            ],
          };
        });
      },
      decrementQuentity: (menuId) => {
        set((state) => {
          return {
            cart: [
              ...state?.cart?.map((items) =>
                items?._id === menuId && items?.quntity > 0
                  ? { ...items, quntity: items.quntity - 1 }
                  : items
              ),
            ],
          };
        });
      },
    }),
    { name: "cart-data" }
  )
);
