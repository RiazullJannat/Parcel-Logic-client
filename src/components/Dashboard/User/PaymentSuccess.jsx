import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Confetti from 'react-confetti'
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div>
            <Confetti
                className='w-full min-h-full'
            >
            </Confetti>
            <Dialog open={true}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>🎉 Congratulations!</DialogTitle>
                        <DialogDescription>
                            Your payment was successful. Thank you for your purchase!
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="submit"><Link to={'/'}>Go to Home</Link></Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PaymentSuccess;