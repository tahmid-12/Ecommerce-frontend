'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import CustomInput from "../CustomInput"
import CustomButton from "../CustomButton"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"




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

export default function EditAddressForm({isEdit}) {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            mobileNumber: "",
            email: "",
            city: "",
            area: "",
            address: "",
            landmark: "",
            city: "",
            city: "",
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                <div className="flex gap-5 justify-between w-[90%] mx-auto">
                    <div className="space-y-2 w-1/2">
                        <CustomInput style={'input'} form={form} placeholder={'full Name'} name={'fullName'} type={'text'} isLabel={true} isMessage={true} />
                        <CustomInput style={'input'} form={form} placeholder={'Mobile Number'} name={'mobileNumber'} type={'text'} isLabel={true} isMessage={true} />
                        <CustomInput style={'input'} form={form} placeholder={'Email'} name={'email'} type={'email'} isLabel={true} isMessage={true} />
                        <CustomInput style={'input'} form={form} placeholder={'City'} name={'city'} type={'text'} isLabel={true} isMessage={true} />
                        <CustomInput style={'input'} form={form} placeholder={'Area'} name={'area'} type={'text'} isLabel={true} isMessage={true} />
                    </div>

                    <div className="space-y-2 w-1/2">
                        <CustomInput style={'input'} form={form} placeholder={'Address'} name={'address'} type={'text'} isLabel={true} isMessage={true} />
                        <CustomInput style={'input'} form={form} placeholder={'Landmark(optional)'} name={'landmark'} type={'text'} isLabel={true} isMessage={true} />
                        <div >
                            <FormLabel className='text-md'>Select a label for effective delivery</FormLabel>
                            <div className="flex gap-5">
                                <CustomInput style={'input'} form={form} placeholder={'Address'} name={'Address'} type={'text'} isMessage={true} />
                                <CustomInput style={'input'} form={form} placeholder={'Landmark(optional)'} name={'landmark'} type={'text'} isMessage={true} />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Notify me about...</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="all" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    All new messages
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="mentions" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Direct messages and mentions
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="none" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Nothing</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className=" flex justify-end">
                    <div className="w-[20%]">

                        <CustomButton title={"Save"} type={'submit'} style={'cusBtn hover:bg-[#F85606]/40 '} />
                    </div>
                </div>
            </form>
        </Form>
    )
}
