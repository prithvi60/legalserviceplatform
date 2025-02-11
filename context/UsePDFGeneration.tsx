import { useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

interface State {
    step: number;
    progress: number;
    formData: Record<string, unknown>;
    isFinished: boolean;
    encryptedContent: string;
    isDecrypted: boolean;
    isDownloading: boolean;
    currentYear: number;
};

interface UsePDFGenerationProps {
    targetRef: React.RefObject<HTMLElement>;
    paymentStatus: string | null;
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GetDocType: { getBusinessForms?: any[] } | undefined;
    storageKey: string;
    url: string;
    fileName: string;
    sessionData: { user?: { email: string } } | null;
}

const generatePDF = async (element: HTMLElement): Promise<Blob | null> => {
    if (!element) {
        console.error('Error: targetRef is null.');
        return null;
    }

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;
    let yOffset = margin;

    const elements = Array.from(element.children);
    const images = await Promise.all(
        elements.map(async (child) => {
            const canvas = await html2canvas(child as HTMLElement, { scale: 1.4 });
            return {
                imgData: canvas.toDataURL('image/jpeg', 0.7),
                imgWidth: pageWidth - 2 * margin,
                imgHeight: (canvas.height * (pageWidth - 2 * margin)) / canvas.width,
            };
        })
    );

    for (const { imgData, imgWidth, imgHeight } of images) {
        if (yOffset + imgHeight > pageHeight - margin) {
            pdf.addPage();
            yOffset = margin;
        }
        pdf.addImage(imgData, 'JPEG', margin, yOffset, imgWidth, imgHeight);
        yOffset += imgHeight + 5;
    }

    return pdf.output('blob');
};

const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1] || '');
            } else {
                reject(new Error('Failed to convert blob to base64'));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};

const sendEmailWithAttachment = async (pdfBase64: string, email: string, pdfName: string): Promise<void> => {
    const response = await fetch('/api/sendEmailWithAttachment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfBlob: pdfBase64, email, pdfName }),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
};

const usePDFGeneration = ({
    targetRef,
    paymentStatus,
    state,
    setState,
    GetDocType,
    storageKey,
    url,
    fileName,
    sessionData,
}: UsePDFGenerationProps): void => {
    useEffect(() => {
        const performDownloadAndSendEmail = async (): Promise<void> => {
            if (paymentStatus !== 'success' || state.isDownloading || !GetDocType?.getBusinessForms?.length) return;

            // Wait for the targetRef element to be available
            const waitForElement = async (): Promise<HTMLElement | null> => {
                let attempts = 0;
                const maxAttempts = 10; // Maximum number of attempts
                const delay = 200; // Delay between attempts in milliseconds

                return new Promise((resolve) => {
                    const checkElement = () => {
                        if (targetRef.current) {
                            resolve(targetRef.current);
                        } else if (attempts < maxAttempts) {
                            attempts++;
                            setTimeout(checkElement, delay);
                        } else {
                            resolve(null); // Element not found after max attempts
                        }
                    };
                    checkElement();
                });
            };

            try {
                const element = await waitForElement();
                if (!element) {
                    console.error('Error: targetRef.current is null after waiting.');
                    return;
                }

                setState((prev) => ({ ...prev, isDecrypted: true }));
                await new Promise((resolve) => setTimeout(resolve, 100)); // Optional delay for decryption
                const pdfBlob = await generatePDF(element);
                if (!pdfBlob) {
                    console.error('Error: PDF generation failed.');
                    return;
                }
                const pdfBase64 = await convertBlobToBase64(pdfBlob);
                await sendEmailWithAttachment(pdfBase64, sessionData?.user?.email || '', fileName);
                toast.success('Mail sent successfully!', {
                    position: 'top-right',
                    duration: 3000,
                    style: { border: '1px solid #65a34e', padding: '16px', color: '#65a34e' },
                    iconTheme: { primary: '#65a34e', secondary: '#FFFAEE' },
                });
                sessionStorage.removeItem(storageKey);
                setState((prev) => ({ ...prev, isDecrypted: false, isDownloading: false }));
                const url = new URL(window.location.href);
                url.searchParams.delete('paymentStatus');
                window.history.replaceState({}, '', url.toString());
                window.location.replace(url);
            } catch (error) {
                console.error('Error generating PDF or sending email:', error);
                setState((prev) => ({ ...prev, isDownloading: false, isDecrypted: false }));
            }
        };

        const timer = setTimeout(performDownloadAndSendEmail, 500);
        return () => clearTimeout(timer);
    }, [paymentStatus, state.isDownloading, GetDocType?.getBusinessForms?.length, storageKey, url, targetRef, fileName, sessionData?.user?.email, setState]);
};

export default usePDFGeneration;