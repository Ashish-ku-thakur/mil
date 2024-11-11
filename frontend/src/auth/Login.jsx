import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userLoginSchema } from "@/schema/userSchema"
import { Loader2, LockKeyhole, Mail } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

let Login = () => {
    let [loginFields, setLoginFields] = useState({
        email: "",
        password: ""
    })
    let [loading, setLoader] = useState(false)
    let [errors, setErrors] = useState({})

    let setLoginhandler = (e) => {
        let { name, value } = e.target
        setLoginFields({ ...loginFields, [name]: value })
    }

    let loginFormHandler = (e) => {
        e.preventDefault()

        let result = userLoginSchema.safeParse(loginFields)

        if (!result.success) {
            let fieldError = result.error.formErrors.fieldErrors
            setErrors(fieldError)
            console.log(fieldError);
            return
        } else {
            setErrors("")
        }
        // api start here

    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={loginFormHandler} className="md:P-8 w-full max-w-md rounded-lg md:border border-gray-200 p-3">
                <div className="text-center w-full my-3 font-bold text-2xl uppercase">
                    SastaNasts
                </div>

                {/* email */}
                <div className="relative my-2">
                    <Input value={loginFields.email} onChange={setLoginhandler} name='email' placeholder="Enter your email" type="email" className='pl-8 focus-visible:ring-transparent' />
                    <Mail className="text-gray-400 absolute inset-y-2 ml-2" />
                    {
                        errors && <span className="text-red-500 text-md">{errors?.email}</span>
                    }
                </div>

                {/* password */}
                <div className="relative my-2">
                    <Input value={loginFields.password} onChange={setLoginhandler} name='password' placeholder="Enter your password" type="password" className='pl-8 focus-visible:ring-transparent' />
                    <LockKeyhole className="text-gray-400 absolute inset-y-2 ml-2" />
                    {
                        errors && <span className="text-red-500 text-md">{errors?.password}</span>
                    }
                </div>

                {
                    loading ? (<Button disabled type='submit' className='bg-grn hover:bg-hovergrn w-full my-2'>
                        <Loader2 className="h-4 w-4 animate-spin" />Please wait
                    </Button>) : (<Button type='submit' className='bg-grn hover:bg-hovergrn w-full my-2'>
                        Login
                    </Button>)
                }
                <div className="text-center w-full">
                    <Link to={"/forgot-password"} className="text-blue-600 my-3 ">
                        Forgot Password
                    </Link>
                </div>


                <hr className="my-3" />

                <div className="my-2 text-center">
                    Dont have an account? please <Link to={"/signup"} className="text-blue-500 cursor-pointer ">Signup</Link>
                </div>
            </form>
        </div>
    )
}

export default Login