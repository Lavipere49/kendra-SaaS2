require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { initializeFirebase } = require("./config/firebase");

// Routes
const shopRoutes = require("./routes/shopRoutes");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const cartRoutes = require("./routes/cartRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const kendraRoutes = require("./routes/kendraRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

// --------------------------------------------------
// Firebase
// --------------------------------------------------

initializeFirebase();

// --------------------------------------------------
// Application
// --------------------------------------------------

const app = express();

// Render fournit automatiquement PORT
const PORT = Number(process.env.PORT) || 3000;

// --------------------------------------------------
// Middlewares
// --------------------------------------------------

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);

app.use(express.json());

// --------------------------------------------------
// Route principale du backend
// --------------------------------------------------

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KENDRA Backend is running",
    status: "online",
  });
});

// --------------------------------------------------
// Health check
// --------------------------------------------------

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    database: "firestore",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    whatsappConfigured: Boolean(
      process.env.WHAPI_API_URL && process.env.WHAPI_TOKEN
    ),
  });
});

// --------------------------------------------------
// Configuration publique
// --------------------------------------------------

app.get("/api/public-config", (req, res) => {
  res.json({
    success: true,

    shopId: process.env.KENDRA_SHOP_ID || "",

    moneyFusionConfigured: Boolean(
      process.env.MONEYFUSION_API_URL &&
        process.env.MONEYFUSION_PRIVATE_KEY
    ),

    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),

    whatsappConfigured: Boolean(
      process.env.WHAPI_API_URL && process.env.WHAPI_TOKEN
    ),
  });
});

// --------------------------------------------------
// API ROUTES
// --------------------------------------------------

app.use("/api/shops", shopRoutes);

app.use("/api/products", productRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/conversations", conversationRoutes);

app.use("/api/carts", cartRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/subscriptions", subscriptionRoutes);

app.use("/api/kendra", kendraRoutes);

app.use("/api/whatsapp", whatsappRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

// --------------------------------------------------
// Route 404 API
// --------------------------------------------------

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

// --------------------------------------------------
// Gestion globale des erreurs
// --------------------------------------------------

app.use((err, req, res, next) => {
  console.error("KENDRA API ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// --------------------------------------------------
// Démarrage du serveur
// --------------------------------------------------

app.listen(PORT, "0.0.0.0", () => {
  console.log("========================================");
  console.log("        KENDRA BACKEND STARTED");
  console.log("========================================");
  console.log(`Port: ${PORT}`);
  console.log("Environment:", process.env.NODE_ENV || "development");
  console.log("Firebase: initialized");
  console.log(
    "Gemini:",
    process.env.GEMINI_API_KEY ? "configured" : "not configured"
  );
  console.log(
    "WhatsApp:",
    process.env.WHAPI_API_URL && process.env.WHAPI_TOKEN
      ? "configured"
      : "not configured"
  );
  console.log("========================================");
});
