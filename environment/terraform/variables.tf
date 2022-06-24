variable "host" {
  type = string
  description = "The RabbitMQ server host"
}

variable "port" {
  type = string
  description = "The RabbitMQ management API port"
}

variable "vhost" {
  type = string
  description = "The application virtual host name"
}

variable "user" {
  type = string
  description = "The server user name"
}

variable "pass" {
  type = string
  description = "The server password"
}

variable "exchange_topic" {
  type = string
  description = "The topic exchange name"
}

variable "exchange_topic_dlq" {
  type = string
  description = "The topic exchange name for messages dead lettered"
}

variable "queue_msg_ttl" {
  type = string
  description = "The default queue message time to live"
}

variable "dlq_msg_ttl" {
  type = string
  description = "The default DLQ message time to live"
}

variable "accounts_queue" {
  type = string
  description = "The accounts queue name"
}

variable "accounts_dlq" {
  type = string
  description = "The accounts DLQ name"
}

variable "accounts_queue_rkey" {
  type = string
  description = "The accounts queue routing Key"
}

variable "payments_queue" {
  type = string
  description = "The payments queue name"
}

variable "payments_dlq" {
  type = string
  description = "The payments DLQ name"
}

variable "payments_queue_rkey" {
  type = string
  description = "The payments queue routing Key"
}