import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Loader2,
  Mail,
  MapPin,
  MapPinHouseIcon,
  Plus,
} from "lucide-react"; // Plus icon ke liye lucide-react package ka use kar sakte hain
import { Input } from "@/components/ui/input";
import { useUserdata } from "@/store/useUserdata";

const Profile = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null); // Image store karne ke liye state
  let [loading, setLoader] = useState(false);
  let { updateProfile, user } = useUserdata();

  let [profileData, setProfileData] = useState({
    fullname: "",
    profilePhoto: image,
    email: "",
    address: "",
    city: "",
    country: "",
  });

  let profileDataHandler = (e) => {
    let { name, value } = e?.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Image ko base64 me convert karne ka helper function
  let imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Image change hone par state update karne ka function
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Image = await imageToBase64(file); // Base64 me convert karna
        setImage(base64Image); // Image ko state me set karna
        setProfileData((perData) => ({
          ...perData,
          profilePhoto: base64Image,
        }));
      } catch (error) {
        console.error("Error converting image to base64", error);
      }
    }
  };

  let profileSubmitHandler = async (e) => {
    e?.preventDefault();
    console.log(profileData?.profilePhoto);

    try {
      let formdata = new FormData();

      if (profileData?.fullname)
        formdata.append("fullname", profileData?.fullname);
      if (profileData?.profilePhoto)
        formdata.append("profilePhoto", profileData?.profilePhoto);
      if (profileData?.address)
        formdata.append("address", profileData?.address);
      if (profileData?.city) formdata.append("city", profileData?.city);
      if (profileData?.country)
        formdata.append("country", profileData?.country);

      await updateProfile(formdata);
    } catch (error) {
      console.log(error);
    }
    // api implementation
  };

  useEffect(() => {
    setProfileData({
      fullname: user?.fullname || "",
      profilePhoto: user?.profilePhoto || undefined,
      email: user?.email || "",
      address: user?.address || "",
      city: user?.city || "",
      country: user?.country || "",
    });
  }, [updateProfile]);

  return (
    <form onSubmit={profileSubmitHandler} className="max-w-7xl mx-auto my-5">
      <div className="">
        <div className="flex items-center gap-3 w-full mb-5">
          {/* set avatar img */}
          <div className="relative group">
            <Avatar className="md:w-28 md:h-28 w-24 h-24 relative">
              <AvatarImage
                src={image || user?.profilePhoto || ""}
                alt="Profile Picture"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {/* Plus icon jo sirf hover par dikhai dega */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full
            text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              // onClick={handleIconClick}
              onClick={() => inputRef.current.click()}
            >
              <Plus className="w-8 h-8" />
            </div>

            {/* Hidden input for file upload */}
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              name="profilePhoto"
            />
          </div>

          {/* set avatar name */}
          <div className="w-full">
            <Input
              type="text"
              placeholder="Set your name"
              className="w-full focus-visible:ring-0 border-none"
              value={profileData.fullname}
              onChange={profileDataHandler}
              name="fullname"
            />
          </div>
        </div>

        {/* inputs data  */}
        <div className="flex flex-col md:items-center md:justify-around md:flex-row gap-5 md:gap-2 p-3 md:p-0">
          <div className="bg-gray-200 relative py-1 w-full">
            <Mail className="text-gray-600 absolute inset-y-2 ml-2" />
            <Input
              type="email"
              placeholder="Set your email"
              className="w-full focus-visible:ring-0 pl-9"
              value={profileData.email}
              onChange={profileDataHandler}
              name="email"
              disabled
            />
          </div>

          <div className="bg-gray-200 relative py-1 w-full">
            <MapPinHouseIcon className="text-gray-600 absolute inset-y-2 ml-2" />
            <Input
              type="text"
              placeholder="Set your address"
              className="w-full focus-visible:ring-0 pl-9"
              value={profileData.address}
              onChange={profileDataHandler}
              name="address"
            />
          </div>

          <div className="bg-gray-200 relative py-1 w-full">
            <MapPin className="text-gray-600 absolute inset-y-2 ml-2" />
            <Input
              type="text"
              placeholder="Set your city"
              className="w-full focus-visible:ring-0 pl-9"
              value={profileData.city}
              onChange={profileDataHandler}
              name="city"
            />
          </div>

          <div className="bg-gray-200 relative py-1 w-full">
            <Globe className="text-gray-600 absolute inset-y-2 ml-2" />
            <Input
              type="text"
              placeholder="Set your country"
              className="w-full focus-visible:ring-0 pl-9"
              value={profileData.country}
              onChange={profileDataHandler}
              name="country"
            />
          </div>
        </div>

        {/* button submit  */}
        <div className="flex items-center justify-center w-full my-3">
          {loading ? (
            <Button
              disabled
              type="submit"
              className="bg-grn hover:bg-hovergrn w-full md:w-fit "
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-grn hover:bg-hovergrn w-full md:w-fit "
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Profile;
