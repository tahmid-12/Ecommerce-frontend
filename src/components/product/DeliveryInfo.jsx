"use client";

import AddressForm from "@/components/AddressBook/AddressForm";
import { useGetCurrentUserQuery } from "@/redux/api/currentUser";
import Link from "next/link";
import { BsCash } from "react-icons/bs";
import { FaPersonWalking } from "react-icons/fa6";
import { IoBicycle, IoLocationOutline } from "react-icons/io5";
import { MdBlockFlipped, MdHealthAndSafety } from "react-icons/md";
import { PiClockClockwiseBold } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useAuth } from "@/auth";

function DeliveryInfo({ product }) {
  const { isAuth } = useAuth();
  const { data } = useGetCurrentUserQuery(undefined, { skip: !isAuth });
  const address = data?.user?.shippingAddress;
  return (
    <div className="md:w-[30%] md:block hidden h-min py-5 px-5 shadow-5xl bg-white rounded-2xl">
      <h4 className="text-md font-bold">Delivery</h4>
      <div className="text-md flex justify-between my-4">
        <div className="flex gap-2">
          <IoLocationOutline className="text-primary " />
          <p className="w-[70%]">
            {address
              ? `${address?.state}, ${address?.city}, ${address?.address}`
              : "No Default Address"}
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <h4 className="text-primary cursor-pointer font-bold">Change</h4>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[670px] bg-white">
            <DialogHeader>
              <DialogTitle>Shipping Address</DialogTitle>
            </DialogHeader>
            <AddressForm isEdit={false} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="text-md flex justify-between my-4">
        <div className="flex gap-2">
          <FaPersonWalking className="text-primary " />
          <p className="w-[70%]">Free Delivery 4 Dec - 9 Dec 4 - 9 day(s)</p>
        </div>
        <h4 className="font-bold">Free</h4>
      </div>
      <div className="text-md flex justify-between my-4">
        <div className="flex gap-2">
          <IoBicycle className="text-primary " />
          <p className="w-[80%]">Fastest Delivery Tomorrow 1 Dec Tomorrow</p>
        </div>
        <h4 className="font-bold">৳55</h4>
      </div>
      <div className="text-md my-4">
        <div className="flex gap-2">
          <BsCash className="text-primary " />
          <p className="w-[70%]">Cash on Delivery Available</p>
        </div>
      </div>
      <h4 className="text-md font-bold">Service</h4>
      <div className="text-md my-4">
        <div className="flex gap-2">
          <MdHealthAndSafety className="text-primary " />
          <p className="w-[70%]">Darkak Verified</p>
        </div>
      </div>
      <div className="text-md my-4">
        <div className="flex gap-2">
          <PiClockClockwiseBold className="text-primary " />
          <div>
            <p className="w-[70%]">7 Days Returns</p>
            <small className="text-gray-400">
              Change of mind is not applicable
            </small>
          </div>
        </div>
      </div>
      <div className="text-md my-4">
        <div className="flex gap-2">
          <MdBlockFlipped className="text-primary " />
          <p className="w-[70%]">Warranty not available</p>
        </div>
      </div>
      <Link
        className={"text-primary"}
        href={`/store/${product?.user?.id}?store=${
          product?.user?.shopName ?? "Darkak"
        }&image=${product?.user?.profileImage?.path}`}
      >
        Visit Store
      </Link>
    </div>
  );
}

export default DeliveryInfo;
