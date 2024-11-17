import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMenudata } from "@/store/useMenudata";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const EditMenuDiaglog = ({ selectedMenu, open2, setOpen2 }) => {
  // console.log(selectedMenu);

  const [editMenuData, setEditMenuData] = useState({
    name: "",
    description: "",
    price: "",
    menuPhoto: undefined,
  });

  const imageRef = useRef(); // Ref defined for file input
  const mapData = Object.keys(editMenuData);
  const [image, setImage] = useState(null);

  let { editMenu, loading } = useMenudata();

  const ChangeEventHandler = (e) => {
    const { name, value, type } = e.target;
    setEditMenuData({
      ...editMenuData,
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
        setEditMenuData((perData) => ({
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

    try {
      let formdata = new FormData();
      formdata.append("name", editMenuData?.name);
      formdata.append("description", editMenuData?.description);
      formdata.append("price", editMenuData?.price);
      formdata.append("menuPhoto", editMenuData?.menuPhoto);

      await editMenu(formdata, selectedMenu?._id);
    } catch (error) {
      // console.log(error);
    }
    // api start here
    // console.log(editMenuData);
  };

  // set the previous value
  useEffect(() => {
    setEditMenuData({
      name: selectedMenu?.name,
      description: selectedMenu?.description,
      price: selectedMenu?.price,
      menuPhoto: selectedMenu?.menuPhoto,
    });
  }, [selectedMenu]);

  return (
    <Dialog open={open2} onOpenChange={setOpen2}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>GHF</DialogDescription>
        </DialogHeader>

        {/* edit menu data */}
        <form onSubmit={checkoutformHandler}>
          <div className="md:grid grid-cols-2 space-y-2 gap-2 md:space-y-0">
            {mapData.map((field) => (
              <div key={field}>
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
                      : editMenuData[field]
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

          {/* loading btn */}
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
                Edit Menu
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenuDiaglog;
