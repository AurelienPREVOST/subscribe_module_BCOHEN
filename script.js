document.addEventListener("DOMContentLoaded", function () {
  const footerBottom = document.querySelector(".footer-bottom");
  if (!footerBottom || !footerBottom.parentNode) return;

  // Création du conteneur principal
  const container = document.createElement("div");
  container.style.marginTop = "20px";
  container.style.padding = "10px";
  container.style.borderTop = "1px solid #ccc";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";

  // Bouton "SOUSCRIRE"
  const button = document.createElement("button");
  button.textContent = "SOUSCRIRE";
  button.style.padding = "10px 20px";
  button.style.cursor = "pointer";
  button.style.alignSelf = "flex-start";

  // Formulaire (caché au départ)
  const form = document.createElement("form");
  form.style.display = "none";
  form.style.flexDirection = "column";
  form.style.gap = "8px";

  const fields = ["Nom", "Prenom", "Mail", "Telephone", "Adresse postale"];
  const inputs = {};

  fields.forEach((labelText) => {
    const label = document.createElement("label");
    label.textContent = labelText;
    const input = document.createElement("input");
    input.type = "text";
    input.name = labelText.toLowerCase().replace(" ", "_");
    input.style.padding = "5px";
    input.style.width = "100%";
    inputs[input.name] = input;
    label.appendChild(input);
    form.appendChild(label);
  });

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Valider";
  submit.style.padding = "8px";
  form.appendChild(submit);

  // Interactions
  button.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "flex" : "none";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {};
    for (let key in inputs) {
      data[key] = inputs[key].value;
    }

    try {
      const response = await fetch("https://your-api-endpoint.com/api/souscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert("Formulaire soumis avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi");
    }
  });

  // Insertion dans le DOM
  container.appendChild(button);
  container.appendChild(form);
  footerBottom.parentNode.insertBefore(container, footerBottom);
});
