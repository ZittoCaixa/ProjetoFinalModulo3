const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".recipe-card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;
    cards.forEach((card) => {
      card.classList.toggle("hidden", category !== "todos" && card.dataset.category !== category);
    });
  });
});
