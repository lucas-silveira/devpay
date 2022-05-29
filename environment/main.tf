terraform {
  required_providers {
    rabbitmq = {
      source = "cyrilgdn/rabbitmq"
      version = "1.6.0"
    }
  }
}

provider "rabbitmq" {
  endpoint = "http://localhost"
  username = "root"
  password = "secure"
}

resource "rabbitmq_vhost" "devpay" {
  name = "devpay"
}