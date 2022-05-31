variable "payments_queue_msg_ttl" {
  type = string
  description = "The Payments Queue message time to live"
}

variable "payments_queue_exchange_dlq" {
  type = string
  description = "The Exchange to which the messages failed will be sent"
}

variable "payments_dlq_msg_ttl" {
  type = string
  description = "The Payments DLQ message time to live"
}