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
import { useState } from "react";

const CheckoutConfirm = ({ open, setOpen }) => {
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

  let checkoutformHandler = (e) => {
    e?.preventDefault();
    console.log(checkoutData);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Your Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={checkoutformHandler}>
          <div className="md:grid grid-cols-2 space-y-2 gap-2 md:space-y-0">
            {mapData.map((filed) => (
              <div key={filed}>
                <Label>{filed}</Label>
                <Input
                  type="text"
                  name={filed}
                  value={checkoutData.filed}
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
