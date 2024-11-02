import burger from "@/assets/burger.jpg";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
const Order = () => {
  let orders = ["0"];

  if (orders.length === 0) {
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
          Order Status:{" "}
          <span className="text-pink-700">{"Confirmed".toUpperCase()}</span>
        </h2>

        <div className="mb-6">
          <h2 className="mb-6">Order Summary</h2>
          {/* your order items dispaly here */}

          {[1, 2]?.map((ele) => (
            <div key={ele} className="mb-2">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 md:gap-6 items-center">
                  <img
                    src={burger}
                    className="w-20 h-20 rounded-2xl object-cover"
                    alt=""
                  />
                  <p className="font-bold text-xl">Burger</p>
                </div>
                <div className="flex gap-1 md:gap-3">
                  <IndianRupee />
                  <span>80</span>
                </div>
              </div>
              <hr className="my-8" />
            </div>
          ))}

          <div className="md:flex items-center justify-center">
            <Link>
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
