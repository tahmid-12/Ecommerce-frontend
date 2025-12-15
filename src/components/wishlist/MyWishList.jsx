"use client";
import React, {useCallback} from "react";
import {Card, CardContent} from "../ui/card";
import {Button} from "../ui/button";
import Image from "next/image";
import {FaStar} from "react-icons/fa6";
import {BsTrash} from "react-icons/bs";
import {MdOutlineShoppingCart} from "react-icons/md";
import {floatingNumber} from "@/actions/product";
import {useAddToCartMutation, useUpdateCartMutation} from "@/redux/api/cart";
import {successMessage} from "@/lib/utils";

export default function MyWishList({wishList, removeFromList}) {
    const [addToCart] = useAddToCartMutation();
    const [updateCart] = useUpdateCartMutation()
    const handleAddToAll = useCallback(() => {
        wishList?.map((product) => {
            const isExist = wishList?.find(
                (item) => item.products.id === product?.id
            );
            if (!isExist) {
                const data = {
                    productId: product?.id,
                    size: product?.sizes[0]?.name,
                    color: product?.colors[0]?.name,
                    quantity: 1,
                };
                addToCart(data);
            } else {
                updateCart({id: isExist.id, color: isExist.color, size: isExist.size, quantity: isExist.quantity + 1});
            }
            successMessage("Added to cart");
        });
    }, [wishList, updateCart, addToCart]);

    const handleAddToCart = useCallback(
        (product) => {
            const isExist = wishList?.find(
                (item) => item.products.id === product?.id
            );
            if (!isExist) {
                const data = {
                    productId: product?.id,
                    products: product,
                    size: product?.sizes[0]?.name,
                    color: product?.colors[0]?.name,
                    quantity: 1,
                };
                addToCart(data);
            } else {
                updateCart({quantity: isExist.quantity + 1, id: isExist.id, color: isExist.color, size: isExist.size,});
            }
            successMessage("Added to cart");
        },
        [addToCart, updateCart, wishList]
    );
    return (
        <Card className="bg-white border-none shadow-none p-0">
            <CardContent className="space-y-2 p-0">
                <Button
                    onClick={handleAddToAll}
                    className="hover:bg-[#F85606]/40 h-12 px-5 rounded-full text-md pt-4"
                >
                    Add To All Cart
                </Button>
                <div className="shadow-3xl  p-8 ">
                    <p className="text-[16px] text-gray-300">Watchlist</p>
                    <h1 className="text-md font-bold my-3">Datalink</h1>
                    {wishList?.map((item) => {
                        console.log(item);
                        return (
                            <div
                                key={item.id}
                                className="flex w-full mb-5 bg-slate-300 py-5 px-2"
                            >
                                <div className="w-[40%] flex gap-2 ">
                                    <div>
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_API}${item?.images[0]?.path}`}
                                            alt="fashion"
                                            width={90}
                                            height={110}
                                            className="w-[90px] object-cover h-[110px]"
                                        />
                                    </div>
                                    <div className="text-md">
                                        <h1 className="font-bold mb-1">{item?.name}</h1>
                                        <div className="flex gap-2 text-yellow-400">
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/> <span className="text-gray-400">(115)</span>
                                        </div>
                                        <p className="text-gray-400">Color Family:Multicolor</p>
                                        <BsTrash
                                            onClick={() => removeFromList(item.id)}
                                            className="text-gray-400 text-md cursor-pointer hover:text-primary"
                                        />
                                    </div>
                                </div>
                                <div className="w-[60%] flex ">
                                    <div className="w-1/2 centerAll">
                                        <div className="text-md">
                                            <h1 className="text-primary">৳{item?.offer_price}</h1>
                                            <h1>
                        <span className="text-gray-400 mr-1">
                          ৳{item?.regular_price}
                        </span>{" "}
                                                <span>
                          {floatingNumber(
                              item?.offer_price,
                              item?.regular_price
                          )}
                                                    %
                        </span>
                                            </h1>
                                            <h1>Price dr</h1>
                                        </div>
                                    </div>
                                    <div className="w-1/2 flex items-center justify-end">
                                        <Button
                                            onClick={() => handleAddToCart(item)}
                                            className="hover:bg-[#F85606]/40 w-20 h-12 text-2xl rounded-full"
                                        >
                                            <MdOutlineShoppingCart/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
