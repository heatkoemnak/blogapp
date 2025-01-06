function generateRandomPercent(min = 0, max = 100) {
    const randomInteger = Math.floor(Math.random() * (max + 1));
    return `${randomInteger}%`;
  }
  function generateRadomDelay(interval = 3) {
    const randomInteger = Math.random() * (interval + 1);
    return `${randomInteger}s`;
  }
  
  function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = generateRandomPercent();
    star.style.left = generateRandomPercent();
    star.style.animationDelay = generateRadomDelay();
    return star;
  }
  
  function renderStars(amount = 15) {
    const container = document.getElementById("container");
    const placeholdersArray = Array(amount).fill("star_placeholder");
    const starsArray = placeholdersArray.map((starPlacholder, index) =>
      createStar()
    );
    container.append(...starsArray);
  }
  
  renderStars();
  