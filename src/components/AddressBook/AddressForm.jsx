"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  useAddNewAddressMutation,
  useUpdateAddressMutation,
} from "@/redux/api/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { useAuth } from "@/auth";

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
  shippingAddress: z.boolean().optional(),
});

export default function AddressForm({ isEdit,onClose }) {
  const [activeLabel, setActiveLabel] = useState("HOME");
  const { isAuth } = useAuth();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? isEdit
      : {
          full_name: "",
          mobile: "",
          type: activeLabel,
          city: "",
          state: "",
          area: "",
          landmark: "",
          address: "",
          shippingAddress: false,
          billingAddress: false,
          thana: "",
          zip: "",
          district: "",
        },
    values: isEdit ? isEdit : {},
  });

  const [addNewAddress, { isLoading }] = useAddNewAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  // 2. Define a submit handler.
  function onSubmit(values) {
    if (!isAuth) {
      toast.error("Please login first");
      return;
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!isEdit) {
      addNewAddress(values).then(() => {
        form.reset();
        onClose();
      });
    } else {
      updateAddress({ ...values, id: isEdit.id }).then(() => form.reset());
    }
  }

  useEffect(() => {
    form.setValue("type", activeLabel);
  }, [activeLabel, form]);

  return (
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
            <div className={"w-full"}>
              <p>Select a label for effective delivery:</p>
              <div className={"flex gap-2"}>
                <Button
                  type={"button"}
                  onClick={() => setActiveLabel("HOME")}
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
                  onClick={() => setActiveLabel("OFFICE")}
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
            </div>
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
          <div className={"flex items-center w-full gap-2"}>
            <div className={"w-full"}>
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
            <div className={"w-full border-2 rounded-md"}>
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Default delivery Address</FormLabel>
                      <FormDescription>
                        Your existing default address setting will be replaced
                        if you make some changes here.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-[40%] flex justify-center">
          <CustomButton
            isLoading={isLoading}
            title={isEdit ? "Save" : "Add New"}
            type={"submit"}
            style={"cusBtn hover:bg-[#F85606]/40"}
          />
        </div>
      </form>
    </Form>
  );
}
