"use client";

import { api } from "@/api";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OtpInput from "react-otp-input";

export const VerifyOtp = ({
  userId,
  redirectTo = "/sign-in",
  endpoint = "/users/otp-verify",
  resendEndpoint = "/users/resend-otp",
  setResponse = null,
  title = "Verify Your Mobile Number",
}) => {
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(120); // Timer starts from 120 seconds (2 minutes)
  const [canResend, setCanResend] = useState(false);

  // Navigation

  const verifyUserOtp = useCallback(
    (otp, userId) => {
      api
        .post(endpoint, {
          otp,
          userId,
        })
        .then((response) => {
          if (typeof setResponse === "function") {
            setResponse(response.data);
          }
          setOtpVerified(true);
        })
        .catch((err) => {
          toast.error(err?.reponse?.data?.message);
        });
    },
    [endpoint, setResponse]
  );

  // Submitting for verification
  useEffect(() => {
    if (otp.length === 6 && userId) {
      verifyUserOtp(otp, userId);
    }
  }, [otp, userId, verifyUserOtp]);

  // OTP Verification and Redirect
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!otpVerified) {
        event.preventDefault();
        event.returnValue = ""; // This line is for older browsers
      }
    };

    if (otpVerified) {
      window.location.href = redirectTo;
    } else {
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Clean up the event listener
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [otpVerified, redirectTo]);

  // Resend

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true); // Enable resend button after 2 minutes
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  // Handling Resend Token

  const handleResendClick = () => {
    api
      .post(resendEndpoint, {
        userId,
      })
      .then((res) => {
        setTimer(120);
        setCanResend(false);
      })
      .catch((err) => {
        toast.error("Something went wrong, Please try again later");
      });
  };

  return (
    <div className="w-full flex py-8 flex-col justify-center items-center space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <OtpInput
        shouldAutoFocus
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span className="mx-2">-</span>}
        renderInput={(props) => <Input {...props} />}
        inputStyle="h-14 min-w-[48px] border-2 border-gray-300 rounded-md text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <div>
        {canResend ? (
          <button
            className="bg-primary text-white text-xl font-semibold flex items-center justify-center hover:bg-gray-600 rounded-md px-4 py-2"
            onClick={handleResendClick}
          >
            <span>Resend OTP</span>
          </button>
        ) : (
          <span className="text-xl font-semibold">
            Resend in{" "}
            <span className="text-primary">
              {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
              {timer % 60}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};
