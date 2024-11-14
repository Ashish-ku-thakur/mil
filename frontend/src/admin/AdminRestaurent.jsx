import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { restaurentSchema } from "@/schema/restaurentSchema";
import { useRestaurentdata } from "@/store/useRestaurentdata";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const AdminRestaurent = () => {
  const imageRef = useRef(); // Ref defined for file input
  const [errors, setErrors] = useState({});
  const [addrestaurentData, setAddrestaurentData] = useState({
    restaurentName: "",
    city: "",
    country: "",
    deleveryTime: "",
    cuisiens: [],
    restaurentPhoto: undefined,
  });
  const mapData = Object.keys(addrestaurentData);
  const [image, setImage] = useState(null);

  let { createRestaurent, loading, myRestaurent, getRestaurent } = useRestaurentdata();

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
          restaurentPhoto: file,
        }));
      } catch (error) {
        console.error("Error converting image to base64", error);
      }
    }
  };

  const checkoutformHandler = async (e) => {
    e.preventDefault();
    const result = restaurentSchema.safeParse(addrestaurentData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      console.log(fieldErrors);
      return;
    }
    setErrors({});

    try {
      let formdata = new FormData();

      formdata.append("restaurentName", addrestaurentData?.restaurentName);
      formdata.append("city", addrestaurentData?.city);
      formdata.append("country", addrestaurentData?.country);
      formdata.append("deleveryTime", addrestaurentData?.deleveryTime);
      formdata.append("cuisiens", JSON.stringify(addrestaurentData?.cuisiens));
      formdata.append("restaurentPhoto", addrestaurentData?.restaurentPhoto);

      await createRestaurent(formdata);
    } catch (error) {
      console.log(error);
    }

    // create res or update res
    // try {
    //   let formdata = new FormData();

    //   if (addrestaurentData?.restaurentName)
    //     formdata.append("restaurentName", addrestaurentData?.restaurentName);

    //   if (addrestaurentData?.city)
    //     formdata.append("city", addrestaurentData?.city);

    //   if (addrestaurentData?.country)
    //     formdata.append("country", addrestaurentData?.country);

    //   if (addrestaurentData?.deleveryTime)
    //     formdata.append(
    //       "deleveryTime",
    //       addrestaurentData?.deleveryTime.toString()
    //     );

    //   if (addrestaurentData?.cuisiens)
    //     formdata.append("cuisiens", JSON.stringify(addrestaurentData.cuisiens));

    //   if (addrestaurentData?.restaurentPhoto)
    //     formdata.append("restaurentPhoto", addrestaurentData.restaurentPhoto);

    //   if (myRestaurent) {
    //     await updateRestaurent(formdata);
    //   } else {
    //     await createRestaurent(formdata);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const change = (e) => {
    setAddrestaurentData({
      ...addrestaurentData,
      cuisiens: e.target.value.split(","),
    });
  };

  let getRetaurentFeature = async () => {
    await getRestaurent();
  };

  useEffect(() => {
    let fetchRestaurent = async () => {
      await getRestaurent();
      setAddrestaurentData({
        restaurentName: myRestaurent?.restaurentName || "",
        city: myRestaurent?.city || "",
        country: myRestaurent?.country || "",
        deleveryTime: myRestaurent?.deleveryTime || 0,
        cuisiens: myRestaurent?.cuisiens || [],
        restaurentPhoto: myRestaurent?.restaurentPhoto || undefined,
      });
    };
    fetchRestaurent();
    getRetaurentFeature()
    // console.log(myRestaurent);
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <h1 className="font-bold md:font-extrabold text-2xl mb-4">
          Add restaurentName
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
                    field === "deleveryTime"
                      ? "number"
                      : field === "restaurentPhoto"
                      ? "file"
                      : "text"
                  }
                  name={field}
                  value={
                    field === "restaurentPhoto"
                      ? undefined // browser value input type file me value nahi leta iselia undefined
                      : addrestaurentData[field]
                  }
                  // placeholder={field}
                  className={`focus-visible:ring-0 ${
                    field === "restaurentPhoto" ? "hidden" : ""
                  }`}
                  ref={field === "restaurentPhoto" ? imageRef : null} // Ref added only for restaurentPhoto
                  onChange={(e) => {
                    if (field === "cuisiens") {
                      change(e);
                    } else if (field === "restaurentPhoto") {
                      uploadImageHandler(e);
                    } else {
                      ChangeEventHandler(e);
                    }
                  }}
                />
                {field === "restaurentPhoto" && (
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
            {loading ? (
              <Button disabled className="bg-grn hover:bg-hovergrn w-full my-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                className="bg-grn hover:bg-hovergrn mt-4 w-full md:w-fit"
                type="submit"
              >
                {myRestaurent ? "Update restaurentName" : "Add restaurentName"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRestaurent;
