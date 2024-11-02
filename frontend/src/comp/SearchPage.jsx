import React, { useState } from "react";
import FilterPage from "./FilterPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import burger from "@/assets/burger.jpg";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  let [searchQuery, setSearchQuery] = useState(null);
  let navigate = useNavigate()
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="">
          <FilterPage />
        </div>

        <div className="flex-1">
          {/* input query */}
          <div className="flex items-center gap-2">
            <Input
              className=""
              placeholder="search by name"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
            />
            <Button className="bg-grn hover:bg-hovergrn">Search</Button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
            <h1>(2) Search result found</h1>

            <div className="flex gap-2">
              {["Birany", "Samose", "Momos"].map((ele) => (
                <div key={ele} className="flex items-center">
                  <Badge>{ele}</Badge>
                  <X className="" />
                </div>
              ))}
            </div>
          </div>

          {/* search items */}

          <div className=" grid grid-cols-1 md:grid-cols-3 gap-2">
            {["Biryani", "Samose", "Momos"].map((ele) => (
              <Card key={ele} className="relative">
                {/* restaurent name & time*/}
                <CardHeader>
                  <CardTitle>Tanduri Tarka</CardTitle>
                 
                </CardHeader>

                {/* img */}
                <CardContent>
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={burger}
                      className="w-full h-full object-center rounded-xl "
                      alt=""
                    />
                  </AspectRatio>
                </CardContent>

                {/* location & que */}
                <CardContent className="">
                  <div>
                    <div>City:Delhi</div>
                    <div>Country:India</div>
                    <div className="flex gap-2 mt-4">
                      {["Biryani", "Samose", "Momos"].map((que) => (
                        <Badge key={que} className="rounded-xl">
                          {que}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>

                {/* btn */}
                <CardFooter className="flex justify-end">
                  <Button onClick={() =>navigate("/restaurent/123")} className="bg-grn hover:bg-hovergrn">
                    View menus
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

let Skeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {["Biryani", "Samose", "Momos"].map((ele) => (
        <Card key={ele} className="relative">
          {/* Skeleton for Restaurant Name & Time */}
          <CardHeader>
            <CardTitle>
              <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>{" "}
              {/* Skeleton Title */}
            </CardTitle>
            <CardDescription>
              <div className="inline-flex gap-2 items-center">
                <div className="h-4 w-6 bg-gray-300 rounded animate-pulse"></div>{" "}
                {/* Timer Skeleton */}
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>{" "}
                {/* Delivery Time Skeleton */}
              </div>
            </CardDescription>
          </CardHeader>

          {/* Skeleton for Image */}
          <CardContent>
            <AspectRatio ratio={16 / 9}>
              <div className="w-full h-full bg-gray-300 rounded-xl animate-pulse"></div>{" "}
              {/* Skeleton Image */}
            </AspectRatio>
          </CardContent>

          {/* Skeleton for Location & Tags */}
          <CardContent className="">
            <div>
              <div className="h-4 w-1/4 bg-gray-300 rounded animate-pulse"></div>{" "}
              {/* City Skeleton */}
              <div className="h-4 w-1/4 bg-gray-300 rounded mt-2 animate-pulse"></div>{" "}
              {/* Country Skeleton */}
              <div className="flex gap-2 mt-4">
                {["Biryani", "Samose", "Momos"].map((que) => (
                  <div
                    key={que}
                    className="h-6 w-12 bg-gray-300 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </CardContent>

          {/* Skeleton for Button */}
          <CardFooter className="flex justify-end">
            <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>{" "}
            {/* Button Skeleton */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const NoResultFound = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-orange hover:bg-orangeHover">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};
