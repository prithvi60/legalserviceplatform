import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { FaEnvelope } from 'react-icons/fa';


const ProfileEditForm = () => {
    // const [submitted, setSubmitted] = useState<FormDataType>(null);

    // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const formData = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    //     if (formData.email) {
    //         setSubmitted({ email: formData.email });
    //     }
    // };
    return (
        <div className="w-full space-y-6 md:space-y-12">
            <form className="w-full flex flex-col md:flex-row gap-10 md:gap-0 md:justify-between font-Lorin">
                <div className='space-y-8 w-full md:w-1/2'>
                    {/* First Name */}
                    <div className="mb-4">
                        <label className="mb-2.5 block capitalize font-Archivo">
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="fullName"
                                // value={formData.fullName || ""}
                                // onChange={handleChange}
                                required
                                placeholder="XXX XXX XXX"
                                className="w-full py-2 pl-6 pr-10 bg-transparent border outline-none border-stroke rounded-lg placeholder:text-slate-600 placeholder:text-lg focus:border-secondary focus-visible:shadow-none"
                            />
                        </div>
                    </div>
                    {/* Phone No. */}
                    <div className="mb-4">
                        <label className="mb-2.5 block capitalize font-Archivo">
                            Phone Number
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="phoneNo"
                                // value={formData.phoneNo || ""}
                                // onChange={handleChange}
                                required
                                placeholder="777-888-9012"
                                className="w-full py-2 pl-6 pr-10 bg-transparent border outline-none border-stroke rounded-lg placeholder:text-slate-600 placeholder:text-lg focus:border-secondary focus-visible:shadow-none"
                            />
                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className="flex items-center gap-5">
                            <Avatar
                                className="w-10 h-10"
                                classNames={{
                                    base: "bg-[#1E318D] bg-opacity-10",
                                    icon: "text-black/80",
                                }}
                                icon={<FaEnvelope className="text-lg text-primary" />}
                            />
                            <div className="block space-y-0.5">
                                <h5 className="font-Lorin font-normal tracking-wider text-base">
                                    Free Plan
                                </h5>
                                <p className="text-lg md:text-xl font-Lorin opacity-60">
                                    1 month ago
                                </p>
                            </div>
                        </div>
                        <Button className="font-Archivo  text-primary font-medium bg-success" size="lg">
                            {"+  Add Email Address"}
                        </Button>
                    </div>
                </div>
                <div className='w-full md:w-1/2 text-left md:text-right'>
                    <Button size='lg' radius='md' color='success' className='text-black font-bold'>
                        Edit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProfileEditForm


{/* <Input
isRequired
labelPlacement="outside"
label="Phone Number"
// errorMessage="Please enter a valid email"
placeholder="777-888-9012"
type="text"
name="fullName"
classNames={{
    input: "placeholder:!text-gray/60",
    label: "text-black",
    // innerWrapper: "bg-[#F2F1F1]",
    inputWrapper: "!bg-[#F2F1F1] !cursor-text",
    helperWrapper: "!text-[#f26161]",
    errorMessage: "!text-[#f26161]"
}}
className="rounded-md"
/> */}