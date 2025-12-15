"use client";
import { MobileNav } from "@/components";
import CheckoutLeft from "@/components/checkout/CheckOutLeft";
import CheckOutRight from "@/components/checkout/CheckOutRight";
import { decrypt } from "@/lib/utils";
import { useGetCartsQuery } from "@/redux/api/cart";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function CheckOutPage() {
  const params = useSearchParams();
  const { data: cartItem } = useGetCartsQuery();
  const [deliveryPackage, setDeliveryPackage] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryPackageCodes, setDeliveryPackageCodes] = useState({
    storeId:[] ,
    packages:[]
  });
  const discount = useMemo(() => {
    const str = params.get("internal");

    if (str && str !== "undefined") {
      const { discount, type, code } = JSON.parse(decrypt(str));

      if (type === "FIXED") {
        return { discount, code };
      } else {
        return { discount: Math.round((discount * totalAmount) / 100), code };
      }
    }
    return { discount: 0, code: "" };
  }, [params, totalAmount]);

  useEffect(() => {
    if (cartItem) {
      const totalAmount = cartItem?.reduce(
        (a, b) => a + b?.products?.offer_price * b.quantity,
        0
      );
      setTotalAmount(totalAmount);
    }
  }, [cartItem]);

  return (
    <main>
      <MobileNav title={"Check Out"} />
      <section className="flex md:flex-row flex-col gap-4 md:my-10 mt-16">
        <div className="md:w-[70%] w-full">
          <CheckoutLeft
            deliveryPackage={deliveryPackage}
            setDeliveryPackage={setDeliveryPackage}
            setDeliveryPackageCodes={setDeliveryPackageCodes}
          />
        </div>
        <div className="md:w-[30%] w-full">
          <CheckOutRight
            discount={discount.discount}
            code={discount.code}
            totalAmount={totalAmount}
            internal={params.get("internal")}
            deliveryCharge={deliveryPackageCodes?.packages?.reduce((a,b)=>a+b.shipping_charge,0)}
            setTotalAmount={setTotalAmount}
            deliveryPackageCodes={deliveryPackageCodes}
          />
        </div>
      </section>
    </main>
  );
}
