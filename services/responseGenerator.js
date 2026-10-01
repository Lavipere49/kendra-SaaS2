function formatPrice(price) {
  return `${Number(price).toLocaleString("fr-FR")} FCFA`;
}

function generateProductResponse(products) {
  if (!products.length) {
    return "😕 Je n'ai trouvé aucun produit correspondant à votre recherche.";
  }

  return [
    "🔎 Voici ce que j'ai trouvé :",
    "",
    ...products.slice(0, 5).map(
      (product) =>
        `• ${product.name} — ${formatPrice(product.price)} — stock: ${product.stock}`
    )
  ].join("\n");
}

module.exports = {
  formatPrice,
  generateProductResponse
};
