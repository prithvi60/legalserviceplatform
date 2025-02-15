"use client";

import { Loader } from "@/components/UI/Loader";
import { Button } from "@heroui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const ExpertContactForm = () => {
    const initialFormData = {
        firstName: "",
        lastName: "",
        phoneNo: "",
        userEmail: "",
        clientEmail: "",
        subject: "",
        message: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const [status, setStatus] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev: typeof initialFormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(true);
        const emailFormData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            userEmail: formData.userEmail,
            phone: formData.phoneNo,
            clientEmail: "prithvi@webibee.com",
            subject: `New Form Submission - Customer Enquiry`,
            message: formData.message,
            type: "Talk to Advocate",
        };

        try {
            const response = await fetch("/api/sendMail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailFormData),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Error: ${response.status} ${errorData}`);
            }

            const data = await response.json();

            if (data.success) {
                setStatus(false);
                toast.success("Thank you. We will revert back shortly!", {
                    position: "top-right",
                    duration: 3000,
                    style: {
                        border: "1px solid #65a34e",
                        padding: "16px",
                        color: "#65a34e",
                    },
                    iconTheme: {
                        primary: "#65a34e",
                        secondary: "#FFFAEE",
                    },
                });
                setFormData(initialFormData);
                (e.target as HTMLFormElement).reset();
            }
        } catch (error) {
            console.error("Error sending emails:", error);
            setStatus(false);
            toast.error("We are unable to receive your details. Please try again.", {
                position: "top-right",
                duration: 3000,
                style: {
                    border: "1px solid #EB1C23",
                    padding: "16px",
                    color: "#EB1C23",
                },
                iconTheme: {
                    primary: "#EB1C23",
                    secondary: "#FFFAEE",
                },
            });
        }
    };

    return (
        <section className="p-5 bg-white font-merriWeather rounded-md">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-col-1 lg:grid-cols-2 gap-3">
                    {/* First Name */}
                    <div className="mb-4">
                        <label className="mb-2.5 block capitalize font-Archivo">
                            First Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName || ""}
                                onChange={handleChange}
                                required
                                placeholder="Enter your first name"
                                className="w-full py-2 pl-6 pr-10 bg-transparent border outline-none border-stroke rounded-lg placeholder:text-slate-600 placeholder:text-lg focus:border-secondary focus-visible:shadow-none"
                            />
                        </div>
                    </div>
                    {/* Last Name */}
                    <div className="mb-4">
                        <label className="mb-2.5 block  capitalize font-Archivo">
                            Last Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName || ""}
                                onChange={handleChange}
                                required
                                placeholder="Enter your last name"
                                className="w-full py-2 pl-6 pr-10  bg-transparent border outline-none border-stroke rounded-lg placeholder:text-slate-600 placeholder:text-lg focus:border-secondary focus-visible:shadow-none"
                            />
                        </div>
                    </div>
                </div>
                {/* Email */}
                <div className="mb-4">
                    <label className="mb-2.5 block capitalize font-Archivo">Email</label>
                    <div className="relative">
                        <input
                            type="email"
                            name="userEmail"
                            value={formData.userEmail || ""}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email ID"
                            className="w-full py-2 pl-6 pr-10  bg-transparent border outline-none border-stroke rounded-lg placeholder:text-slate-600 placeholder:text-lg focus:border-secondary focus-visible:shadow-none"
                        />
                    </div>
                </div>
                {/* phone no. */}
                <div className="mb-4">
                    <label className="mb-2.5 block  capitalize font-Archivo">
                        Phone Number
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="phoneNo"
                            value={formData.phoneNo || ""}
                            onChange={handleChange}
                            required
                            placeholder="Enter your phone no."
                            className="w-full py-2 pl-6 pr-10  bg-transparent border outline-none border-stroke rounded-lg placeholder:text-slate-600 placeholder:text-lg focus:border-secondary focus-visible:shadow-none"
                        />
                    </div>
                </div>
                {/* Message */}
                <div className="mb-6">
                    <label className="mb-2.5 block  capitalize font-Archivo">
                        Problem type
                    </label>
                    <div className="relative">
                        <textarea
                            name="message"
                            value={formData.message || ""}
                            onChange={handleChange}
                            required
                            placeholder="Write your message..."
                            rows={3}
                            className="w-full py-2 pl-6 pr-10  bg-transparent border outline-none border-stroke rounded-lg placeholder:text-slate-600 placeholder:text-lg focus:border-secondary focus-visible:shadow-none"
                        />
                    </div>
                </div>
                {/* Submit */}
                <div className="w-full flex justify-end items-center mb-5 text-center">
                    <Button
                        radius="sm"
                        size="lg"
                        color="warning"
                        type="submit"
                        className="w-full font-semibold"
                        disabled={status ? true : false}
                    >
                        {status ? <Loader /> : "Consult now"}
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default ExpertContactForm;
