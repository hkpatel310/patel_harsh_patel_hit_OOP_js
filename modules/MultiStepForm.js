export class MultiStepForm {
    constructor(formId) {
        this.form = document.querySelector(`#${formId}`);
        this.pages = Array.from(this.form.querySelectorAll(".form__page")); // Convert NodeList to Array for wider method compatibility
        this.nextButtons = this.form.querySelectorAll(".btn-next");
        this.prevButtons = this.form.querySelectorAll(".btn-prev");
        this.currentYear = new Date().getFullYear();
        this.initialize();
    }

    initialize() {
        this.initializeButtons();
        this.populateYearOptions();
        this.bindColorChange();
    }

    initializeButtons() {
        for (const btn of this.nextButtons) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                let currentPage = this.getCurrentPage();
                this.goToPage(currentPage + 1);
            });
        }

        for (const btn of this.prevButtons) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                let currentPage = this.getCurrentPage();
                this.goToPage(currentPage - 1);
            });
        }
    }

    getCurrentPage() {
        return parseInt(this.form.dataset.currentPage, 10);
    }

    getMaxPage() {
        return parseInt(this.form.dataset.maxPage, 10);
    }

    goToPage(targetPage) {
        if (targetPage > this.getMaxPage() || targetPage < 1) {
            console.error("Page not found.");
            return;
        }

        for (const page of this.pages) {
            page.classList.remove("active");
            if (parseInt(page.dataset.page, 10) === targetPage) {
                page.classList.add("active");
            }
        }

        this.form.dataset.currentPage = String(targetPage);
        this.updateProgressBar();
    }

    updateProgressBar() {
        const allSteps = this.form.querySelectorAll(".page-step");
        let currentPage = this.getCurrentPage();

        for (const step of allSteps) {
            step.classList.remove("active");
            if (parseInt(step.dataset.page, 10) <= currentPage) {
                step.classList.add("active");
            }
        }
    }

    populateYearOptions() {
        const minYearSelect = this.form.querySelector('#minYear');
        const maxYearSelect = this.form.querySelector('#maxYear');

        for (let year = 2000; year <= this.currentYear; year++) {
            minYearSelect.appendChild(new Option(year, year));
            maxYearSelect.appendChild(new Option(year, year));
        }
    }

    bindColorChange() {
        const colorSelect = this.form.querySelector('#color');
        colorSelect.addEventListener('change', (e) => this.updateColorPreview(e.target.value));
    }

    updateColorPreview(color) {
        const colorPreview = this.form.querySelector('#colorPreview');
        colorPreview.style.backgroundColor = color;
    }
}
