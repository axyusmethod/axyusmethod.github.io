document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".step");
    const nextBtns = document.querySelectorAll(".btn-next");
    const prevBtns = document.querySelectorAll(".btn-prev");
    const submitBtn = document.querySelector(".btn-submit");
    const progressBar = document.querySelector(".progress-bar");

    let currentStep = 0;
    showStep(currentStep);

    function showStep(n) {
        steps.forEach((step, index) => {
            step.classList.remove("active");
            if (index === n) step.classList.add("active");
        });
        updateProgress();
    }

    function updateProgress() {
        if (progressBar) {
            let percent = ((currentStep) / (steps.length - 1)) * 100;
            progressBar.style.width = percent + "%";
        }
    }

    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (validateStep(currentStep)) {
                currentStep++;
                if (currentStep >= steps.length) currentStep = steps.length - 1;
                showStep(currentStep);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep--;
            if (currentStep < 0) currentStep = 0;
            showStep(currentStep);
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (validateStep(currentStep)) {
                document.querySelector("#wizard form").submit();
            }
        });
    }

    function validateStep(n) {
        let valid = true;
        const inputs = steps[n].querySelectorAll("input[required], select[required], textarea[required]");
        inputs.forEach(input => {
            const errorMsg = input.nextElementSibling?.classList.contains("wizard-error") ? input.nextElementSibling : null;
            if (!input.value) {
                valid = false;
                if (errorMsg) errorMsg.style.display = "block";
            } else {
                if (errorMsg) errorMsg.style.display = "none";
            }
        });
        return valid;
    }
    // DYNAMIC SUBJECT BASED ON PLAN
    const urlParams = new URLSearchParams(window.location.search);
    const planName = urlParams.get('plan');
    if (planName) {
        const subjectInput = document.querySelector('input[name="_subject"]');
        if (subjectInput) {
            subjectInput.value = "PLAN " + planName.toUpperCase() + " - Nuevo Candidato";
        }
    }
});




