"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import DatePicker from "../DatePicker";
import { Form } from "../ui/form";
import { format } from "date-fns";
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from "@/redux/api/currentUser";
import CustomTextInput from "../Update/input";
import CustomSelector from "../Update/selector";



const formSchema = z.object({
    name: z.string().min(2, {
        message: "Fill full name",
    }),
    email: z.string().min(2, {
        message: "Fill valid email address",
    }),
    mobile: z.string().min(2, {
        message: "Fill valid mobile number",
    }),
    dob: z
        .preprocess(
            (value) => (value ? format(value, "yyyy-MM-dd") : ""),
            z.string()
        )
        .optional(),
    gender: z.string({
        message: "Please select an gender to display.",
    }),
    marriageDate: z
        .preprocess(
            (value) => (value ? format(value, "yyyy-MM-dd") : ""),
            z.string()
        )
        .optional(),
});

export default function ProfileForm({ isProfile, isEdit }) {
    const { data } = useGetCurrentUserQuery()
    const [updateUser, { isLoading }] = useUpdateCurrentUserMutation()
    const route = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        values: data?.user ? data.user : {},
    });

    // 2. Define a submit handler.
    function onSubmit(values) {
        updateUser({ id: data?.user?.id, ...values });
    }

    return (
        <Form {...form} className={""}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:space-y-6 space-y-2"
            >
                <div
                    className={`grid grid-cols-3 w-full ${isEdit ? "md:gap-16 gap-5" : "md:gap-10 gap-5"
                        }`}
                >
                    {/* <CustomInput
                        style={"profileInput "}
                        form={form}
                        placeholder={"Full Name"}
                        name={"name"}
                        type={"text"}
                        isLabel={true}
                        isDisable={isProfile}
                        isFixWidth={true}
                    /> */}

                    <CustomTextInput
                        form={form}
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        style={"profileInput "}
                    />

                    <CustomTextInput
                        form={form}
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        style={"profileInput"}
                    />

                    {/* <CustomInput
                        style={"profileInput"}
                        form={form}
                        placeholder={"Email Address"}
                        name={"email"}
                        type={"email"}
                        isLabel={true}
                        isDisable={isProfile}
                        isFixWidth={true}
                        disable={true}
                    /> */}
                    <CustomInput
                        style={"profileInput"}
                        form={form}
                        placeholder={"Mobile"}
                        name={"mobile"}
                        type={"text"}
                        isLabel={true}
                        isDisable={isProfile}
                        isFixWidth={true}
                        disable={!!data?.user?.mobile?.length}
                    />
                    <DatePicker form={form} name="dob" />
                    {/* <CustomInput
                        form={form}
                        placeholder={"Gender"}
                        name={"gender"}
                        isLabel={true}
                        isSelector={true}
                        isDisable={isProfile}
                        isFixWidth={true}
                    /> */}
                    <CustomSelector
                        form={form}
                        label="Gender"
                        name="gender"
                        placeholder="Select gender"
                        options={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" }
                        ]}
                    />
                    <DatePicker form={form} name="marriageDate" label="Marriage Date" />
                </div>
                {!isEdit ? (
                    <div className="center mt-36">
                        <div className="md:w-[20%] w-[35%]">
                            <CustomButton
                                title={"Change Password"}
                                type={""}
                                style={"cusBtn hover:bg-[#F85606]/40"}
                            />
                        </div>
                        <div className="md:w-[20%] w-[35%]">
                            <CustomButton
                                click={() => route.push("/edit-profile")}
                                title={"Edit Profile"}
                                style={"cusBtn hover:bg-[#F85606]/40"}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="md:w-[20%] w-[35%] mx-auto">
                        <CustomButton
                            isLoading={isLoading}
                            title={"Save"}
                            type={"submit"}
                            style={"cusBtn hover:bg-[#F85606]/40"}
                        />
                    </div>
                )}
            </form>
        </Form>
    );
}
