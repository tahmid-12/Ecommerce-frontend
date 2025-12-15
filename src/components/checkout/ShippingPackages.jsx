import { filterPackages } from "@/lib/utils";
import { addHours, format } from "date-fns";
import { Check } from "lucide-react";
import { useEffect, useMemo } from "react";

const ShippingPackages = ({
  packages,
  shopLocation,
  userLocation,
  deliveryPackage,
  setDeliveryPackage,
  setDeliveryPackageCodes,
  storeId,
  itemQty,
}) => {
  const filteredPackages = useMemo(
    () => filterPackages(packages, userLocation, shopLocation),
    [packages, userLocation, shopLocation, filterPackages]
  );
  useEffect(() => {
    if (filteredPackages?.length) {
      setDeliveryPackage(filteredPackages[0]);
    }
  }, [packages, setDeliveryPackage, filteredPackages]);

  useEffect(() => {
    // Ensure both deliveryPackage and storeId are present
    if (deliveryPackage && storeId) {
      setDeliveryPackageCodes((prev) => {
        // Check if the storeId already exists
        const storeIndex = prev.storeId.indexOf(storeId);

        // If storeId doesn't exist, add it to the array
        if (storeIndex === -1) {
          const newStoreId = [...prev.storeId, storeId];
          const newPackages = [...prev.packages];

          // Push packages for the current store multiplied by itemQty
          for (let i = 0; i < itemQty; i++) {
            newPackages.push(deliveryPackage);
          }

          return {
            storeId: newStoreId,
            packages: newPackages,
          };
        } else {
          // If storeId already exists, update its packages
          const updatedPackages = [...prev.packages];
          const storePackageIndex = storeIndex * itemQty;

          for (let i = 0; i < itemQty; i++) {
            updatedPackages[storePackageIndex + i] = deliveryPackage;
          }

          return {
            ...prev,
            packages: updatedPackages,
          };
        }
      });
    }
  }, [deliveryPackage, setDeliveryPackageCodes, itemQty, storeId]);
  return (
    <div className="grid grid-cols-3 gap-5">
      {filteredPackages?.slice(0, 1)?.map((item) => {
        let deliveryType = "";
        if (item?.hour <= 24 && item.delivery_time.includes("24")) {
          deliveryType = "Express Delivery";
        } else if (item?.hour >= 24) {
          deliveryType = "Standard Delivery";
        }
        return (
          <div
            key={item.id}
            className="border-[2px] border-[#215e50] w-max px-3 py-2 my-5 rounded-lg relative cursor-pointer"
            onClick={() => setDeliveryPackage(item)}
          >
            {item?.id === deliveryPackage?.id ? (
              <div className="delivery-card-active-tag flex items-start justify-start">
                <Check
                  className="absolute -top-[16px] -left-[12px] text-white"
                  size={18}
                />
              </div>
            ) : (
              ""
            )}
            <h1 className="font-bold text-[#215e50]">
              {deliveryType} | ৳ {item?.shipping_charge * itemQty}
            </h1>
            <h1 className="">
              Receive by {format(new Date(), "dd MMM")} -{" "}
              {format(addHours(new Date(), item?.hour), "dd MMM")}{" "}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default ShippingPackages;
