import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import addRestaurentMenuSchema from "@/schema/addRestaurentMenus";
import burger from "@/assets/burger.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import EditMenuDiaglog from "./EditMenuDiaglog";
import { useMenudata } from "@/store/useMenudata";
import { useRestaurentdata } from "@/store/useRestaurentdata";

let details = [
  {
    id: 1,
    menuPhoto:
      "https://plus.unsplash.com/premium_photo-1674597598636-218d83e378bd?q=80&w=1670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Birany",
    description:
      "lorem20-_photo-1674597598636-218d83e378bd?q=80&w=1670&auto=format&fit=crop",
    price: 20,
  },
  {
    id: 2,
    menuPhoto:
      "https://plus.unsplash.com/premium_photo-1674597598636-218d83e378bd?q=80&w=1670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Jalebi",
    description: "lorem30",
    price: 30,
  },
  {
    id: 3,
    menuPhoto:
      "https://plus.unsplash.com/premium_photo-1674597598636-218d83e378bd?q=80&w=1670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Momos",
    description: "lorem40",
    price: 40,
  },
];

const AdminAddMenus = () => {
  let [open, setOpen] = useState(false);
  let [open2, setOpen2] = useState(false);
  let [selectedMenu, setSelectedMenu] = useState(null);
  const imageRef = useRef(); // Ref defined for file input
  const [errors, setErrors] = useState({});

  const [addMenuData, setAddMenuData] = useState({
    name: "",
    description: "",
    price: "",
    menuPhoto: undefined,
  });
  const mapData = Object.keys(addMenuData);
  const [image, setImage] = useState(null);

  let { createMenu, menus, loading } = useMenudata();
  let { myRestaurent, getRestaurent } = useRestaurentdata();

  const ChangeEventHandler = (e) => {
    const { name, value, type } = e.target;
    setAddMenuData({
      ...addMenuData,
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
        setAddMenuData((perData) => ({
          ...perData,
          menuPhoto: file,
        }));
      } catch (error) {
        console.error("Error converting image to base64", error);
      }
    }
  };

  const checkoutformHandler = async (e) => {
    e.preventDefault();
    const result = addRestaurentMenuSchema.safeParse(addMenuData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      // console.log(fieldErrors);
      return;
    }
    setErrors({});

    try {
      let formdata = new FormData();
      formdata.append("name", addMenuData?.name);
      formdata.append("description", addMenuData?.description);
      formdata.append("price", addMenuData?.price);
      formdata.append("menuPhoto", addMenuData?.menuPhoto);

      await createMenu(formdata);
    } catch (error) {
      // console.log(error);
    }

    
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h2 className="font-bold md:font-extrabold text-xl md:text-2xl">
          Available Menus
        </h2>
        {/* Add New menu */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-grn hover:bg-hovergrn">
              <Plus />
              Add menus
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>To Stand your name</DialogDescription>
            </DialogHeader>

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
                        field === "price"
                          ? "number"
                          : field === "menuPhoto"
                          ? "file"
                          : "text"
                      }
                      name={field}
                      value={
                        field === "menuPhoto"
                          ? undefined // browser value input type file me value nahi leta iselia undefined
                          : addMenuData[field]
                      }
                      placeholder={field}
                      className={`focus-visible:ring-0 ${
                        field === "menuPhoto" ? "hidden" : ""
                      }`}
                      ref={field === "menuPhoto" ? imageRef : null} // Ref added only for RestaurentPhoto
                      onChange={(e) => {
                        if (field === "menuPhoto") {
                          uploadImageHandler(e);
                        } else {
                          ChangeEventHandler(e);
                        }
                      }}
                    />
                    {field === "menuPhoto" && (
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
                  <Button
                    disabled
                    className="bg-grn hover:bg-hovergrn w-full my-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    // onClick={2}
                    className="bg-grn hover:bg-hovergrn mt-4 w-full md:w-fit"
                    type="submit"
                  >
                    Add New Menu
                  </Button>
                )}
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* show menus */}
      <div className="md:p-4">
        <div>
          <div className="grid md:grid-cols-3 grid-cols-1 md:my-0 my-2">
            {myRestaurent?.menus.map((ele) => (
              <Card key={ele?.id} className="relative ">
                {/* restaurent menuname & time*/}
                <CardHeader>
                  <AspectRatio ratio={18 / 8}>
                    <img
                      src={ele?.menuPhoto}
                      className="w-full h-full object-center rounded-xl "
                      alt=""
                    />
                  </AspectRatio>
                </CardHeader>

                {/* location & que */}
                <CardContent>
                  <div className="font-bold">{ele?.name}</div>

                  <CardDescription>
                    {ele?.description.substring(0, 25)}...etc
                  </CardDescription>
                </CardContent>

                <CardContent>
                  <h2>Prize:₹ {ele?.price}</h2>
                </CardContent>
                {/* btn */}
                <CardFooter className="flex">
                  <Button
                    onClick={() => {
                      setSelectedMenu(ele);
                      setOpen2(true);
                    }}
                    className="bg-grn hover:bg-hovergrn w-full"
                  >
                    Edit Menu
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <EditMenuDiaglog
        selectedMenu={selectedMenu}
        open2={open2}
        setOpen2={setOpen2}
      />
    </div>
  );
};

export default AdminAddMenus;
