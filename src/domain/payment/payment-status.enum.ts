export enum PaymentStatus {
  Pending = 'pending',
  Authorized = 'authorized',
  NotAuthorized = 'not_authorized',
  Fraud_analysis_sent = 'fraud_analysis_sent',
  Fraud_analysis_approved = 'fraud_analysis_approved',
  Fraud_analysis_denied = 'fraud_analysis_denied',
  Paid = 'paid',
  Failed = 'failed',
}
