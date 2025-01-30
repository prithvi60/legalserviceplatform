import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input'
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
                <div className='space-y-16 w-full md:w-1/2'>
                    <Input
                        isRequired
                        labelPlacement="outside"
                        label="Full Name"
                        // errorMessage="Please enter a valid email"
                        placeholder="XXX XXX XXX"
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
                    />
                    <Input
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
                    />
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
                                <p className="text-sm md:text-base font-Lorin opacity-60">
                                    1 month ago
                                </p>
                            </div>
                        </div>
                        <Button className="font-Archivo  text-primary font-medium bg-[#1E318D] bg-opacity-10" size="lg">
                            {"+  Add Email Address"}
                        </Button>
                    </div>
                </div>
                <div className='w-full md:w-1/2 text-left md:text-right'>
                    <Button size='lg' radius='md' color='warning' className='text-black font-bold'>
                        Edit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProfileEditForm
