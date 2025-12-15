"use client";
import React, {useMemo, useState} from "react";
import {IoIosSend} from "react-icons/io";
import {Input} from "../ui/input";
import Link from "next/link";
import {GoArrowLeft} from "react-icons/go";
import {Button} from "../ui/button";
import {useRouter} from "next/navigation";
import {api} from "@/api";
import {errorMessage} from "@/lib/utils";
import {toast} from "react-hot-toast";
import {useGetCartsQuery} from "@/redux/api/cart";

export default function TableFooter() {
    const router = useRouter();
    const [couponCode, setCouponCode] = useState("");
    const [couponResult, setCouponResult] = useState({});
    const {data} = useGetCartsQuery();

    const totalCost = useMemo(() => {
        return data?.reduce(
            (a, b) => a + b?.products?.offer_price * b.quantity,
            0
        );
    }, [data]);
    return (
        <div className="mt-10 w-full md:flex">
            <div className="md:w-[60%] w-full center">
                <Link href={"/products"} className="text-md md:flex gap-3 hidden">
                    <GoArrowLeft className="text-primary"/>{" "}
                    <span>Continue Shopping</span>
                </Link>
                <div className="flex px-2 border-[1px] items-center border-primary rounded-full">
                    <Input
                        id="promo_code"
                        placeholder={"Promo Code"}
                        type="text"
                        onChange={(e) => setCouponCode(e.target.value)}
                        className={`placeholder:text-[16px] px-5 text-black text-[16px] rounded-full outline-none font-normal`}
                    />
                    <IoIosSend
                        onClick={() => {
                            api
                                .post("/voucher/validate", {
                                    code: couponCode,
                                    order_value: totalCost,
                                })
                                .then((res) => {
                                    if (!res.data?.valid) {
                                        toast.error(res.data?.message);
                                        return;
                                    }
                                    setCouponResult(res.data);
                                })
                                .catch((err) => {
                                    errorMessage(err);
                                });
                        }}
                        className="text-primary text-md"
                    />
                </div>
            </div>
            <div className="md:w-[40%] w-full flex md:justify-end  md:mt-0 mt-5">
                <div className="md:w-[70%] w-full center">
                    <h1 className="text-md">
                        Total cost: <span>BDT {totalCost}</span>
                    </h1>
                    <Button
                        onClick={() => {
                            router.prefetch(`/checkout`, {
                                kind: "auto",
                            });

                            router.push(
                                `/checkout?internal=${couponResult?.data}`
                            );
                        }}
                        className="hover:bg-[#F85606]/40 md:w-[40%] w-[30%]  rounded-full"
                    >
                        Proceed To Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}
