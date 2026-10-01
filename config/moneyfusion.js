const MONEYFUSION_PAYMENT_URL = process.env.MONEYFUSION_API_URL;
const MONEYFUSION_STATUS_BASE_URL = process.env.MONEYFUSION_STATUS_BASE_URL || "https://pay.moneyfusion.net/paiementNotif";

function moneyFusionConfig() {
  if (!MONEYFUSION_PAYMENT_URL) {
    throw new Error("MONEYFUSION_API_URL_MISSING");
  }

  return {
    paymentUrl: MONEYFUSION_PAYMENT_URL,
    statusBaseUrl: MONEYFUSION_STATUS_BASE_URL,
    privateKey: process.env.MONEYFUSION_PRIVATE_KEY || ""
  };
}

module.exports = { moneyFusionConfig };
