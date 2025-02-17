"use client";
import {
    DELETE_BUSINESS_FORM,
    GET_BUSINESS_FORMS,
    GET_USER,
} from "@/constants/Queries";
import { GetUserResponse } from "@/types/Types";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@heroui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export const DeleteDocument = ({
    docId,
    docType,
    status,
    url,
}: {
    docId: number;
    docType: string;
    status: string;
    url: string;
}) => {
    const { data: sessionData } = useSession();

    // Query to get the user's role based on email
    const { data: RoleBased } = useQuery<GetUserResponse>(GET_USER, {
        variables: { email: sessionData?.user?.email },
        skip: !sessionData?.user?.email,
    });

    // Get userId from fetched data
    const userId = RoleBased?.getUser?.id;

    // Mutation for deleting the business form
    const [deleteBusinessForm] = useMutation(DELETE_BUSINESS_FORM, {
        refetchQueries: [{ query: GET_BUSINESS_FORMS, variables: { userId, DocType: docType } }],
    });

    const handleDelete = async () => {
        if (!docId || !userId) {
            toast.error(
                "Missing document or user data.",
                {
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
                }
            );
            return;
        }

        try {
            const response = await deleteBusinessForm({
                variables: {
                    input: {
                        userId: userId,
                        DocType: docType,
                        DocNumber: docId,
                    },
                },
            });

            if (response?.data?.deleteBusinessForm) {
                toast.success("Document Deleted successfully!", {
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
                // Redirect to the URL
                if (status === "IsPending") {
                    window.location.replace(url);
                }
            } else {
                console.error("Failed to delete business form");
            }
        } catch (error) {
            console.error("Error deleting form:", error);
        }
    };

    return (
        <Button
            radius="md"
            size="md"
            color={status === "IsPending" ? "primary" : "success"}
            variant={status === "IsPending" ? "flat" : "bordered"}
            className={`${status === "IsPending" ? "text-primary" : "text-success"} font-medium`}
            onClick={handleDelete}
        >
            Discard
        </Button>
    );
};
