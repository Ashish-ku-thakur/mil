import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import RestaurentMenus from "./RestaurentMenus";
import vegitable from "@/assets/vegitable.jpg";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRestaurentdata } from "@/store/useRestaurentdata";

const Restaurent = () => {
  let params = useParams();

  let { selectedRestaurent, getRestaurentById } = useRestaurentdata();

  useEffect(() => {
    let fetchRestaurentDataById = async () => {
      await getRestaurentById(params?.id);
    };
    fetchRestaurentDataById();
  }, [params?.id]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      {/*restaurent baner */}
      <div className="w-full shadow-xl">
        <div className="w-full h-52 md:h-80 relative">
          <img
            src={selectedRestaurent?.restaurentPhoto || ""}
            className="h-full w-full object-center rounded-xl "
            alt=""
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          {/* name cuisen time */}
          <div className="my-5">
            <h1 className="font-semibold text-2xl">Birany</h1>
            <div className="flex gap-2 my-2">
              {selectedRestaurent?.cuisiens?.map((ele) => (
                <Badge key={ele}>{ele}</Badge>
              ))}
            </div>

            <div className="my-2">
              <div className="inline">
                <Timer className="inline" />
                Delevery Time:
              </div>{" "}
              {selectedRestaurent?.deleveryTime || "NA"} min
            </div>
          </div>
        </div>
      </div>

      <div>
        <RestaurentMenus restaurentData={selectedRestaurent?.menus} />
      </div>
    </div>
  );
};

export default Restaurent;
