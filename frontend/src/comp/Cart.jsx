import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import CheckoutConfirm from "./CheckoutConfirm";
import { useCartData } from "@/store/useCartData";
import _ from "lodash";

const Cart = () => {
  const invoices = [
    {
      invoice: "INV001",
      titel: "Birany",
      totalAmount: "$250.00",
      qty: "2",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV001",
      titel: "Birany",
      totalAmount: "$250.00",
      qty: "2",
      paymentMethod: "Credit Card",
    },
  ];
  let {
    cart,
    clearCart,
    incrementQuentity,
    decrementQuentity,
    removeFromTheCart,
  } = useCartData();

  let result = _.sum(cart?.map((ele) => ele?.price * ele?.quntity)); // sum of the array's total [23,56,78]
  let [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button
          className="bg-grn hover:bg-hovergrn"
          onClick={() => clearCart()}
        >
          Clear All
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Item</TableHead>
            <TableHead>Titel</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cart?.map((invoice, idx) => (
            <TableRow key={idx} className="hover:bg-gray-400">
              <TableCell>
                <Avatar>
                  <AvatarImage src={invoice?.menuPhoto} alt="menu-photo" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>

              <TableCell>{invoice.name}</TableCell>
              <TableCell>{invoice.price}</TableCell>

              {/* plus & minus */}
              <TableCell>
                <div className="flex items-center  gap-3">
                  <Button
                    onClick={() => decrementQuentity(invoice?._id)}
                    size="icon"
                    className="bg-gray-200 text-black rounded-full hover:bg-hovergrn"
                  >
                    <Minus />
                  </Button>
                  <span>{invoice?.quntity}</span>
                  <Button
                    onClick={() => incrementQuentity(invoice?._id)}
                    size="icon"
                    className="bg-gray-200 text-black rounded-full hover:bg-hovergrn"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>

              <TableCell> {invoice.quntity * invoice?.price} </TableCell>

              <TableCell className="text-right">
                {" "}
                <Button
                  className="bg-grn hover:bg-hovergrn"
                  onClick={() => removeFromTheCart(invoice?._id)}
                >
                  Clear All
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="font-bold text-xl">
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">${result}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex justify-end my-3">
        <Button
          onClick={() => setOpen(true)}
          className="bg-grn hover:bg-hovergrn"
        >
          Proced to checkout
        </Button>
      </div>

      <CheckoutConfirm open={open} setOpen={setOpen} result={result} />
    </div>
  );
};

export default Cart;
