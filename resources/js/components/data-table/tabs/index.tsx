import { useState } from "react";
import { type TabItem as Items } from "@/types";
import TabItem from "./tab-item";
const TableTabs = ({ data, table }: { data: Items[]; table: any }) => {
const [activeTab, setActiveTab] = useState<Items["value"]>("all");
return (
    <div className="flex flex-row items-center gap-5 px-5">
        {data?.map((item: Items) => (
        <TabItem
            key={item.index}
            item={item}
            table={table}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
        ))}
    </div>
);
};

export default TableTabs;
