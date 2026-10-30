import { LuLeaf, LuTruck, LuMapPin } from "react-icons/lu";
import { useSelector } from "react-redux";
import { SITE } from "../../config/site";
import { selectStoreConfig } from "../../redux/slices/productSlice";
import { formatINR } from "../../utils/currency";

export default function AnnouncementBar() {
  const config = useSelector(selectStoreConfig);
  return (
    <div className="bg-farm-800 text-white">
      <div className="container-x flex h-9 items-center justify-center gap-6 text-xs sm:text-[13px] xl:justify-between">
        <span className="hidden xl:block xl:w-1/4" />
        <p className="flex items-center gap-2 font-medium whitespace-nowrap">
          <LuLeaf className="h-4 w-4 text-leaf-light" aria-hidden />
          Fresh from our farm • Delivered to your doorstep
        </p>
        <div className="hidden items-center gap-6 whitespace-nowrap md:flex">
          <span className="flex items-center gap-2">
            <LuTruck className="h-4 w-4" aria-hidden />
            Free delivery on orders above {formatINR(config.freeDeliveryThreshold)}
          </span>
          <span className="hidden items-center gap-1.5 xl:flex">
            <LuMapPin className="h-4 w-4" aria-hidden />
            {SITE.serviceArea}
          </span>
        </div>
      </div>
    </div>
  );
}
