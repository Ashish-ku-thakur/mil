import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, LockKeyhole, Mail } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const ResetPassword = () => {
    let [newPassword, setNewPassword] = useState("")
    let [loading, setLoader] = useState(false)
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <form className="flex flex-col gap-4 w-full max-w-md rounded-lg mx-4">
                <div className="text-center ">
                    <h1 className="font-bold text-2xl my-2">Reset Password</h1>
                    <p className="text-gray-600"> Enter Your New Password to reset old one</p>
                </div>

                <div className="relative my-2">
                    <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} name='newPassword' placeholder="Enter your new password" type="text" className='pl-8 focus-visible:ring-transparent' />
                    <LockKeyhole className="text-gray-400 absolute inset-y-2 ml-2"/>
                </div>

                {
                    loading ? (<Button disabled type='submit' className='bg-grn hover:bg-hovergrn w-full my-2'>
                        <Loader2 className="h-4 w-4 animate-spin" />Please wait
                    </Button>) : (<Button type='submit' className='bg-grn hover:bg-hovergrn w-full my-2'>
                        Reset
                    </Button>)
                }

                <span className="text-center">
                    Back to <Link to={"/login"} className="text-blue-500">Login</Link>
                </span>
            </form>
        </div>
    )
}

export default ResetPassword