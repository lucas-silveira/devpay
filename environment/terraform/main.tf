terraform {
  required_providers {
    rabbitmq = {
      source = "cyrilgdn/rabbitmq"
      version = "1.6.0"
    }
  }
}

provider "rabbitmq" {
  endpoint = "http://${var.host}:${var.port}"
  username = "${var.user}"
  password = "${var.pass}"
}

# VHost
resource "rabbitmq_vhost" "devpay" {
  name = "${var.vhost}"
}

# Permissions
resource "rabbitmq_permissions" "devpay" {
  user  = "${var.user}"
  vhost = "${rabbitmq_vhost.devpay.name}"

  permissions {
    configure = ".*"
    write     = ".*"
    read      = ".*"
  }
}

# Exchanges
resource "rabbitmq_exchange" "devpay_topic" {
  name  = "${var.exchange_topic}"
  vhost = "${rabbitmq_permissions.devpay.vhost}"

  settings {
    type        = "topic"
    durable     = true
    auto_delete = false
  }
}
resource "rabbitmq_exchange" "devpay_topic_dlq" {
  name  = "${var.exchange_topic_dlq}"
  vhost = "${rabbitmq_permissions.devpay.vhost}"

  settings {
    type        = "topic"
    durable     = true
    auto_delete = false
  }
}


# Queues
resource "rabbitmq_queue" "accounts" {
  name  = "${var.accounts_queue}"
  vhost = "${rabbitmq_permissions.devpay.vhost}"

  settings {
    durable     = true
    auto_delete = false
    arguments_json = jsonencode({
      "x-message-ttl": tonumber("${var.queue_msg_ttl}"),
      "x-dead-letter-exchange": "${rabbitmq_exchange.devpay_topic_dlq.name}"
    })
  }
}
resource "rabbitmq_queue" "accounts_dlq" {
  name  = "${var.accounts_dlq}"
  vhost = "${rabbitmq_permissions.devpay.vhost}"

  settings {
    durable     = true
    auto_delete = false
    arguments_json = jsonencode({
      "x-message-ttl": tonumber("${var.dlq_msg_ttl}"),
    })
  }
}

resource "rabbitmq_queue" "payments" {
  name  = "${var.payments_queue}"
  vhost = "${rabbitmq_permissions.devpay.vhost}"

  settings {
    durable     = true
    auto_delete = false
    arguments_json = jsonencode({
      "x-message-ttl": tonumber("${var.queue_msg_ttl}"),
      "x-dead-letter-exchange": "${rabbitmq_exchange.devpay_topic_dlq.name}"
    })
  }
}
resource "rabbitmq_queue" "payments_dlq" {
  name  = "${var.payments_dlq}"
  vhost = "${rabbitmq_permissions.devpay.vhost}"

  settings {
    durable     = true
    auto_delete = false
    arguments_json = jsonencode({
      "x-message-ttl": tonumber("${var.dlq_msg_ttl}"),
    })
  }
}

# Bindings
resource "rabbitmq_binding" "bind_qaccounts_etopic" {
  source           = "${rabbitmq_exchange.devpay_topic.name}"
  vhost            = "${rabbitmq_vhost.devpay.name}"
  destination      = "${rabbitmq_queue.accounts.name}"
  destination_type = "queue"
  routing_key      = "${var.accounts_queue_rkey}"
}
resource "rabbitmq_binding" "bind_qaccounts_dlq_etopic" {
  source           = "${rabbitmq_exchange.devpay_topic_dlq.name}"
  vhost            = "${rabbitmq_vhost.devpay.name}"
  destination      = "${rabbitmq_queue.accounts_dlq.name}"
  destination_type = "queue"
  routing_key      = "${var.accounts_queue_rkey}"
}

resource "rabbitmq_binding" "bind_qpayments_etopic" {
  source           = "${rabbitmq_exchange.devpay_topic.name}"
  vhost            = "${rabbitmq_vhost.devpay.name}"
  destination      = "${rabbitmq_queue.payments.name}"
  destination_type = "queue"
  routing_key      = "${var.payments_queue_rkey}"
}
resource "rabbitmq_binding" "bind_qpayments_dlq_etopic" {
  source           = "${rabbitmq_exchange.devpay_topic_dlq.name}"
  vhost            = "${rabbitmq_vhost.devpay.name}"
  destination      = "${rabbitmq_queue.payments_dlq.name}"
  destination_type = "queue"
  routing_key      = "${var.payments_queue_rkey}"
}