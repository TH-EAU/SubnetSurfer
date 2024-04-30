const letters = "ABCDEFHIJKLMNOPQRSTUVWXYZ";

const decodeEffect = (htmlElement, originalString) => {
  let iterations = 0;

  const interval = setInterval(() => {
    htmlElement.innerText = htmlElement.innerText
      .split("")
      .map((letter, index) => {
        if (index < iterations) {
          return originalString[index];
        }

        return Math.floor(Math.random() * 2);
      })
      .join("");
    iterations >= originalString.length && clearInterval(interval);
    iterations += 1 / 3;
  }, 40);
};

const titleSurfer = document.getElementById("titleSurfer");
decodeEffect(titleSurfer, titleSurfer.dataset.value);

refreshButton.addEventListener("click", (e) => {
  e.target.style = "transform : rotate(180deg)";
});
