import { useLocation } from "react-router-dom";

const LoadingTableSkeleton = () => {
  const pathname = useLocation()?.pathname;
  const isManageRoster = pathname?.includes("manage-roster");

  return (
    <div className="w-full bg-gray-50 rounded-md animate-pulse">
      <div className="h-9 rounded-lg mb-4 flex justify-between items-center">
        <div className="flex flex-col md:flex-row gap-3 items-end">
          <p className="h-8 bg-gray-200 rounded-md min-w-[135px]"></p>
          <p
            className={`h-8 bg-gray-200 rounded-md min-w-[135px] mb-6 md:mb-0 ${
              isManageRoster && "hidden"
            }`}
          ></p>
        </div>
        <div className={`flex gap-2 items-end ${isManageRoster && "hidden"}`}>
          <p className="h-8 bg-gray-200 rounded-md min-w-[60px]"></p>
          <p className="h-8 bg-gray-200 rounded-md min-w-[60px]"></p>
        </div>
      </div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-7 bg-gray-200 rounded-md mb-2"></div>
    </div>
  );
};

export default LoadingTableSkeleton;
