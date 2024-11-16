import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import burger from "@/assets/burger.jpg";
import { useNavigate } from "react-router-dom";
import { useCartData } from "@/store/useCartData";

const RestaurentMenus = ({ restaurentData }) => {
  let navigate = useNavigate();
  let { addToCart } = useCartData();
  return (
    <div className="md:p-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold my-6">Available Menus</h2>

        <div className="grid md:grid-cols-3 grid-cols-1 md:my-0 my-2">
          {restaurentData.map((ele) => (
            <Card key={ele?._id} className="relative ">
              {/* restaurent name & time*/}
              <CardHeader>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={ele?.menuPhoto}
                    className="w-full h-full object-center rounded-xl "
                    alt=""
                  />
                </AspectRatio>
              </CardHeader>

              {/* location & que */}
              <CardContent>
                <CardDescription>{ele?.description}</CardDescription>
              </CardContent>

              <CardContent>
                <h2>Prize:₹ {ele?.price}</h2>
              </CardContent>
              {/* btn */}
              <CardFooter className="flex">
                <Button
                  onClick={() => {
                    navigate("/cart");
                    addToCart(ele);
                  }}
                  className="bg-grn hover:bg-hovergrn w-full"
                >
                  Add to card
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurentMenus;

let SkeletonRestaurentMenus = () => {
  return (
    <div className="md:p-4">
      <div>
        <h2 className="h-6 w-40 bg-gray-300 rounded animate-pulse my-6"></h2>{" "}
        {/* Skeleton for title */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {["Biryani", "Samose", "Momos"].map((ele) => (
            <Card key={ele} className="relative">
              {/* Skeleton for image */}
              <CardHeader>
                <AspectRatio ratio={16 / 9}>
                  <div className="w-full h-full bg-gray-300 rounded-xl animate-pulse"></div>{" "}
                  {/* Image skeleton */}
                </AspectRatio>
              </CardHeader>

              {/* Skeleton for name & description */}
              <CardContent>
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mb-2"></div>{" "}
                {/* Name skeleton */}
                <CardDescription>
                  <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-2"></div>{" "}
                  {/* Description line 1 */}
                  <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse mb-2"></div>{" "}
                  {/* Description line 2 */}
                </CardDescription>
              </CardContent>

              {/* Skeleton for Price */}
              <CardContent>
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>{" "}
                {/* Price skeleton */}
              </CardContent>

              {/* Skeleton for Button */}
              <CardFooter className="flex">
                <div className="h-10 w-full bg-gray-300 rounded-lg animate-pulse"></div>{" "}
                {/* Button skeleton */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
