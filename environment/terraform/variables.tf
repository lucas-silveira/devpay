variable "host" {
  type = string
  description = "The RabbitMQ server host"
}

variable "port" {
  type = string
  description = "The RabbitMQ Management API port"
}

variable "vhost" {
  type = string
  description = "The application VHost name"
}

variable "user" {
  type = string
  description = "The server User name"
}

variable "pass" {
  type = string
  description = "The server Password"
}

variable "exchange_topic" {
  type = string
  description = "The Topic Exchange name"
}

variable "exchange_topic_dlq" {
  type = string
  description = "The Topic Exchange name for messages dead lettered"
}

variable "queue_msg_ttl" {
  type = string
  description = "The default Queue message time to live"
}

variable "dlq_msg_ttl" {
  type = string
  description = "The default DLQ message time to live"
}

variable "accounts_queue" {
  type = string
  description = "The Accounts Queue name"
}

variable "accounts_dlq" {
  type = string
  description = "The Accounts DLQ name"
}

variable "payments_queue" {
  type = string
  description = "The Payments Queue name"
}

variable "payments_dlq" {
  type = string
  description = "The Payments DLQ name"
}