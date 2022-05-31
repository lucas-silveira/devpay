terraform {
  required_providers {
    rabbitmq = {
      source = "cyrilgdn/rabbitmq"
      version = "1.6.0"
    }
  }
}

provider "rabbitmq" {
  endpoint = "http://rabbitmq:15672"
  username = "root"
  password = "secure"
}

# VHost
resource "rabbitmq_vhost" "devpay" {
  name = "devpay"
}

# Permissions
resource "rabbitmq_permissions" "devpay" {
  user  = "root"
  vhost = "${rabbitmq_vhost.devpay.name}"

  permissions {
    configure = ".*"
    write     = ".*"
    read      = ".*"
  }
}

# Exchanges
resource "rabbitmq_exchange" "devpay_topic" {
  name  = "devpay.topic"
  vhost = "${rabbitmq_permissions.devpay.vhost}"

  settings {
    type        = "topic"
    durable     = true
    auto_delete = false
  }
}

resource "rabbitmq_exchange" "devpay_topic_dlq" {
  name  = "devpay.topic.dlq"
  vhost = "${rabbitmq_permissions.devpay.vhost}"

  settings {
    type        = "topic"
    durable     = true
    auto_delete = false
  }
}


# Queues
resource "rabbitmq_queue" "payments" {
  name  = "payments"
  vhost = "${rabbitmq_permissions.devpay.vhost}"

  settings {
    durable     = true
    auto_delete = false
    arguments_json = "${var.qpayments_arguments}"
  }
}

resource "rabbitmq_queue" "payments_dlq" {
  name  = "payments_dlq"
  vhost = "${rabbitmq_permissions.devpay.vhost}"

  settings {
    durable     = true
    auto_delete = false
    arguments_json = "${var.qpayments_dlq_arguments}"
  }
}

# Bindings
resource "rabbitmq_binding" "bind_qpayments_etopic" {
  source           = "${rabbitmq_exchange.devpay_topic.name}"
  vhost            = "${rabbitmq_vhost.devpay.name}"
  destination      = "${rabbitmq_queue.payments.name}"
  destination_type = "queue"
  routing_key      = "payments.*"
}


resource "rabbitmq_binding" "bind_qpayments_dlq_etopic" {
  source           = "${rabbitmq_exchange.devpay_topic_dlq.name}"
  vhost            = "${rabbitmq_vhost.devpay.name}"
  destination      = "${rabbitmq_queue.payments_dlq.name}"
  destination_type = "queue"
  routing_key      = "payments.*"
}