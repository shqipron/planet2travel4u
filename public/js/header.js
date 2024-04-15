import {initializeUI} from "./firebase/firebaseAuth.js";


class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `

            <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModal" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div id="firebaseui-auth-container"></div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

            <header>
              <div class="collapse bg-dark" id="navbarHeader">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-8 col-md-7 py-4">
                      <h4 class="text-white">About</h4>
                      <p class="text-white">Welcome to the only website you'll need for your next vacation escape. Here you will find various features that you can use free of charge. Try them out and if you have any ideas, feel free to write to us!</p>
                    </div>
                    <div class="col-sm-4 offset-md-1 py-4">
                      <h4 class="text-white">Contact</h4>
                      <ul class="list-unstyled">
                        <li><a href= "mailto:abc@example.com">email us!</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="navbar navbar-dark bg-dark shadow-sm">
                <div class="container">
                  <a href="/" class="navbar-brand d-flex align-items-center mx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    <strong>Plan2travel4you</strong>
                  </a>
                  <div class="navbar-nav ms-auto">
                     <button id='UserAuthLogOutBtn' type="button" class="btn btn-danger mx-3 d-none">LogOut</button>
                     <button id='UserAuthBtn' type="button" class="btn btn-primary mx-3 d-none userAuthBtn" data-bs-toggle="modal" data-bs-target="#authModal">Login/ Register</button>
                  </div>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                </div>
              </div>
            </header>


        `;
        initializeUI();

    }
}

customElements.define('header-component', Header);

