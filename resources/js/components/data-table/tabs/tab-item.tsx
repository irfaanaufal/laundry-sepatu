import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { type TabItem as Items } from "@/types";
import { cn } from "@/lib/utils";

const TabItem = ({
  item,
  table,
  activeTab,
  setActiveTab,
}: {
  item: Items;
  table: any;
  activeTab: Items["value"];
  setActiveTab: (value: Items["value"]) => void;
}) => {
  const { label, value, count } = item;
  const handleClick = () => {
    setActiveTab(value);
    table.getColumn('value').setFilterValue(value);
  };
  const isActive = useMemo(() => activeTab === value, [activeTab, value]);
  return (
    <>
      {value === "archived" && (
        <Separator className="mr-2 h-4 mx-2" orientation="vertical" />
      )}
      <div
        className={cn(
          "flex flex-row gap-2 items-center border-b-2 border-transparent hover:border-black pb-1 cursor-pointer ",
          {
            "border-primary": isActive,
            "hover:border-primary": isActive,
          }
        )}
        onClick={handleClick}
      >
        <h3
          className={cn("font-normal", {
            "text-primary": isActive,
            "font-bold": isActive,
          })}
        >
          {label}
        </h3>
        <span
          className={cn("bg-gray-200 rounded-xl text-xs px-[6px] font-light", {
            "bg-primary text-white": isActive,
          })}
        >
          {count}
        </span>
      </div>
    </>
  );
};

export default TabItem;
