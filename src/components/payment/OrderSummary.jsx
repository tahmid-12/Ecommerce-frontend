"use client";
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useGetCartsQuery } from "@/redux/api/cart";
import { decrypt } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

function OrderSummary() {
  const { data } = useGetCartsQuery();
  const params = useSearchParams();

  let total = 0;
  const cartData = useMemo(() => {
    return data?.map((cart) => ({
      id: cart.products?.id,
      title: cart.products?.name,
      price: cart.products?.offer_price * cart.quantity,
    }));
  }, [data]);

  const discount = useMemo(() => {
    const str = params.get("internal");

    if (str && str !== "undefined" && str !== "null") {
      const { discount, type, code } = JSON.parse(decrypt(str));

      if (type === "FIXED") {
        return { discount, code };
      } else {
        return { discount: Math.round((discount * total) / 100), code };
      }
    }
    return { discount: 0, code: "" };
  }, [params, total]);
  const deliveryCharge = params.get("delivery_charge");

  return (
    <div className="md:w-[30%] w-full">
      <Card className="bg-white rounded-2xl shadow-5xl">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {cartData?.map((item) => {
            total += parseInt(item.price);
            return (
              <div key={item.id} className="center text-md space-y-3">
                <h1>(+) {item.title}</h1>
                <h1 className="font-bold">৳{item.price}</h1>
              </div>
            );
          })}
          <div className="center text-md space-y-3">
            <h1>(+) Delivery Charge</h1>
            <h1 className="font-bold">৳{deliveryCharge}</h1>
          </div>
        </CardContent>
        <CardFooter className="center text-md font-bold">
          <h1>Total</h1>
          <h1>
            ৳
            {total +
              (Number.isNaN(parseInt(deliveryCharge))
                ? 0
                : parseInt(deliveryCharge))}
          </h1>
        </CardFooter>
      </Card>
    </div>
  );
}

export default OrderSummary;
