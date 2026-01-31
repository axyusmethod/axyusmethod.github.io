const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.querySelector(".progress");
let currentStep = 0;

function updateStep() {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
  const percent = ((currentStep) / (steps.length - 1)) * 100;
  progress.style.width = percent + "%";
}

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!validateStep(currentStep)) return;
    currentStep++;
    updateStep();
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentStep--;
    updateStep();
  });
});

function validateStep(stepIndex) {
  const step = steps[stepIndex];
  const inputs = step.querySelectorAll("input, select, textarea");
  for (let input of inputs) {
    if (input.hasAttribute("required") && !input.value) {
      input.focus();
      alert("Por favor completá todos los campos requeridos");
      return false;
    }
  }
  return true;
}

// Inicializa
updateStep();
