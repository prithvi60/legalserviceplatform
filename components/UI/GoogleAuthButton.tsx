import { Button } from "@heroui/button"
// import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

export default function GoogleAuthButton() {
    return (
        <form
            // action={async () => {
            //     "use server"
            //     await signIn("google")
            // }}
            className="w-full mx-auto"
        >
            <Button size="lg" color="primary" type="submit" className="" variant="bordered" startContent={<FcGoogle className="text-xl" />
            }>
                Sign in to Gmail
            </Button>
        </form>
    )
} 