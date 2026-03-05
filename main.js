// 简单的前端交互逻辑：导航激活状态、平滑滚动、文章评分（本地存储）

function initNav() {
  const links = document.querySelectorAll(".nav-link[href^='#']");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// 评分功能：基于 data-article-id 存储到 localStorage
function initRatings() {
  const ratingBlocks = document.querySelectorAll("[data-article-id]");
  ratingBlocks.forEach((block) => {
    const articleId = block.getAttribute("data-article-id");
    const stars = block.querySelectorAll(".star");
    const valueEl = block.querySelector(".rating-value");

    const saved = Number(localStorage.getItem(`wzhw_rating_${articleId}`) || 0);
    if (saved > 0) {
      updateStars(stars, saved);
      if (valueEl) valueEl.textContent = `${saved.toFixed(1)} 分（本机记录）`;
    }

    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const value = Number(star.dataset.value || 0);
        if (!value) return;
        localStorage.setItem(`wzhw_rating_${articleId}`, String(value));
        updateStars(stars, value);
        if (valueEl) valueEl.textContent = `${value.toFixed(1)} 分（本机记录）`;
      });
    });
  });
}

function updateStars(stars, value) {
  stars.forEach((star) => {
    const v = Number(star.dataset.value || 0);
    star.classList.toggle("active", v <= value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initRatings();
});

