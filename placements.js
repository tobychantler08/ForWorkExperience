const placementCard = document.getElementById("deloitte-aspire");
const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get("highlight") === "deloitte-aspire" && placementCard) {
  placementCard.classList.add("highlight");
  placementCard.scrollIntoView({ behavior: "smooth", block: "center" });
  placementCard.focus();
}

document.querySelectorAll("button.toggle").forEach((button) => {
  const key = `forwex-${button.dataset.state}`;

  const saved = window.localStorage.getItem(key);
  if (saved === "true") {
    button.dataset.active = "true";
    button.textContent = button.dataset.state === "applied" ? "Applied ✓" : "Accepted ✓";
  }

  button.addEventListener("click", () => {
    const isActive = button.dataset.active === "true";
    const next = !isActive;
    button.dataset.active = next ? "true" : "false";
    window.localStorage.setItem(key, String(next));

    if (button.dataset.state === "applied") {
      button.textContent = next ? "Applied ✓" : "Mark as applied";
    } else {
      button.textContent = next ? "Accepted ✓" : "Mark as accepted";
    }
  });
});
