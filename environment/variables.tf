variable "qpayments_arguments" {
  type = string
  description = "The Payments Queue arguments"
  default = <<EOF
{
  "x-message-ttl": 604800000,
  "x-dead-letter-exchange": "devpay.topic.dlq"
}
EOF
}

variable "qpayments_dlq_arguments" {
  type = string
  description = "The Payments DLQ arguments"
  default = <<EOF
{
  "x-message-ttl": 1209600000
}
EOF
}