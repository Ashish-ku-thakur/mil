import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartData } from "@/store/useCartData";
import { useOrderData } from "@/store/useOrderData";
import { useRestaurentdata } from "@/store/useRestaurentdata";
import { useUserdata } from "@/store/useUserdata";
import { useEffect, useState } from "react";

const CheckoutConfirm = ({ open, setOpen, result }) => {
  let { user } = useUserdata();
  let { createCheckOutSession, orders, keyId } = useOrderData();
  let { myRestaurent } = useRestaurentdata();
  let { cart } = useCartData();

  let [checkoutData, setCheckoutData] = useState({
    fullname: "",
    email: "",
    address: "",
    contact: "",
    city: "",
    country: "",
  });

  let mapData = Object.keys(checkoutData);

  let ChangeEventHandler = (e) => {
    let { name, value } = e?.target;
    setCheckoutData({ ...checkoutData, [name]: value });
  };

  let checkoutformHandler = async (e) => {
    e?.preventDefault();
    // console.log(orders);

    try {
      let checkOutOrderData = {
        cartItem: cart?.map((item) => ({
          menuId: item?._id,
          name: item?.name,
          menuPhoto: item?.menuPhoto,
          price: item?.price,
          quntity: item?.quntity,
        })),

        deleveryDetails: {
          email: user?.email,
          name: user?.fullname,
          address: user?.address,
          city: user?.city,
        },
        restaurentDetails: myRestaurent?._id,
        amount: result,
      };
      await createCheckOutSession(checkOutOrderData);

      const loadRazorpayScript = () =>
        new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          document.body.appendChild(script);
        });

      await loadRazorpayScript();

      let options = {
        key: orders?.key_id,
        amount: orders?.order?.amount,
        currency: orders?.order?.currency,
        order_id: orders?.order?.id,
        handler: (response) => {
          // console.log(response);
          
          alert(response);
        },
        prefill: {
          name: "ashish",
          email: "ashish@gmail.com",
          contact: "8287176223",
        },
        theme: {
          color: "010101",
        },
      };

      let razorpaycomplete = new Razorpay(options);
      razorpaycomplete.open();
    } catch (error) {
      // console.log(error);
    }
    // console.log(checkoutData);
  };
  useEffect(() => {
    setCheckoutData({
      fullname: user.fullname,
      email: user.email,
      address: user.address,
      contact: user.contact,
      city: user.city,
      country: user.country,
    });
  }, [user]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Your Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={checkoutformHandler}>
          <div className="md:grid grid-cols-2 space-y-2 gap-2 md:space-y-0">
            {mapData?.map((filed) => (
              <div key={filed}>
                <Label>{filed}</Label>
                <Input
                  type="text"
                  disabled={filed === "email"}
                  name={filed}
                  value={checkoutData[filed]}
                  placeholder={filed}
                  onChange={ChangeEventHandler}
                  className="focus-visible:ring-0"
                />
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-center">
            <Button
              className="bg-grn hover:bg-hovergrn mt-4 w-full md:w-fit"
              type="submit"
            >
              Contunue to payment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirm;
