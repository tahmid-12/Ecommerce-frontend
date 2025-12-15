"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "../ui/form"
import CustomInput from "../CustomInput"
import CustomButton from "../CustomButton"

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Fill up the full name input field",
    }),
    mobileNumber: z.string().min(2, {
        message: "Fill up the mobile number input field",
    }),
    gmail: z.string().min(2, {
        message: "Fill up the gmail input field",
    }),
    message: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),
})

export default function MessageForm() {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            mobileNumber: "",
            gmail: '',
            message: ''
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form} className={'w-full'}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <CustomInput style={'profileInput'} form={form} placeholder={'Full Name'} name={'fullName'} type={'text'} isLabel={true} isMessage={true}/>
                <CustomInput style={'profileInput'} form={form} placeholder={'Mobile Number'} name={'mobileNumber'} type={'text'} isLabel={true} isMessage={true}/>
                <CustomInput style={'profileInput'} form={form} placeholder={'Gmail'} name={'gmail'} type={'gmail'} isLabel={true} isMessage={true}/>
                <CustomInput style={'textArea'} form={form} placeholder={'Message'} name={'message'} isTextArea={true} isLabel={true} isMessage={true}/>
                <div className=" flex justify-end">
                    <CustomButton title={"Send"} type={'submit'} style={' hover:bg-[#F85606]/40 w-[30%] text-md rounded-full'} />
                </div>
            </form>
        </Form>
    )
}
