import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserdata } from "@/store/useUserdata";
import { useCartData } from "@/store/useCartData";

// import bird from '@/'

const Navbar = () => {
  let [admin, setAdmin] = useState(true);
  let { logout, loading, user } = useUserdata();
  let navigate = useNavigate();
  let { cart } = useCartData();

  let move = () => {
    navigate("/signup");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to={"/"} className="font-bold md:font-extrabold text-2xl">
          Sasts-Nasta
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <div className="gap-12 flex items-center">
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/order"}>Order</Link>

            {/* admin */}

            {user?.admin && (
              <div>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <Link to={"/admin/restaurent"}>
                        <MenubarItem>Restaurent</MenubarItem>
                      </Link>
                      <Link to={"/admin/addmenus"}>
                        <MenubarItem>Menu</MenubarItem>
                      </Link>
                      <Link to={"/admin/orders"}>
                        <MenubarItem>Orders</MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            )}

            {/* theam */}
            <div>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <Sun size={"20"} />
                  </MenubarTrigger>
                  <MenubarContent>
                    <div className="flex justify-between items-center mb-2">
                      <MenubarItem>Light</MenubarItem>
                      <Sun size={"20"} />
                    </div>

                    <div className="flex justify-between items-center">
                      <MenubarItem>Dark</MenubarItem>
                      <Moon size={"20"} />
                    </div>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>

            <Link to={"/cart"} className="relative">
              <ShoppingCart size={"20"} />
              {cart?.length > 0 && (
                <Button
                  size="icons"
                  className="w-4 h-4 absolute -top-3 left-2 bg-red-700 hover:bg-red-800"
                >
                  {cart?.length}
                </Button>
              )}
            </Link>

            {/* avatar */}
            <div>
              <Avatar>
                <AvatarImage src={user?.profilePhoto} alt="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            {loading ? (
              <Button disabled className="bg-grn hover:bg-hovergrn w-full my-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={() => {
                  logout(); // Call the logout function
                  move(); // Call the move function
                }}
                className="bg-grn hover:bg-hovergrn w-full my-2"
              >
                Logout
              </Button>
            )}
          </div>
        </div>

        {/* mobile res */}
        <div className="md:hidden flex">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

let MobileNavbar = () => {
  let { logout, loading, user } = useUserdata();
  let navigate = useNavigate();
  let { cart } = useCartData();

  let move = () => {
    navigate("/signup");
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Button size={"icon"} className="bg-grn hover:bg-hovergrn">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="my-3">
          <div className="flex items-center justify-between">
            <SheetTitle>Ashish</SheetTitle>
            {/* theam */}
            <div>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <Sun size={"20"} />
                  </MenubarTrigger>
                  <MenubarContent>
                    <div className="flex justify-between items-center mb-2">
                      <MenubarItem>Light</MenubarItem>
                      <Sun size={"20"} />
                    </div>

                    <div className="flex justify-between items-center">
                      <MenubarItem>Dark</MenubarItem>
                      <Moon size={"20"} />
                    </div>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </SheetHeader>

        <hr />

        {/* sheet */}
        <SheetDescription className="h-[80vh]">
          <Link
            to={"/profile"}
            className="flex items-center gap-6 cursor-pointer hover:bg-gray-300 p-2"
          >
            <User />
            <p>Profile</p>
          </Link>

          <Link
            to={"/order"}
            className="flex items-center gap-6 cursor-pointer hover:bg-gray-300 p-2"
          >
            <HandPlatter />
            <p>Order</p>
          </Link>

          <Link
            to={"/cart"}
            className="flex items-center gap-6 cursor-pointer hover:bg-gray-300 p-2"
          >
            <ShoppingCart />
            <p>Cart{cart?.length}</p>
          </Link>

          {user?.admin && (
            <div>
              <Link
                to={"/admin/addmenus"}
                className="flex items-center gap-6 cursor-pointer hover:bg-gray-300 p-2"
              >
                <Menu />
                <p>Menu</p>
              </Link>

              <Link
                to={"/admin/restaurent"}
                className="flex items-center gap-6 cursor-pointer hover:bg-gray-300 p-2"
              >
                <UtensilsCrossed />
                <p>Restaurent</p>
              </Link>

              <Link
                to={"/admin/orders"}
                className="flex items-center gap-6 cursor-pointer hover:bg-gray-300 p-2"
              >
                <PackageCheck />
                <p>RestaurentOrders</p>
              </Link>
            </div>
          )}
        </SheetDescription>

        <SheetFooter>
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center w-1/2">
              <Avatar>
                <AvatarImage src={user?.profilePhoto} alt="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm uppercase font-serif">
                {user?.fullname} </p>
            </div>

            <div className="w-1/2">
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
                  onClick={() => {
                    logout(); // Call the logout function
                    move(); // Call the move function
                  }}
                  className="bg-grn hover:bg-hovergrn w-full my-2"
                >
                  Logout
                </Button>
              )}
            </div>

            {/* <Button className="bg-grn hover:bg-hovergrn">Logout</Button> */}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
