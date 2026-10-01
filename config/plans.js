const PLANS = {
  FREE: {
    name: "FREE",
    price: 0,
    maxProducts: 10,
    maxMessagesMonth: 100,
    maxOrdersMonth: 20
  },
  STARTER: {
    name: "STARTER",
    price: 7900,
    maxProducts: 50,
    maxMessagesMonth: 1000,
    maxOrdersMonth: 100
  },
  BUSINESS: {
    name: "BUSINESS",
    price: 19900,
    maxProducts: 250,
    maxMessagesMonth: 5000,
    maxOrdersMonth: 500
  },
  PRO: {
    name: "PRO",
    price: 39900,
    maxProducts: 1000,
    maxMessagesMonth: 20000,
    maxOrdersMonth: 2000
  }
};

function getPlan(plan) {
  return PLANS[String(plan || "FREE").toUpperCase()] || PLANS.FREE;
}

module.exports = { PLANS, getPlan };
