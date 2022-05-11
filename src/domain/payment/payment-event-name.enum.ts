export enum PaymentEventName {
  PaymentCreated = 'payment_created',
  PaymentAuthorized = 'payment_authorized',
  PaymentNotAuthorized = 'payment_not_authorized',
  PaymentSentToFraudAnalysis = 'payment_sent_to_fraud_analysis',
  PaymentFraudAnalysisApproved = 'payment_fraud_analysis_approved',
  PaymentFraudAnalysisDenied = 'payment_fraud_analysis_denied',
  PaymentCaptured = 'payment_captured',
  PaymentFailed = 'payment_failed',
}
