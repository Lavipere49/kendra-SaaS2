require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const { initializeFirebase } = require("./config/firebase");

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

initializeFirebase();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

const publicDir = path.join(__dirname, "..");
const adminDir = path.join(__dirname, "..", "admin");

/*
 * Frontend vendeur/public.
 */
app.use(express.static(publicDir));

/*
 * Frontend Admin.
 * IMPORTANT : on sert le dossier admin existant tel quel.
 * Aucun HTML/CSS/JS Admin n'est remplacé ou modifié ici.
 */
app.use("/admin", express.static(adminDir));

app.get("/admin", (req, res) => {
  res.sendFile(path.join(adminDir, "index.html"));
});

app.get("/api/public-config", (req, res) => {
  res.json({
    success: true,
    shopId: process.env.KENDRA_SHOP_ID || "",
    moneyFusionConfigured: Boolean(
      process.env.MONEYFUSION_API_URL &&
      process.env.MONEYFUSION_PRIVATE_KEY
    ),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    database: "firestore",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

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

app.listen(PORT, () => {
  console.log(`KENDRA Backend sur http://localhost:${PORT}`);
  console.log(`KENDRA Admin sur http://localhost:${PORT}/admin/`);
});
