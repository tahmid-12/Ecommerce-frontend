"use client";

import AddressDialog from "@/components/AddressBook/AddressDialog";
import AddressForm from "@/components/AddressBook/AddressForm";
import { getDiscountPercentage, groupCartByShop } from "@/lib/utils";
import { useGetCartsQuery } from "@/redux/api/cart";
import { useGetCurrentUserQuery } from "@/redux/api/currentUser";
import { useGetPackagesQuery } from "@/redux/api/packages";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { BiSolidCoupon } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ShippingPackages from "./ShippingPackages";

export default function CheckOutLeft({
  deliveryPackage,
  setDeliveryPackage,
  setDeliveryPackageCodes,
}) {
  const { data: cartItem } = useGetCartsQuery();
  const cartData = useMemo(() => groupCartByShop(cartItem), [cartItem]);
  const { data } = useGetCurrentUserQuery();
  const { data: packages } = useGetPackagesQuery();
  return (
    <div>
      <ShippingAddress data={data} />
      {cartData?.map((item) => {
        return (
          <Card key={item?.id} className="mt-5 bg-white rounded-lg  shadow-5xl">
            <CardContent className="py-5">
              <div>
                <h1 className="text-2xl font-bold">{item?.shop}</h1>
                <hr />
                <div className="border-b-[1px] pb-5">
                  {item?.cart_items?.map((item) => {
                    return <ProductDetails key={item.id} {...item} />;
                  })}
                </div>
              </div>
              <ShippingPackages
                packages={packages}
                shopLocation={item?.shopLocation}
                userLocation={data?.user?.shippingAddress?.district}
                deliveryPackage={deliveryPackage}
                setDeliveryPackage={setDeliveryPackage}
                setDeliveryPackageCodes={setDeliveryPackageCodes}
                itemQty={item?.cart_items?.length}
                storeId={item?.cart_items[0]?.products?.user?.id}
              />
              <div className="center">
                <div className="border-[1px] w-1/2 rounded-md   flex justify-between md:px-4 px-2 py-5">
                  <div className="flex items-center gap-3">
                    <BiSolidCoupon className="text-2xl  text-primary" />{" "}
                    <span className="font-bold pt-0.5">Store Voucher</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold pt-0.5">Get Voucher</span>
                    <FaChevronRight className="text-xl  text-primary" />
                  </div>
                </div>
                <div className="text-end">
                  <p>
                    {item?.cart_items?.length} Item(s), SubTotal: ৳{" "}
                    {item?.cart_items?.reduce(
                      (a, b) => a + b?.products?.offer_price * b.quantity,
                      0
                    )}
                  </p>
                  <p>
                    Saved: ৳{" "}
                    {item?.cart_items?.reduce(
                      (a, b) => a + b?.products?.regular_price * b.quantity,
                      0
                    ) -
                      item?.cart_items?.reduce(
                        (a, b) => a + b?.products?.offer_price * b.quantity,
                        0
                      )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

const ProductDetails = ({ products, quantity, color }) => {
  return (
    <div>
      <div className="w-full flex justify-between items-center text-[16px]  py-2">
        <div className="flex items-center w-1/2 gap-2">
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_API + products?.images[0]?.path}
            width={100}
            height={100}
            alt="fasion"
            className="w-[80px] h-[60px] object-contain"
          />
          <div className="">
            <p className="font-bold">{products?.name}</p>
            <p>
              {products?.brand?.name || "No Brand"}, Color Family: {color}{" "}
              <span className={`bg-[${color?.toLowerCase()}] w-6 h-4`}></span>
            </p>
          </div>
        </div>
        <div className="text-center ">
          <p>Qty: {quantity}</p>
        </div>
        <div className="flex justify-end w-1/3 gap-3 ">
          <p className="bg-light px-2 w-[150px] text-center flex justify-center items-center gap-2 rounded-md">
            <span>৳ {products?.regular_price}</span>{" "}
            <span>
              -
              {getDiscountPercentage(
                products?.regular_price,
                products?.offer_price
              )}
              %
            </span>
          </p>
          <p className="py-0.5 w-[80px] text-center">
            ৳ {products?.offer_price}
          </p>
        </div>
      </div>
      <div className="flex gap-5 ml-[90px]">
        <p className="border-[1px] border-[#215e50] text-[#215e50] px-2 py-0.5 w-max rounded-lg">
          Free Delivery
        </p>
        <p className="border-[1px] border-primary text-primary px-2 py-0.5 w-max rounded-lg">
          Darkak verified
        </p>
        <p className=" border-[1px] border-primary text-primary px-2 py-0.5 w-max rounded-lg">
          Best Price
        </p>
      </div>
    </div>
  );
};

const Address = ({ address }) => {
  return (
    <div className="md:w-[50%] w-full bg-white rounded-2xl shadow-5xl px-3 py-2 my-5">
      <div className="center">
        <h1 className={`text-xl`}>{address?.user?.name}</h1>
        <div className="center ">
          <AddressDialog isEdit={address} title={"Edit Address"} />
        </div>
      </div>

      <p>{address?.area} </p>
      <p>
        {address?.state} - {address?.city} - {address?.thana}
      </p>
      <p>{address?.address}</p>
      <p>{address?.mobile}</p>
      <div className="flex items-center gap-3 ">
        <p className="text-[12px] bg-orange-300/70 px-2 text-primary py-0.5 rounded-lg">
          {address?.type}
        </p>
        <p className="text-[12px] bg-orange-300/70 px-2 text-primary py-0.5 rounded-lg">
          Default delivery add...
        </p>
      </div>
    </div>
  );
};

const ShippingAddress = ({ data }) => {
  return (
    <Card className="bg-white  rounded-2xl shadow-5xl">
      <CardContent className="py-5">
        <p>Delivery To: {data?.user?.name} </p>
        <div className="flex gap-2 mt-1">
          {data?.user?.shippingAddress ? (
            <>
              <p className="bg-light px-2 py-0.5 w-min">
                {data?.user?.shippingAddress?.type}
              </p>
              <p className=" py-0.5">{data?.user?.shippingAddress?.mobile}</p>{" "}
              ||
              <p className=" py-0.5">{data?.user?.shippingAddress?.address}</p>
            </>
          ) : (
            "No Default Address Please Add One"
          )}
          <Dialog>
            <DialogTrigger asChild className="">
              <Link href={"#"} className="py-0.5 text-primary ">
                Edit{" "}
              </Link>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] p-0 rounded-2xl top-[300px]">
              <DialogHeader className={"border-b-[2px] shadow-3xl py-3 px-4"}>
                <DialogTitle className="text-[16px]">
                  My Delivery Address{" "}
                </DialogTitle>
              </DialogHeader>
              <div className="px-4 md:h-[40vh] h-[20vh]">
                {data?.user?.shippingAddress ? (
                  <Address address={data?.user?.shippingAddress} />
                ) : (
                  <>
                    <h2>{data?.user?.address?.length} Address on Book</h2>
                    <p>
                      No default address please add or edit from{" "}
                      <Link href={"/address-book"} className={"text-primary"}>
                        Address book
                      </Link>
                    </p>
                  </>
                )}
              </div>
              <div className={"w-full"}>
                <div className="w-full px-4 py-3 center shadow-3xl">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Link href={"#"}>
                        <span className="text-primary py-0.5">+</span> Add New
                        Address
                      </Link>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] p-0">
                      <DialogHeader
                        className={"border-b-[2px] shadow-3xl py-3 px-4"}
                      >
                        <DialogTitle className="text-[16px]">
                          Add Delivery Address{" "}
                        </DialogTitle>
                      </DialogHeader>
                      <AddressForm isEdit={false} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border-[1px] rounded-lg p-3 my-5">
          <h1>
            Collect your parcel from the nearest darkak Pick-up point with a
            reduced shipping fee
          </h1>
          <p>7 Suggested collection point(s) nearby</p>
        </div>
        <div className="flex gap-2 mt-1">
          <p className=" py-0.5">Billing to the same address</p>
        </div>
        <div className="flex gap-2 mt-1">
          <p className=" py-0.5">Email to {data?.user?.email}</p>
        </div>
      </CardContent>
    </Card>
  );
};
