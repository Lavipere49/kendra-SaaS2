function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function searchProducts(products, criteria = {}) {
  const query = normalize(criteria.query);
  const category = normalize(criteria.category);
  const color = normalize(criteria.color);
  const maxPrice = Number(criteria.maxPrice);

  return products.filter((product) => {
    if (product.active === false || Number(product.stock) <= 0) {
      return false;
    }

    const searchable = normalize([
      product.name,
      product.description,
      product.category,
      product.color
    ].join(" "));

    if (query && !searchable.includes(query)) return false;
    if (category && !normalize(product.category).includes(category)) return false;
    if (color && !normalize(product.color).includes(color)) return false;

    if (
      Number.isFinite(maxPrice) &&
      maxPrice > 0 &&
      Number(product.price) > maxPrice
    ) {
      return false;
    }

    return true;
  });
}

module.exports = searchProducts;
