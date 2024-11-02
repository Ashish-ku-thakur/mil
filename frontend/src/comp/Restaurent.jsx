import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import RestaurentMenus from "./RestaurentMenus";
import vegitable from "@/assets/vegitable.jpg";

const Restaurent = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      
      {/*restaurent baner */}
      <div className="w-full shadow-xl">
        <div className="w-full h-52 md:h-80 relative">
          <img
            src={vegitable}
            className="h-full w-full object-center rounded-xl "
            alt=""
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          {/* name cuisen time */}
          <div className="my-5">
            <h1 className="font-semibold text-2xl">Birany</h1>
            <div className="flex gap-2 my-2">
              {["Biryani", "Samose", "Momos"].map((ele) => (
                <Badge key={ele}>{ele}</Badge>
              ))}
            </div>

            <div className="my-2">
              <div className="inline">
                <Timer className="inline" />
                Delevery Time:
              </div>{" "}
              30 min
            </div>
          </div>
        </div>
      </div>

      <div>
        <RestaurentMenus />
      </div>
    </div>
  );
};

export default Restaurent;
