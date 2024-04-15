class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
    <footer class="container" style="padding-bottom: 2rem;">
        <p class="float-end"><a href="#">Back to top</a></p>
        <p>&copy; 2023–2024 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
    </footer>
        `;
    }
}

customElements.define('footer-component', Footer);