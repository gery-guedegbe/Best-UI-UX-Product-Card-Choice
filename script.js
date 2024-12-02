document.querySelectorAll(".card").forEach((card) => {
  const incrementBtn = card.querySelector(".increment");
  const decrementBtn = card.querySelector(".decrement");
  const deleteBtn = card.querySelector(".delete_btn");
  const quantityInput = card.querySelector(".quantity-input");

  // Sélecteur personnalisé pour la carte 3
  const customSelect = card.querySelector(".custom-select");
  if (customSelect) {
    const customInput = customSelect.querySelector(".custom-input");
    const dropdown = customSelect.querySelector(".dropdown");

    // Afficher ou masquer le menu déroulant
    customInput.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêche la fermeture immédiate
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    // Sélectionner une quantité dans le menu déroulant
    dropdown.querySelectorAll("li").forEach((option) => {
      option.addEventListener("click", () => {
        const value = option.getAttribute("data-value");
        customInput.value = value;
        dropdown.style.display = "none"; // Fermer le menu après la sélection
      });
    });

    // Fermer le menu déroulant si on clique à l'extérieur
    document.addEventListener("click", (e) => {
      if (!customSelect.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  // Initialisation du compteur
  if (quantityInput) {
    let count = parseInt(quantityInput.value);

    // Fonction pour mettre à jour la valeur de l'input
    function updateInputValue() {
      quantityInput.value = count;
    }

    // Gestion de l'incrémentation
    if (incrementBtn) {
      incrementBtn.addEventListener("click", () => {
        count++;
        updateInputValue();
      });
    }

    // Gestion de la décrémentation
    if (decrementBtn) {
      decrementBtn.addEventListener("click", () => {
        if (count > 1) {
          count--;
          updateInputValue();
        }
      });
    }

    // Permettre à l'utilisateur de saisir une valeur
    quantityInput.addEventListener("input", (event) => {
      const newValue = event.target.value.trim();

      // Permettre une saisie vide temporaire
      if (newValue === "") {
        count = 0;
        return;
      }

      const parsedValue = parseInt(newValue);
      if (!isNaN(parsedValue) && parsedValue > 0) {
        count = parsedValue;
      } else {
        // Réinitialiser uniquement si la valeur est invalide
        updateInputValue();
      }
    });
  }

  // Gestion de la disparition temporaire de la carte
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      card.style.display = "none";

      // Faire réapparaître la carte après 3 secondes
      setTimeout(() => {
        card.style.display = "flex";
      }, 3000);
    });
  }
});
