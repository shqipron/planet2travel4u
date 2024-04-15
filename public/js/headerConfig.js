function loadStylesheet(href) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

function loadScript(src) {
    let script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
}

loadStylesheet("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
loadStylesheet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css");
loadStylesheet("https://www.gstatic.com/firebasejs/ui/6.1.0/firebase-ui-auth.css");
loadStylesheet('../../public/css/page.css')

loadScript("../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
loadScript("https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js");
loadScript("https://www.gstatic.com/firebasejs/10.5.0/firebase-auth-compat.js");
loadScript("https://www.gstatic.com/firebasejs/10.5.0/firebase-database-compat.js");
loadScript("https://www.gstatic.com/firebasejs/ui/6.1.0/firebase-ui-auth__en.js");
loadScript("https://www.gstatic.com/firebasejs/10.5.0/firebase-storage-compat.js");
loadScript("https://www.gstatic.com/firebasejs/10.5.0/firebase-storage-compat.js");




