// "use client";
// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/router';

// const AutoSaveForm = () => {
//     const router = useRouter();
//     const [progress, setProgress] = useState<number>(() => {
//         if (typeof window !== "undefined") {
//             const existingData = sessionStorage.getItem(STORAGE_KEY);
//             const currentData = JSON.parse(existingData || "{}");
//             return currentData.progress || 0;
//         }
//         return 0;
//     });

//     const lastSaveTimeRef = useRef<number>(Date.now());
//     const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//     const handleFormSubmission = useCallback(async (currentData: any) => {
//         if (!userId || !currentData?.formData) {
//             console.error("Required data is missing for auto-save");
//             return;
//         }

//         try {
//             const existingForm = RoleBased?.getUser?.BusinessForms?.find(
//                 (form) => form.DocType === input.DocType
//             );

//             if (existingForm) {
//                 await updateBusinessForm({
//                     variables: {
//                         input: {
//                             userId: input.userId,
//                             DocType: input.DocType,
//                             DocNumber: existingForm.DocNumber,
//                             formData: input.formData,
//                         },
//                     },
//                 });
//                 console.log("Auto-saved: Form updated");
//             } else {
//                 await createBusinessForm({
//                     variables: {
//                         input: {
//                             ...input,
//                             DocNumber: 1,
//                         },
//                     },
//                 });
//                 console.log("Auto-saved: Form created");
//             }
//             lastSaveTimeRef.current = Date.now();
//         } catch (error) {
//             console.error("Error during auto-save:", error);
//         }
//     }, [userId, input, RoleBased, updateBusinessForm, createBusinessForm]);

//     // Handle auto-save after 1 minute of inactivity
//     useEffect(() => {
//         if (progress > 0) {
//             if (autoSaveTimeoutRef.current) {
//                 clearTimeout(autoSaveTimeoutRef.current);
//             }

//             autoSaveTimeoutRef.current = setTimeout(() => {
//                 const existingData = sessionStorage.getItem(STORAGE_KEY);
//                 const currentData = JSON.parse(existingData || "{}");
//                 handleFormSubmission(currentData);
//             }, 60000); // 1 minute

//             return () => {
//                 if (autoSaveTimeoutRef.current) {
//                     clearTimeout(autoSaveTimeoutRef.current);
//                 }
//             };
//         }
//     }, [progress, handleFormSubmission]);

//     // Handle tab close and route change
//     useEffect(() => {
//         const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//             if (progress > 0) {
//                 const existingData = sessionStorage.getItem(STORAGE_KEY);
//                 const currentData = JSON.parse(existingData || "{}");
//                 handleFormSubmission(currentData);
//             }
//         };

//         const handleRouteChange = () => {
//             if (progress > 0) {
//                 const existingData = sessionStorage.getItem(STORAGE_KEY);
//                 const currentData = JSON.parse(existingData || "{}");
//                 handleFormSubmission(currentData);
//             }
//         };

//         window.addEventListener('beforeunload', handleBeforeUnload);
//         router.events.on('routeChangeStart', handleRouteChange);

//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//             router.events.off('routeChangeStart', handleRouteChange);
//         };
//     }, [progress, handleFormSubmission, router]);

//     // Original handleFinishClick function remains the same
//     const handleFinishClick = async (): Promise<void> => {
//         if (!userId || !currentData?.formData) {
//             alert("Required data is missing. Please check the form and try again.");
//             return;
//         }

//         try {
//             const existingForm = RoleBased?.getUser?.BusinessForms?.find(
//                 (form) => form.DocType === input.DocType
//             );

//             if (existingForm) {
//                 const { data } = await updateBusinessForm({
//                     variables: {
//                         input: {
//                             userId: input.userId,
//                             DocType: input.DocType,
//                             DocNumber: existingForm.DocNumber,
//                             formData: input.formData,
//                         },
//                     },
//                 });
//                 if (data) {
//                     console.log("Business Form Updated:", data);
//                     alert("Form updated successfully!");
//                     setIsFinished(true);
//                 } else {
//                     console.error("No data returned from update mutation.");
//                     alert("An error occurred while updating the form. Please try again.");
//                 }
//             } else {
//                 const { data } = await createBusinessForm({
//                     variables: {
//                         input: {
//                             ...input,
//                             DocNumber: 1,
//                         },
//                     },
//                 });
//                 if (data) {
//                     console.log("Business Form Created:", data);
//                     alert("Form submitted successfully!");
//                     setIsFinished(true);
//                 } else {
//                     console.error("No data returned from create mutation.");
//                     alert("An error occurred while submitting the form. Please try again.");
//                 }
//             }
//         } catch (error) {
//             console.error("Error handling form submission:", error);
//             alert("Failed to submit the form. Please check your internet connection and reload or try again later.");
//         }
//     };

//     return {
//         progress,
//         setProgress,
//         handleFinishClick
//     };
// };

// export default AutoSaveForm;