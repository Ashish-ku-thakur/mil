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

  let [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button className="bg-grn hover:bg-hovergrn">Clear All</Button>
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
          {invoices.map((invoice, idx) => (
            <TableRow key={idx} className="hover:bg-gray-400">
              <TableCell>
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>

              <TableCell>{invoice.titel}</TableCell>
              <TableCell>{invoice.totalAmount}</TableCell>

              <TableCell>
                <div className="flex items-center  gap-3">
                  <Button
                    size="icon"
                    className="bg-gray-200 text-black rounded-full hover:bg-hovergrn"
                  >
                    <Minus />
                  </Button>
                  <span>20</span>
                  <Button
                    size="icon"
                    className="bg-gray-200 text-black rounded-full hover:bg-hovergrn"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>

              <TableCell> {invoice.totalAmount} </TableCell>

              <TableCell className="text-right">
                {" "}
                <Button className="bg-grn hover:bg-hovergrn">Clear All</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className='font-bold text-xl'>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex justify-end my-3">
        <Button onClick={() =>setOpen(true)} className="bg-grn hover:bg-hovergrn">Proced to checkout</Button>
      </div>

      <CheckoutConfirm open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Cart;
