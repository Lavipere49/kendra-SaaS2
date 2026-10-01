function detectPreferences(message) {
  const text = String(message || "").toLowerCase();
  const preferences = [];

  if (/(photo|photographie|camera|caméra)/.test(text)) {
    preferences.push("photographie");
  }

  if (/(autonomie|batterie|tient longtemps)/.test(text)) {
    preferences.push("autonomie");
  }

  if (/(performance|puissant|rapide)/.test(text)) {
    preferences.push("performance");
  }

  if (/(sport|sportif)/.test(text)) {
    preferences.push("sport");
  }

  if (/(confort|confortable)/.test(text)) {
    preferences.push("confort");
  }

  return preferences;
}

module.exports = detectPreferences;
