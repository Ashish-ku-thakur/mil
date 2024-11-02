import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { restaurentSchema } from "@/schema/restaurentSchema";
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";

const AdminRestaurent = () => {
  const [loader, setLoader] = useState(false);
  const imageRef = useRef(); // Ref defined for file input
  const [errors, setErrors] = useState({});
  const [addrestaurentData, setAddrestaurentData] = useState({
    Restaurent: "",
    Address: "",
    Country: "",
    DeleveryTime: "",
    Cuisiens: [],
    RestaurentPhoto: undefined,
  });
  const mapData = Object.keys(addrestaurentData);
  const [image, setImage] = useState(null);

  const ChangeEventHandler = (e) => {
    const { name, value, type } = e.target;
    setAddrestaurentData({
      ...addrestaurentData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Image = await imageToBase64(file);
        setImage(base64Image);
        setAddrestaurentData((perData) => ({
          ...perData,
          RestaurentPhoto: file,
        }));
      } catch (error) {
        console.error("Error converting image to base64", error);
      }
    }
  };

  const checkoutformHandler = (e) => {
    e.preventDefault();
    const result = restaurentSchema.safeParse(addrestaurentData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      console.log(fieldErrors);
      return;
    } else {
      setErrors({});
      console.log(addrestaurentData);
    }
  };

  const change = (e) => {
    setAddrestaurentData({
      ...addrestaurentData,
      Cuisiens: e.target.value.split(","),
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <h1 className="font-bold md:font-extrabold text-2xl mb-4">
          Add Restaurent
        </h1>

        <form onSubmit={checkoutformHandler}>
          <div className="md:grid grid-cols-2 space-y-2 gap-2 md:space-y-0">
            {mapData.map((field) => (
              <div key={field}>
                {errors[field] && (
                  <span className="text-red-600 w-full flex justify-center">
                    {errors[field]}
                  </span>
                )}
                <Label>{field}</Label>
                <Input
                  type={
                    field === "DeleveryTime"
                      ? "number"
                      : field === "RestaurentPhoto"
                      ? "file"
                      : "text"
                  }
                  name={field}
                  value={
                    field === "RestaurentPhoto"
                      ? undefined // browser value input type file me value nahi leta iselia undefined
                      : addrestaurentData[field]
                  }
                  placeholder={field}
                  className={`focus-visible:ring-0 ${
                    field === "RestaurentPhoto" ? "hidden" : ""
                  }`}
                  ref={field === "RestaurentPhoto" ? imageRef : null} // Ref added only for RestaurentPhoto
                  onChange={(e) => {
                    if (field === "Cuisiens") {
                      change(e);
                    } else if (field === "RestaurentPhoto") {
                      uploadImageHandler(e);
                    } else {
                      ChangeEventHandler(e);
                    }
                  }}
                />
                {field === "RestaurentPhoto" && (
                  <div
                    onClick={() => imageRef.current.click()}
                    className="cursor-pointer bg-grn hover:bg-hovergrn mt-4 w-fit p-2 rounded-md text-gray-700"
                  >
                    Upload Image
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-center">
            {loader ? (
              <Button disabled className="bg-grn hover:bg-hovergrn w-full my-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                className="bg-grn hover:bg-hovergrn mt-4 w-full md:w-fit"
                type="submit"
              >
                Add Restaurent
              </Button>
            )}
          </div>
        </form>
      </div>

     
    </div>
  );
};

export default AdminRestaurent;
