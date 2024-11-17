import burger from "@/assets/burger.jpg";
import { Button } from "@/components/ui/button";
import { useOrderData } from "@/store/useOrderData";
import { IndianRupee } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Order = () => {
  let { getOrderData, totalOrders } = useOrderData();

  useEffect(() => {
    getOrderData();
  }, []);

  if (!totalOrders || totalOrders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl">Order Not Found</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className=" text-center font-bold md:font-extrabold md:text-2xl mb-6">
          Order Status{" "}
        </h2>

        <div className="mb-6">
          {totalOrders.map((order, index) => (
            <div key={index} className="mb-2">
              <h2 className="mb-6">
                Order Summary:span{" "}
                <span className="text-pink-700">
                  {" "}
                  {order?.status.toUpperCase()}
                </span>
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 md:gap-6 items-center">
                  <div>
                    {order?.cartItem?.map((item) => (
                      <div className="flex items-center gap-10">
                        <img
                          src={item.menuPhoto || burger}
                          className="w-20 h-20 rounded-2xl object-cover"
                          alt={order.name || "Order Image"}
                        />
                        <p className="font-bold text-xl">{item.name}</p>
                        <p className="font-bold text-xl">{item.price}</p>
                        <p className="font-bold text-xl">{item.quntity}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1 md:gap-3">
                  <IndianRupee />
                  <span>{order.totalAmount}</span>
                </div>
              </div>
              <hr className="my-8" />
            </div>
          ))}

          <div className="md:flex items-center justify-center">
            <Link to="/shop">
              <Button className="bg-grn hover:bg-hovergrn w-full md:w-fit ">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
