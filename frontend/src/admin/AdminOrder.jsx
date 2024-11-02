import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

let statusOption = [
  "Pending",
  "Confirmed",
  "Preparing",
  "OutForDelevery",
  "Delivered",
];
const AdminOrder = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 p-3">
      <h1 className="font-bold md:font-extrabold md:text-2xl text-xl p-3">
        Orders Overview
      </h1>
      <div className="space-y-8">
        {/* Restaurent orders display here */}
        <div className="flex flex-col md:flex-row justify-between shadow-xl p-3">
          <div className="flex-1 mb-6 sm:mb-0">
            <p>Ashish kumar tahkur</p>
            <p>
              <span className="font-medium">Address: </span>
              XYZ Address
            </p>
            <p>
              <span className="font-medium">Total: </span>₹ 80
            </p>
          </div>

          <div>
            <h2>Order Status</h2>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {statusOption?.map((ele) => (
                    <SelectItem key={ele} value={ele}>{ele}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
