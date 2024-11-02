import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const FilterPage = () => {
  let appliedFilterHandler = (text) => {
    // alert(text);
    console.log(text);
  };
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h2>Filter by cuisines</h2>
        <Button variant="link">Reset</Button>
      </div>

      {filterOption.map((filter) => (
        <div key={filter?.id} className="flex items-center my-4 gap-2">
          <Checkbox
            id={filter?.id}
            onClick={() => appliedFilterHandler(filter?.label)}
          />
          <label
            htmlFor="terms"
            className="cursor-not-allowed text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {filter?.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;

let filterOption = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "birany", label: "Birany" },
  { id: "momos", label: "Momos" },
];
