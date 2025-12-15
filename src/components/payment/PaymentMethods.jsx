"use client";

import { Cash, SSLCommerz } from "@/assets/images";
import { useGetCartsQuery } from "@/redux/api/cart";
import { useGetCurrentUserQuery } from "@/redux/api/currentUser";
import { usePlaceOrderMutation } from "@/redux/api/order";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CustomButton from "../CustomButton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function PaymentMethods() {
  const params = useSearchParams();

  const [placeOrder] = usePlaceOrderMutation({
    params: { internal: params.get("internal") },
  });
  const { data: cartItem } = useGetCartsQuery();
  const [amount, setAmount] = useState(0);
  const [carts, setCarts] = useState([]);
  const { data } = useGetCurrentUserQuery();
  const router = useRouter();

  const confirmCashOnDelivery = () => {
    if (!cartItem) {
      toast.error("Please continue shopping to order");
    }
    
    placeOrder({
      amount,
      carts,
      address:
        data?.user?.shippingAddress?.address +
        " ," +
        data?.user?.shippingAddress?.city +
        ", " +
        data?.user?.shippingAddress?.state,
      paymentMethod: "CASH_ON_DELIVERY",
      delivery: "REGULAR",
      package_code:  params.getAll("package_code")?.map(c=>`#${c}`),
    }).finally(() => {
      router.push("/my-order");
    });
  };

  useEffect(() => {
    const totalAmount = cartItem?.reduce(
      (a, b) => a + b.products?.offer_price * b?.quantity,
      0
    );
    setAmount(totalAmount);
  }, [cartItem]);
  useEffect(() => {
    const carts = cartItem?.map((c) => c.id);
    setCarts(carts);
  }, [cartItem]);

  return (
    <div className="md:w-[70%] w-full">
      <Card className="bg-white rounded-2xl shadow-5xl">
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Cash" className="mt-5 ">
            <TabsList className="grid w-full grid-cols-2 shadow-5xl">
              <TabsTrigger
                value="ssl"
                className="data-[state=active]:bg-[#F85606]/30"
              >
                <Image
                  src={SSLCommerz}
                  alt="ssl commerz"
                  width={90}
                  height={30}
                />
              </TabsTrigger>
              <TabsTrigger
                value="Cash"
                className="data-[state=active]:bg-[#F85606]/30"
              >
                <Image
                  src={Cash}
                  alt="ssl commerz"
                  width={40}
                  height={30}
                  className="w-[50px]"
                />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ssl">
              <div className="h-[300px] p-5  bg-gray-100 shadow-5xl rounded-lg">
                <h1>Please ensure the following before you proceed:</h1>
                <p>1. You have an activated SSL Commerz Account</p>
                <p>
                  2. You are able to receive an OTP on your registered Mobile
                  Number.
                </p>
                <p>
                  3. You have sufficient balance in your account to carry out
                  the transaction
                </p>
                <CustomButton
                  disabled={true}
                  style={"hover:bg-light w-[30%] mt-10"}
                  title={"Pay Now"}
                />
              </div>
            </TabsContent>
            <TabsContent value="Cash">
              <div className="h-[300px] p-5 bg-gray-100 rounded-lg shadow-5xl">
                <p>You have an activated Cash On Delivery</p>

                <CustomButton
                  click={confirmCashOnDelivery}
                  style={"hover:bg-light w-[30%] mt-10 text-sm leading-2"}
                  title={"Confirm Yor Order"}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentMethods;
