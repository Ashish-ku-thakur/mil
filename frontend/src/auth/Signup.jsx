import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userSignupSchema } from "@/schema/userSchema";
import { useUserdata } from "@/store/useUserdata";
import { Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  let [signupFields, setSignupFields] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  let [errors, setErrors] = useState({});
  let { loading, signup } = useUserdata();
  let navigate = useNavigate();

  let setLoginhandler = (e) => {
    let { name, value } = e.target;
    setSignupFields({ ...signupFields, [name]: value });
  };
  let loginFormHandler = async (e) => {
    e.preventDefault();
    // form validation start
    let result = userSignupSchema.safeParse(signupFields);

    if (!result.success) {
      let fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError);
      console.log(fieldError);
      return;
    } else {
      setErrors("");
      await signup(signupFields);
      //   navigate("/verifi-email")
    }

    // api start here
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginFormHandler}
        className="md:P-8 w-full max-w-md rounded-lg md:border border-gray-200 p-3"
      >
        <div className="text-center w-full my-3 font-bold text-2xl uppercase">
          SastaNasts
        </div>

        {/* fullname */}
        <div className="relative my-3">
          <Input
            value={signupFields.fullname}
            onChange={setLoginhandler}
            name="fullname"
            placeholder="Enter your fullname"
            type="text"
            className="pl-8 focus-visible:ring-transparent"
          />
          <User className="text-gray-400 absolute inset-y-2 ml-2" />
          {errors && (
            <span className="text-red-500 text-md">{errors?.fullname}</span>
          )}
        </div>

        {/* email */}
        <div className="relative my-3">
          <Input
            value={signupFields.email}
            onChange={setLoginhandler}
            name="email"
            placeholder="Enter your email"
            type="email"
            className="pl-8 focus-visible:ring-transparent"
          />
          <Mail className="text-gray-400 absolute inset-y-2 ml-2" />
          {errors && (
            <span className="text-red-500 text-md">{errors?.email}</span>
          )}
        </div>

        {/* password */}
        <div className="relative my-3">
          <Input
            value={signupFields.password}
            onChange={setLoginhandler}
            name="password"
            placeholder="Enter your password"
            type="password"
            className="pl-8 focus-visible:ring-transparent"
          />
          <LockKeyhole className="text-gray-400 absolute inset-y-2 ml-2" />
          {errors && (
            <span className="text-red-500 text-md">{errors?.password}</span>
          )}
        </div>

        {/* contect */}
        <div className="relative my-3">
          <Input
            value={signupFields.contact}
            onChange={setLoginhandler}
            name="contact"
            placeholder="Enter your contact"
            type="text"
            className="pl-8 focus-visible:ring-transparent"
          />
          <Phone className="text-gray-400 absolute inset-y-2 ml-2" />
          {errors && (
            <span className="text-red-500 text-md">{errors?.contact}</span>
          )}
        </div>

        {loading ? (
          <Button
            disabled
            type="submit"
            className="bg-grn hover:bg-hovergrn w-full my-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-grn hover:bg-hovergrn w-full my-2"
          >
            {/* <Link to={"/verifi-email"}>Signup</Link> */}
            Signup
          </Button>
        )}

        <hr className="my-3" />

        <div className="my-2 text-center">
          Already have an account? please{" "}
          <Link to={"/login"} className="text-blue-500 cursor-pointer ">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
