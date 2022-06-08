export enum PaymentEventName {
  PaymentCreated = 'payment.created',
  PaymentAuthorized = 'payment.authorized',
  PaymentNotAuthorized = 'payment.not_authorized',
  PaymentSentToFraudAnalysis = 'payment.sent_to_fraud_analysis',
  PaymentFraudAnalysisApproved = 'payment.fraud_analysis_approved',
  PaymentFraudAnalysisDenied = 'payment.fraud_analysis_denied',
  PaymentCaptured = 'payment.captured',
  PaymentFailed = 'payment.failed',
}
