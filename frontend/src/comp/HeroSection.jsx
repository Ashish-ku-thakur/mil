import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import burger from "@/assets/burger.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  let [serchText, setSerchText] = useState("");
  let navigate = useNavigate();
  return (
    <div className="flex items-center justify-center m-4 gap-20 flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg ">
      <div className="flex flex-col gap-10 w-full md:w-[80%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold text-4xl md:text-5xl">
            Order Food any time any where
          </h1>
          <p>Hy Our Delious Food is wating for you we are always near to you</p>
        </div>

        {/* search and img */}
        <div className="md:flex flex-row gap-5 w-full">
          <div className="flex items-center gap-3 w-full mb-3">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search by Country or Restaurent"
                className="focus-visible:ring-1 pl-8 w-full shadow-xl"
                value={serchText}
                onChange={(e) => setSerchText(e?.target?.value)}
              />

              <Search className="text-gray-500 absolute inset-y-2 ml-2 w-fit" />
            </div>

            <Button
              onClick={()=>navigate(`/search-page/${serchText}`)}
              className="bg-grn hover:bg-hovergrn"
            >
              Search
            </Button>
          </div>

          <img
            src={burger}
            className="w-full h-80 object-cover origin-center rounded-xl"
            alt="Hero_img"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
