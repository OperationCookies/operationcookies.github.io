let cookie_notices = {
    message: [
        "Ne sei sicuro?",
        "Sicuro sicuro? Sai a cosa stai andando in contro?",
        "Andiamo, lo so che non sei sicuro. Ora ti aiuto io.",
    ],
    button: ["Sì", "Sì...", "Ok..."],
};

let cookie_notice_counter = 0;

function stepCookieNotice() {
    if (cookie_notice_counter >= cookie_notices["message"].length) {
        // alert("Closed modal");
        setCookie("has-accepted", "1", 30);
        closeModal();

        document.querySelectorAll(".arrow").forEach((e) => {
            e.classList.remove("animate-arrow");
            setTimeout(() => {
                console.log(e);
                e.classList.add("animate-arrow");
            }, 2002);
        });
        return;
    }

    document.getElementById("cookie-notice-message").innerText =
        cookie_notices["message"][cookie_notice_counter];
    document.getElementById("cookie-notice-button").innerText =
        cookie_notices["button"][cookie_notice_counter];

    cookie_notice_counter++;
}

if (getCookie("has-accepted") === "1") {
    hideModal();
}

function hideModal() {
    document
        .getElementById("modal-container")
        .style.setProperty("display", "none");
}

function closeModal() {
    const pane = document.getElementById("white-pane");
    pane.classList.add("animation-flash");

    setTimeout(() => {
        pane.classList.remove("animation-flash");
    }, 2000);

    setTimeout(() => {
        hideModal();
    }, 1000);
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// function showEnd() {
//     document.getElementById("modal-container1").classList.add("shown");
// }

let current_section = 0;

function showSection(n) {
    document.getElementById(n).classList.add("shown");
}

function nextSection() {
    if (
        current_section ===
        document.getElementsByClassName("section").length - 1
    ) {
        return;
    }

    const element = document.getElementById(current_section);

    element.classList.add("animate-away");
    element.classList.remove("shown");

    // if (current_section === document.getElementsByClassName("section").length - 1) {
    //     showEnd();
    // }

    setTimeout(() => {
        element.classList.remove("animate-away");

        current_section++;
        showSection(current_section);
    }, 700);
}

function prevSection() {
    if (current_section === 0) {
        return;
    }

    const element = document.getElementById(current_section);

    element.classList.add("animate-away");
    element.classList.remove("shown");

    setTimeout(() => {
        element.classList.remove("animate-away");

        current_section--;
        showSection(current_section);
    }, 700);
}

document.onkeydown = (e) => {
    const callback = {
        ArrowLeft: prevSection,
        ArrowRight: nextSection,
    }[e.key];
    callback?.();
};

document.getElementById("domain").innerText = window.location.hostname;
