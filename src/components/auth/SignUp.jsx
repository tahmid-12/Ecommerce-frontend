"use client";

import { VerifyOtp } from "@/app/sign-up/components/otp";
import { apiUrl } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import * as z from "zod";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { Form } from "../ui/form";
import Title from "./Title";
import Link from 'next/link'

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().min(11, {
    message: "Phone must be at least 11 characters.",
  }),
  email: z.string(),
  password: z.string().min(2, {
    message: "Please Enter valid Password",
  }),
  keepSignIn: z.boolean().default(false).optional(),
});


export default function SignUp() {
  // Checking If User Is Verified
  const [userRegistered, setUserRegistered] = useState({
    userId: "",
    otpSend: false,
  });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      keepSignIn: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    axios.post(`${apiUrl}/users`, {
      name: values.firstName + " " + values.lastName,
      mobile: values.phone,
      password: values.password,
      email: values.email
    }).then(res => {
      if (res.data) {
        setUserRegistered({
          userId: res.data.user.id,
          otpSend: res.data.otpSend,
        });
      }
    }).catch(err => {
      toast.error(err?.response?.data?.message)
    })

  }


  if (userRegistered.otpSend && userRegistered.userId) {
    return <VerifyOtp userId={userRegistered.userId} title="Verify your Darakak Account" />
  }
  return (
    <div>
      <div className='w-[70%] mx-auto'>
        <Title title={'Create an account and discover the benefits'} />
      </div>

      <Form {...form} className={""}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CustomInput
            style={"input"}
            form={form}
            placeholder={"First Name "}
            name={"firstName"}
            type={"text"}
          />
          <CustomInput
            style={"input"}
            form={form}
            placeholder={"Last Name "}
            name={"lastName"}
            type={"text"}
          />
          <CustomInput
            style={"input"}
            form={form}
            placeholder={"phone"}
            name={"phone"}
            type={"text"}
          />
          <CustomInput
            style={"input"}
            form={form}
            placeholder={"E-mail "}
            name={"email"}
            type={"text"}
          />
          <CustomInput
            style={"input"}
            form={form}
            placeholder={"Password"}
            name={"password"}
            type={"password"}
          />
          <CustomInput
            style={"input"}
            form={form}
            name={"keepSignIn"}
            placeholder={
              "I agree to The Google Terms of Service and Privacy Policy"
            }
            isCheckBox={true}
          />
          <CustomButton
            title={"Sign Up"}
            type={"submit"}
            style={"cusBtn hover:bg-[#F85606]/40"}
          />
        </form>
      </Form>
      <div className='text-md py-5 text-center'>
        <p>Are you already a member? <span className='text-primary'><Link href={'/sign-in'}>Sign In</Link></span></p>
      </div>
    </div>
  );
}
