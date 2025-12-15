'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { getDiscountPercentage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddGuestAddressMutation } from "@/redux/api/address"; 
import {useAddToGuestCartMutation } from "@/redux/api/cart";
import { useGuestPlaceOrderMutation } from "@/redux/api/order";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import * as z from "zod";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import {
    Form,
} from "../ui/form";
import Image from 'next/image';
import { Invoice } from '..';

const formSchema = z.object({
    full_name: z.string().min(2, {
        message: "Fill full name",
    }),
    mobile: z.string().min(2, {
        message: "Fill valid mobile number",
    }),
    type: z.string().optional(),
    city: z.string().min(2, "Must enter city"),
    district: z.string().min(2, "Must enter district"),
    state: z.string().min(2, "Must enter state"),
    area: z.string().min(2, "Must enter area"),
    thana: z.string().min(2, "Must enter Thana"),
    zip: z.string().min(2, "Must enter Zip Code"),
    landmark: z.string().optional(),
    address: z.string().min(2, "Must enter address"),
    //   shippingAddress: z.boolean().optional(),
});

export default function SingleOrderDialog({ singleOrderDialog, data, setSingleOrderDialog }) {

    const params = useSearchParams();
    const router = useRouter();

    const [addGuestAddress, { isLoading }] = useAddGuestAddressMutation();
    const [addToGuestCart] = useAddToGuestCartMutation();
    const [guestPlaceOrder] = useGuestPlaceOrderMutation();

    // const url = window.location.href; 
    // const productId = url.split('/').pop(); 

    // const [placeOrder] = usePlaceOrderMutation({
    //     params: { productId }, 
    // });

    // const [placeOrder] = usePlaceOrderMutation({
    //     params: { internal: params.get("internal") },
    // });

    

    // console.log("Data in Single Order", data);

    // const [activeLabel, setActiveLabel] = useState("HOME");

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            mobile: "",
            city: "",
            state: "",
            area: "",
            landmark: "",
            address: "",
            thana: "",
            zip: "",
            district: "",
            type: "HOME",
            storeId: data.storeId,
            storeName: data.storeName,
            amount: data.price,
            productId: data.productId,
            size: data.size,
            color: data.color,
            quantity: data.quantity
        },
    });


    function onSubmit(values) {
        values.type = "HOME";
        values.storeId = data.storeId;
        values.storeName = data.storeName;
        values.amount = data.price;
        values.productId = data.productId;
        values.size = data.size;
        values.color = data.color;
        values.quantity = data.quantity;
        // console.log("Values", values);

        // console.log("Values before hitting the API for Guest Address",values.full_name,
        // values.mobile,
        // values.address,
        // values.area,
        // values.city,
        // values.state,
        // values.zip,
        // values.thana,
        // values.landmark)

        // console.log("Values before hitting the guest CART API", values.productId, values.size, values.color, values.quantity, values.mobile)

        Promise.all([
            addGuestAddress({
                full_name: values.full_name,
                mobile: values.mobile,
                address: values.address,
                area: values.area,
                city: values.city,
                state: values.state,
                zip: values.zip,
                thana: values.thana,
                landmark: values.landmark
            }),
            addToGuestCart({
                productId: values.productId,
                size: values.size,
                color: values.color,
                quantity: values.quantity,
                mobile: values.mobile
            })
        ]).then(([addressResponse, cartResponse]) => {

            const addressId = addressResponse.data?.id;
            const cartId = cartResponse.data?.id;


            if(addressId && cartId){

                guestPlaceOrder({
                    address: addressId,
                    amount: values.amount,
                    carts: [cartId],
                    paymentMethod: "CASH_ON_DELIVERY",
                    delivery: "REGULAR",
                    package_code:  params.getAll("package_code")?.map(c=>`#${c}`),
                    mobile: values.mobile
                })
                .then((response) => {
                    toast.success("Order placed successfully!"); 
                    console.log("Response in then", response);
                    // localStorage.setItem("cartId", cartId);
                    // window.open(`/invoice`, '_blank');
                    setSingleOrderDialog(false); 
                })
                .catch(() => {
                    toast.error("Failed to place order. Please try again."); 
                })
                .finally(() => {
                    form.reset(); 
                });
            }
        })
    }

    return (
        <Dialog open={singleOrderDialog} onOpenChange={setSingleOrderDialog} className="bg-white">
            <DialogContent className="p-6 rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-800">Order Details</DialogTitle>
                    <DialogDescription className="text-gray-600">Product Name: <span className="font-medium">{data?.name}</span></DialogDescription>
                </DialogHeader>

                <div>
                    <div className="w-full flex justify-between items-center text-[16px]  py-2">
                        <div className="flex items-center w-1/2 gap-2">
                            <Image
                                src={process.env.NEXT_PUBLIC_IMAGE_API + data.image?.path}
                                width={100}
                                height={100}
                                alt="fasion"
                                className="w-[80px] h-[60px] object-contain"
                            />
                            <div className="">
                                <p className="font-bold">{data?.name}</p>
                                <p>
                                    Color Family: {data?.color}{" "}
                                    <span className={`bg-[${data?.color?.toLowerCase()}] w-6 h-4`}></span>
                                </p>
                            </div>
                        </div>
                        <div className="text-center ">
                            <p>Qty: {data?.quantity}</p>
                        </div>
                        <div className="flex justify-end w-1/3 gap-3 ">
                            <p className="bg-light px-2 w-[175px] text-center flex justify-center items-center gap-2 rounded-md">
                                <span>৳ {data?.regular_price}</span>{" "}
                                <span>
                                    -
                                    {data?.offer_price ? getDiscountPercentage(
                                        data?.regular_price,
                                        data?.offer_price
                                    ) : data?.regular_price}
                                    %
                                </span>
                            </p>
                            <p className="py-0.5 w-[80px] text-center">
                                ৳ {data?.offer_price ? data?.offer_price * data?.quantity : data?.regular_price * data?.quantity}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-5 ml-[90px]">
                        {/* <p className="border-[1px] border-[#215e50] text-[#215e50] px-2 py-0.5 w-max rounded-lg">
                            Free Delivery
                        </p>
                        <p className="border-[1px] border-primary text-primary px-2 py-0.5 w-max rounded-lg">
                            Darkak verified
                        </p>
                        <p className=" border-[1px] border-primary text-primary px-2 py-0.5 w-max rounded-lg">
                            Best Price
                        </p> */}
                    </div>
                </div>

                <div>
                    <Form {...form} className={""}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="md:space-y-6 space-y-2 px-4"
                        >

                            <div className={`flex flex-wrap justify-between w-full gap-3 `}>
                                <div className={"flex items-center w-full gap-2"}>
                                    <CustomInput
                                        style={"profileInput w-full"}
                                        form={form}
                                        placeholder={"Full Name"}
                                        name={"full_name"}
                                        type={"text"}
                                        isLabel={true}
                                    />
                                    <CustomInput
                                        label={"Address"}
                                        style={"profileInput w-full"}
                                        form={form}
                                        placeholder={"House no./ building / street"}
                                        name={"address"}
                                        type={"text"}
                                        isLabel={true}
                                    />
                                </div>
                            </div>

                            <div className={"flex items-center w-full gap-2"}>
                                <CustomInput
                                    style={"profileInput w-full"}
                                    form={form}
                                    label={"Mobile"}
                                    placeholder={"018xxxxxxxx"}
                                    name={"mobile"}
                                    type={"text"}
                                    isLabel={true}
                                />
                                <CustomInput
                                    label={"Landmark (Optional)"}
                                    style={"profileInput w-full"}
                                    form={form}
                                    placeholder={"Eg: Opposite of SOS"}
                                    name={"landmark"}
                                    type={"text"}
                                    isLabel={true}
                                />
                            </div>

                            <div className={"flex items-center w-full gap-2"}>
                                <CustomInput
                                    style={"profileInput w-full"}
                                    form={form}
                                    label={"Province"}
                                    placeholder={"Khulna"}
                                    name={"state"}
                                    type={"text"}
                                    isLabel={true}
                                />
                                {/* <div className={"w-full"}>
                                    <p>Select a label for effective delivery:</p>
                                    <div className={"flex gap-2"}>
                                        <Button
                                            type={"button"}
                                            onClick={() => {setActiveLabel("HOME"); form.setValue("type", "HOME");}}
                                            className={cn(
                                                "w-full hover:bg-primary hover:text-white border-[1px] border-slate-300",
                                                activeLabel === "HOME"
                                                    ? "bg-primary text-white"
                                                    : "bg-muted text-slate-500"
                                            )}
                                        >
                                            Home
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setActiveLabel("OFFICE");
                                                form.setValue("type", "OFFICE");  
                                            }}
                                            type={"button"}
                                            className={cn(
                                                "w-full hover:bg-primary hover:text-white border-[1px] border-slate-300",
                                                activeLabel === "OFFICE"
                                                    ? "bg-primary text-white"
                                                    : "bg-muted text-slate-500"
                                            )}
                                        >
                                            Office
                                        </Button>
                                    </div>
                                </div> */}
                            </div>

                            <div className={"w-full flex items-center gap-2"}>
                                <CustomInput
                                    style={"profileInput w-full"}
                                    form={form}
                                    label={"District"}
                                    placeholder={"Khulna"}
                                    name={"district"}
                                    type={"text"}
                                    isLabel={true}
                                />
                                <CustomInput
                                    style={"profileInput w-full"}
                                    form={form}
                                    label={"City"}
                                    placeholder={"Khulna"}
                                    name={"city"}
                                    type={"text"}
                                    isLabel={true}
                                />

                                <CustomInput
                                    style={"profileInput w-full"}
                                    form={form}
                                    label={"Thana"}
                                    placeholder={"Sonadanga"}
                                    name={"thana"}
                                    type={"text"}
                                    isLabel={true}
                                />
                            </div>

                            <div className={`flex flex-wrap justify-between w-full gap-3 `}>
                                <div className={"flex items-center w-full gap-2"}>
                                    <CustomInput
                                        style={"profileInput w-full"}
                                        form={form}
                                        label={"Zip Code/ Postal Code"}
                                        placeholder={"7400"}
                                        name={"zip"}
                                        type={"text"}
                                        isLabel={true}
                                    />
                                    <CustomInput
                                        label={"Area"}
                                        style={"profileInput w-full"}
                                        form={form}
                                        placeholder={"Eg: Opposite of SOS"}
                                        name={"area"}
                                        type={"text"}
                                        isLabel={true}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex justify-center">
                                <CustomButton
                                    isLoading={isLoading}
                                    title={"Place Order"}
                                    type={"submit"}
                                    style={"cusBtn hover:bg-[#F85606]/40"}
                                />
                            </div>

                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}