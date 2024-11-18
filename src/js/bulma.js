    /*Kod från Bulmas dokumentation*/

document.addEventListener("DOMContentLoaded", () => {
    // Hämta alla element som har klassen 'navbar-burger'
    const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
    );

    // Kontrollera om det finns några hamburgare
    if ($navbarBurgers.length > 0) {
        // Lägg till en 'click'-event på var och en av dem
        $navbarBurgers.forEach((el) => {
            el.addEventListener("click", () => {
                // Hämta target från data-target-attributet
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Växla klasserna 'is-active' på både 'navbar-burger' och 'navbar-menu'
                el.classList.toggle("is-active");
                $target.classList.toggle("is-active");
            });
        });
    }
    /*Slut på kod från Bulma*/

});
