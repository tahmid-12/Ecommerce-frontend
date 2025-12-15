"use client";
import { useRouter } from "next/navigation";
import { BiSolidCoupon } from "react-icons/bi";
import { IoBarcode } from "react-icons/io5";
import CustomButton from "../CustomButton";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { useGetCurrentUserQuery } from "@/redux/api/currentUser";
import toast from "react-hot-toast";

export default function CheckOutRight({
  discount,
  internal,
  totalAmount,
  code,
  deliveryCharge,
  deliveryPackageCodes,
}) {
  const router = useRouter();

  const { data } = useGetCurrentUserQuery();

  return (
    <div>
      <Card className=" bg-white rounded-2xl shadow-5xl">
        <CardContent className="py-5">
          <div className="border-b-[1px]">
            <h1>Discount and Payment</h1>
            <div className="center mt-5 ">
              <div className="flex items-center gap-3">
                <BiSolidCoupon className=" text-2xl text-primary" />{" "}
                <span className=" pt-0.5">Darkak Voucher</span>
              </div>
              <div>
                <p>No Application Voucher</p>
              </div>
            </div>
            <div className="center my-5">
              <div className="flex items-center gap-3">
                <IoBarcode className=" text-2xl text-primary" />{" "}
                <span className=" pt-0.5">Promo Code</span>
              </div>
              <div className="w-1/2">
                <Input
                  type={"text"}
                  placeholder={"Enter Darkak Code"}
                  value={code}
                  className="border-[1px] px-2 rounded-lg"
                  disabled={code}
                />
              </div>
            </div>
          </div>
          <div className="my-5">
            <h1 className="font-bold text-xl">Order Summary</h1>
            <div className="center my-1">
              <p>Items Total: </p>
              <p> ৳ {totalAmount}</p>
            </div>
            <div className="center mb-1">
              <p>Delivery Fee: </p>
              <p> ৳ {deliveryCharge}</p>
            </div>
            <div className="center mb-1">
              <p> Discount: </p>
              <p> {discount}</p>
            </div>

            <div className="center mb-1">
              <p>Total Payment: </p>
              <p> ৳ {totalAmount + deliveryCharge - discount}</p>
            </div>
            <p className="text-[18px] font-thin text-end">
              VAT includes, where applicable
            </p>
          </div>
          <CustomButton
            click={() => {
              if (!data?.user?.shippingAddress) {
                toast.error("Please add shipping address");
              } else {
                router.push(
                  `/payment?internal=${internal}&${deliveryPackageCodes?.packages
                    ?.map(
                      (item) => `package_code=${item?.package_code.slice(1)}`
                    )
                    .join("&")}&delivery_charge=${deliveryCharge}`
                );
              }
            }}
            title={"Place Order"}
            style={"hover:bg-[#F85606]/40 rounded-xl text-md py-6 w-full"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
