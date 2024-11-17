import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurentdata } from "@/store/useRestaurentdata";
import { useEffect } from "react";

let statusOption = [
  "pending",
  "paid",
  "confirmed",
  "preparing",
  "outfordelivery",
  "delivered",
];

const AdminOrder = () => {
  let { getRestaurentOrders, restaurentOrders, updateRestaurenOrderStatus } =
    useRestaurentdata();

  const handleStatus = async (orderId, status) => {
    // console.log(orderId,status);
    
    await updateRestaurenOrderStatus(orderId, status);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getRestaurentOrders();
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-10 p-3">
      <h1 className="font-bold md:font-extrabold md:text-2xl text-xl p-3">
        Orders Overview
      </h1>
      <div className="space-y-8">
        {/* Restaurent orders display here */}
        {restaurentOrders?.map((order) => (
          <div
            key={order?._id}
            className="flex flex-col md:flex-row  justify-between shadow-xl p-3 mb-6"
          >
            <div className="sm:mb-5">
              <p>{order?.deleveryDetails?.name}</p>
              <p>
                <span className="font-medium">Address: </span>
                {order?.deleveryDetails?.address}
              </p>
              <p>
                <span className="font-medium">Total: </span>₹{" "}
                {order?.totalAmount}
              </p>
            </div>

            <div>
              <h2>Order Status</h2>
              <Select
                onValueChange={(newStatus) =>
                  handleStatus(order?._id, newStatus)
                }
                defaultValue={order?.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statusOption?.map((ele) => (
                      <SelectItem key={ele} value={ele}>
                        {ele}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrder;
