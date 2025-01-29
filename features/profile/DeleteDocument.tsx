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
        refetchQueries: [
            {
                query: GET_BUSINESS_FORMS,
                variables: { userId, DocType: docType, orderBy: { DocNumber: "desc" } },
            },
        ],
        awaitRefetchQueries: true,
        onError: (error) => {
            console.error("Delete mutation error:", error);
        },
    });

    const handleDelete = async () => {
        if (!docId || !userId) {
            alert("Missing document or user data.");
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
                alert("Form deleted successfully!");
                // Redirect to the URL
                if (status === "IsPending") {
                    window.location.replace(url);
                }
            } else {
                console.error("Failed to delete business form");
                alert("Form deletion failed!");
            }
        } catch (error) {
            console.error("Error deleting form:", error);
            alert("Error occurred while deleting the form.");
        }
    };

    // if (userLoading || deleteLoading) {
    //     return <p>Loading...</p>; // Show loading indicator while queries/mutations are in progress
    // }

    return (
        <Button
            radius="md"
            size="md"
            color={status === "IsPending" ? "primary" : "warning"}
            variant={status === "IsPending" ? "flat" : "bordered"}
            className={`${status === "IsPending" ? "text-primary" : "text-warning"} font-medium`}
            onClick={handleDelete}
        >
            Discard
        </Button>
    );
};
