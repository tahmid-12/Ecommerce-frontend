"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "../ui/form"
import CustomButton from "../CustomButton"
import CustomInput from "../CustomInput"


const formSchema = z.object({
    cardNumber: z.string().min(2, {
        message: "Fill Card Number",
    }),
    cardName: z.string().min(2, {
        message: "Fill Card Name",
    }),
    expireDate: z.string().min(2, {
        message: "Fill Expire Date",
    }),
    cvv: z.string().min(2, {
        message: "Fill CVV",
    }),
})
export default function CardPayment() {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardNumber: "",
            cardName: "",
            expireDate: "",
            cvv: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form} className={''}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CustomInput style={'input'} form={form} placeholder={'Card number'} name={'cardNumber'} type={'text'} isLabel={true} />
                <CustomInput style={'input'} form={form} placeholder={'Card Name'} name={'cardName'} type={'text'} isLabel={true} />
                <div className="flex gap-5">
                    <CustomInput style={'input'} form={form} placeholder={'Expire Date'} name={'expireDate'} type={'text'} isLabel={true} />
                    <CustomInput style={'input'} form={form} placeholder={'CVV'} name={'cvv'} type={'text'} isLabel={true} />
                </div>
                <div className="w-[40%]">
                    <CustomButton title={"Save"} type={'submit'} style={'cusBtn hover:bg-[#F85606]/40'} />
                </div>
            </form>
        </Form>
    )
}
