const nameText = document.querySelector("#nameText");
const select = document.querySelector("#select");
const textarea = document.querySelector("#textarea");
const checkbox = document.querySelector("#checkbox");
const sendBtn = document.querySelector("#sendBtn");
const clearBtn = document.querySelector("#clearBtn");
const tbody = document.querySelector("tbody");
const deleteBtn = document.querySelectorAll(".deleteBtn");

document.addEventListener("DOMContentLoaded", () => {
    /*Kod från Bulmas dokumentation*/
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


    sendBtn.addEventListener("click", (event) => {
        event.preventDefault();
        sendForm();
    });

    clearBtn.addEventListener("click", (event) => {
        event.preventDefault();
        clearTable();
    });

    tbody.addEventListener("click", (event) => {
        if (event.target.classList.contains("deleteBtn")) {
            deleteRow(event.target);
        }
    });

    function sendForm() {
        if (checkbox.checked) {
            checkbox.value = "Ja";
        } else {
            checkbox.value = "Nej";
        }

        const name = nameText.value;
        const selectValue = select.value;
        const text = textarea.value;
        const checkboxValue = checkbox.value;

        // Skapa ett objekt av värdena
        const row = {
            id: Date.now(), // Används som ID
            name: name,
            select: selectValue,
            text: text,
            checkbox: checkboxValue,
        };

        // Hämta existerande data från localStorage
        let data = JSON.parse(localStorage.getItem("formData")) || [];
        data.push(row); // Lägg till den nya raden
        localStorage.setItem("formData", JSON.stringify(data)); // Spara data i localStorage

        tbody.innerHTML += `                
    <tr data-id="${row.id}">
    <th>${nameText.value}</th>
    <td class="has-text-centered">${select.value}</td>
    <td>${textarea.value}</td>
    <td class="has-text-centered">${checkbox.value}</td>
    <td class="has-text-centered">
        <p class="control">
            <a class="button is-small is-danger deleteBtn">X</a>
        </p>
    </td>
    </tr>`;

        // Rensa formuläret
        nameText.value = "";
        select.value = "";
        textarea.value = "";
        checkbox.checked = false;
    }

    // Funktion för att ladda data från localStorage när sidan laddas
    function loadData() {
        let data = JSON.parse(localStorage.getItem("formData")) || [];
        data.forEach((row) => {
            tbody.innerHTML += `                
        <tr data-id="${row.id}">
            <th>${row.name}</th>
            <td class="has-text-centered">${row.select}</td>
            <td>${row.text}</td>
            <td class="has-text-centered">${row.checkbox}</td>
            <td class="has-text-centered">
                <p class="control">
                    <a class="button is-small is-danger deleteBtn">X</a>
                </p>
            </td>
        </tr>`;
        });
    }

    //Funktion för att radera enskild rad i tabellen
    function deleteRow(button) {
        const row = button.closest("tr");
        const rowId = row.getAttribute("data-id");

        // Ta bort raden
        row.remove();

        // Hämta datan i localStorage
        let data = JSON.parse(localStorage.getItem("formData")) || [];

        // Ta bort raden baserat på det unika ID:t
        data = data.filter((item) => item.id != rowId); // Filtrera bort objektet med samma ID

        // Uppdatera localStorage
        localStorage.setItem("formData", JSON.stringify(data));
    }

    // Funktion för att radera all data i tabellen
    function clearTable() {
        localStorage.clear();
        tbody.innerHTML = "";
    }

    // Ladda data vid sidladdning
    window.onload = loadData;
});
