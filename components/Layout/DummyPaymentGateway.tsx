import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { Loader } from '../UI/Loader';

interface DummyPaymentGatewayProps {
    amount: number;
    onSuccess: () => void;
    onCancel: () => void;
}

interface PaymentFormData {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

const DummyPaymentGateway: React.FC<DummyPaymentGatewayProps> = ({
    amount,
    onSuccess,
    onCancel
}) => {
    const [formData, setFormData] = useState<PaymentFormData>({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isComplete, setIsComplete] = useState<boolean>(false);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        field: keyof PaymentFormData
    ): void => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setIsComplete(true);

        // Simulate a slight delay before callback
        setTimeout(() => {
            onSuccess();
        }, 1000);
    };

    if (isComplete) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <Card className="w-full max-w-md mx-4">
                    <CardBody className="text-center py-8">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="w-16 h-16 text-green-500" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-4">Your download will begin automatically</p>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
                <CardHeader className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Secure Payment</h2>
                    <CreditCard className="w-6 h-6" />
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">Amount to pay</p>
                            <p className="text-2xl font-semibold">${amount.toFixed(2)}</p>
                        </div>
                        <Input
                            label="Card Number"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange(e, 'cardNumber')}
                            required
                            maxLength={19}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Expiry Date"
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange(e, 'expiryDate')}
                                required
                                maxLength={5}
                            />
                            <Input
                                label="CVV"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={(e) => handleInputChange(e, 'cvv')}
                                required
                                maxLength={3}
                                type="password"
                            />
                        </div>
                    </form>
                </CardBody>
                <CardFooter className="flex justify-between">
                    <Button
                        variant="bordered"
                        onPress={onCancel}
                        disabled={isProcessing}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={(e) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>)}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <Loader />
                        ) : (
                            `Pay $${amount.toFixed(2)}`
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default DummyPaymentGateway;