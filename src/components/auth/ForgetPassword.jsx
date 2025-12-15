"use client";

import { api } from "@/api";
import { VerifyOtp } from "@/app/sign-up/components/otp";
import { errorMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { Form } from "../ui/form";
import SubTitle from "./SubTitle";
import Title from "./Title";
const identitySchema = z
  .string()
  .regex(/^(?:\d{11,}|[^@\s]+@[^@\s]+\.[^@\s]+)$/, {
    message: "Please enter a valid Email or Mobile number",
  });
export const formSchema = z.object({
  identity: identitySchema,
});

export default function ForgetPassword() {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identity: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    setIsLoading(true);
    api
      .post(`/users/forget-password`, values)
      .then((res) => {
        setUserId(res.data.userId);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          err.response.data.message = "Try a different, email or mobile";
          errorMessage(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  if (userId?.length) {
    return (
      <VerifyOtp
        userId={userId}
        endpoint="/users/forget-password/otp-verify"
        redirectTo={`/reset-password?userId=${userId}&otp=${response?.otp}`}
        resendEndpoint="/users/forget-password/resend-otp"
        setResponse={setResponse}
        title="Enter your reset password OTP"
      />
    );
  }
  return (
    <Form {...form} className={""}>
      <div className="w-[80%] mx-auto">
        <Title title={"Forgot your password?"} />
        <SubTitle
          subTitle={"Enter your email or phone number and recover your account"}
        />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomInput
          style={"input"}
          form={form}
          placeholder={"E-mail Or Phone"}
          name={"identity"}
          type={"text"}
        />

        <CustomButton
          title={"Forget Password"}
          type={"submit"}
          style={"cusBtn"}
          disabled={isLoading}
        />
      </form>
    </Form>
  );
}
