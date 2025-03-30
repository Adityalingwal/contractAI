import { contractAiError } from '../../error/contractAiError';
import { fetchCompletedGigsForPayment, updateGigPaymentStatus } from '../../db/dao/gigs/gigsDao';
import { sendPayment } from '../payman-service/paymanService';

export async function getCompletedGigsForPayment() {
  try {
    const get = await fetchCompletedGigsForPayment()
    console.log('get is: ', get);
    return get;
  } catch (error) {
    throw new contractAiError('Failed to fetch completed gigs for payment');
  }
}

export async function processPaymentForGig(assignmentId: string, payeeId: string, amountDecimal: number, gigTitle: string) {
  try {
    const paymentResponse = await sendPayment({
      amountDecimal,
      payeeId,
      memo: `Payment for ${gigTitle}`,
      metadata: { assignmentId }
    });

    console.log('paymentResponse is: ', paymentResponse);

    await updateGigPaymentStatus(assignmentId, 'paid', paymentResponse.id);

    return paymentResponse;
  } catch (error) {
    console.error('Error processing payment for gig:', error);
    throw new contractAiError(`Failed to process payment: ${(error as Error).message}`);
  }
}