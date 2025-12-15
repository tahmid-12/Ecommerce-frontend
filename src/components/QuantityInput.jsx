"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useGetCartsQuery, useUpdateCartMutation } from "@/redux/api/cart";
import { useAuth } from "@/auth";
function QuantityInput({ quantity, productId, setQuantity }) {
  const { isAuth } = useAuth();
  const { data } = useGetCartsQuery(undefined, {
    skip: !isAuth,
  });
  const [isExist, setIsExist] = useState(null);
  const [updateCart] = useUpdateCartMutation();
  // Updating Existance of Cart Item
  useEffect(() => {
    const exist = data?.find((item) => item?.products?.id === productId);
    setIsExist(exist);
  }, [data, productId]);
  return (
    <div className="w-28 px-2 flex items-center gap-2 border-[1px] rounded-full border-primary text-primary">
      <Button
        onClick={() => {
          if (isExist?.quantity > 1 || quantity > 1) {
            if (typeof setQuantity !== "function") {
              updateCart({
                id: isExist?.id,
                quantity: isExist?.quantity - 1,
                size: isExist?.size,
                color: isExist?.color,
              });
            } else {
              setQuantity((prev) => prev - 1);
            }
          }
        }}
        className="p-0 bg-transparent text-2xl cursor-pointer text-black"
      >
        -
      </Button>
      <Input
        id="quantity"
        placeholder={quantity}
        value={quantity}
        type="number"
        className={`placeholder:text-[16px] placeholder:text-center text-center text-black text-[16px] outline-none font-normal bg-transparent`}
      />
      <Button
        onClick={() => {
          if (typeof setQuantity !== "function") {
            if (isExist?.quantity < 5) {
              updateCart({
                id: isExist?.id,
                quantity: isExist?.quantity + 1,
                size: isExist?.size,
                color: isExist?.color,
              });
            }
          } else {
            setQuantity((prev) => {
              if (prev < 5) {
                return prev + 1;
              } else {
                return prev;
              }
            });
          }
        }}
        className="p-0 bg-transparent text-2xl cursor-pointer text-black"
      >
        +
      </Button>
    </div>
  );
}

export default QuantityInput;
