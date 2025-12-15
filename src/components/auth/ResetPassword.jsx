"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../ui/form";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/api";
import { errorMessage } from "@/lib/utils";

const formSchema = z.object({
  password: z.string().min(2, {
    message: "Please Enter valid Password",
  }),
  re_password: z.string().min(2, {
    message: "Please Re-Type The Password",
  }),
});
function ResetPassword() {
  const searchParam = useSearchParams();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      re_password: "",
    },
  });

  const userId = searchParam.get("userId");
  const otp = searchParam.get("otp");

  // 2. Define a submit handler.
  function onSubmit(values) {
    if (values.password !== values.re_password) {
      toast.error("Password Not Match");
      return;
    }
    api
      .post(`/users/reset-password`, {
        userId,
        otp,
        password: values.password,
      })
      .then((res) => {
        toast.success("Password Reset Successfully");
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, [1000]);
      })
      .catch((err) => {
        errorMessage(err);
      });
    console.log(values);
  }

  if (!userId || !otp) {
    window.location.href = "/forget-password";
  }

  return (
    <Form {...form} className={""}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          placeholder={"Re-Password"}
          name={"re_password"}
          type={"password"}
        />
        <CustomButton
          title={"Reset Password"}
          type={"submit"}
          style={"cusBtn hover:bg-[#F85606]/40"}
        />
      </form>
    </Form>
  );
}

export default ResetPassword;
