const paypal = require("@paypal/checkout-server-sdk");

const environment = new paypal.core.SandboxEnvironment(
    "ASobUU6NXybf3Qzu5Icr_yDwxk1JXB9FYJ3UvNPFFpSaB4MU3YYNBn1XSoJycDwqL7JwqnaVyScPr5CS",
    "EKgoi7Fd778H8J2agAGD3UjQxw6uIdowOEoUz9NwfUVRW-uWxvufXAxq4hTuH82fyveKlPzQQgdUCzpB"
);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
