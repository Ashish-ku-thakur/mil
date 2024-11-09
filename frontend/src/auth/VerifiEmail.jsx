import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifiEmail = () => {
  const [value, setValue] = useState("");

  let navigate = useNavigate();
  let submitHandler = (e) => {
    e.preventDefault();
    console.log(value);

    // after api imp
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-3 border border-gray-200">
        <div className="text-center">
          <h1 className="font-bold text-2xl my-2">Verify Email</h1>
          <p className="text-md text-gray-700">
            Enter the 6 Digital Code sent to your email Address
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="w-full items-center text-center flex justify-center my-5">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button className="w-full" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifiEmail;
