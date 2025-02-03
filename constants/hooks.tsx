import { FormData2 } from "@/types/Types";
import { useState } from "react";
const STORAGE_KEY = "nda-form-data";
const initialFormData: FormData2 = {
    agreementDay: "",
    agreementMonth: "",
    receivingPartyName: "",
    receivingPartyAddress: "",
    receivingPartyRegisteredOffice: "",
    receivingPartyPosition: "",
    disclosingPartyCompanyName: "",
    disclosingPartyRepName: "",
    disclosingPartyPosition: "",
    disclosingPartyRegisteredOffice: "",
};
// Custom hooks for form state management
export const useFormState = () => {
    const [formData, setFormData] = useState<FormData2>(() => {
        const storageData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
        return storageData?.formData || initialFormData;
    });

    const [step, setStep] = useState<number>(() => {
        const storageData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
        return storageData?.step || 1;
    });

    const [progress, setProgress] = useState<number>(() => {
        const storageData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
        return storageData?.progress || 0;
    });

    return { formData, setFormData, step, setStep, progress, setProgress };
};
