"use client";
import { api } from "@/api";
import { VerifyOtp } from "@/app/sign-up/components/otp";
import { errorMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { Form } from "../ui/form";
import { PasswordInput } from "../ui/password-input";
import SubTitle from "./SubTitle";
import ThirdPartyAuth from "./ThirdPartyAuth";
import Title from "./Title";
import { useAuth } from "@/auth";

const identitySchema = z
  .string()
  .regex(/^(?:\d{11,}|[^@\s]+@[^@\s]+\.[^@\s]+)$/, {
    message: "Enter a valid email or mobile number",
  });
const formSchema = z.object({
  identifier: identitySchema,
  password: z.string().min(2, {
    message: "Please Enter valid Password",
  }),
  keepSignIn: z.boolean().default(false).optional(),
});

export default function SignIn({ setLoading }) {
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(true);
  const [response, setResponse] = useState(null);
  const { login } = useAuth();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
      keepSignIn: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    setLoading(true);
    api
      .post("/users/login", {
        identity: values.identifier,
        password: values.password,
      })
      .then((res) => {
        if (res.data?.user?.role !== "seller")
          if (res.data?.user?.isVerified) {
            login(res.data.accessToken, res.data.user);
          } else {
            setVerified(false);
            setResponse(res.data);
          }
        else toast.error("Please try to use seller login");
      })
      .catch((err) => {
        errorMessage(err);
        setLoading(true);
      })
      .finally(setIsLoading(false));
  }

  if (!verified) {
    return (
      <VerifyOtp
        userId={response?.user?.id}
        setResponse={setResponse}
        title="Verify Your Darkak Account"
      />
    );
  }

  return (
    <section className="pb-10 pt-5">
      <div className="w-full max-w-md mx-auto">
        <Title title={"Sign In"} />
        <SubTitle
          subTitle={
            "Welcom to Darkak. Please login to your account to continue"
          }
        />
      </div>
      <div className="w-full max-w-md mx-auto">
        <Form {...form} className={""}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CustomInput
              style={"input"}
              form={form}
              placeholder={"E-mail Or Phone"}
              name={"identifier"}
              type={"text"}
            />
            <PasswordInput
              control={form.control}
              placeholder={"Password"}
              name={"password"}
              type={"password"}
              className="input"
            />
            <div className="flex items-center justify-between">
              <CustomInput
                form={form}
                name={"keepSignIn"}
                placeholder={"Keep me signed in"}
                isCheckBox={true}
              />
              <Link
                href={"/forget-password"}
                className="text-md text-primary pt-[8px] w-full text-end"
              >
                Forget Password?
              </Link>
            </div>
            <CustomButton
              title={"Sign In"}
              type={"submit"}
              style={"cusBtn hover:bg-[#F85606]/40"}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </form>
        </Form>
        <div className="flex items-center gap-5 py-5">
          <hr className="h-1 bg-gray-300 w-full rounded-full" />
          <span className="text-md text-gray-500 pt-[6px]">or</span>
          <hr className="h-1 bg-gray-300 w-full rounded-full" />
        </div>
        <ThirdPartyAuth />
        <div className="text-md py-5 text-center">
          <p>
            Not a member yet?{" "}
            <span className="text-primary">
              <Link href={"/sign-up"}>Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
