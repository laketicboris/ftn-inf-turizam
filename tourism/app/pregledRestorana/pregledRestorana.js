'use strict'
class Restoran {
    constructor(naziv, opis, tip) {
        this.naziv = naziv
        this.opis = opis
        this.tip = tip
    }
}
let tipovi = []

document.addEventListener('DOMContentLoaded', initializeRestorane)

function initializeRestorane() {
    let restorani = []
    let restoraniString = localStorage.getItem("restorani")
    if (restoraniString) {
        restorani = JSON.parse(restoraniString)
    }

    let tipoviString = localStorage.getItem("tipovi")
    if (tipoviString) {
        tipovi = JSON.parse(tipoviString)
    } else {
        tipovi = getAllType(restorani)
        saveTipovi()
    }

    createProductRows(restorani)
    loadTabeleStyles()
    saveLocalStorage(restorani)
    generateFoodCheckbox()
    handleFormSubmission(restorani)
}

function loadTabeleStyles() {
    let tabela = document.querySelector("#restoran")
    tabela.style.borderCollapse = "collapse"
    tabela.style.border = "1px solid black"
    tabela.style.textAlign = "center"
    let ths = document.querySelectorAll("th")
    for (let th of ths) {
        th.style.border = "1px solid black"
    }

    let tds = document.querySelectorAll("td")
    for (let td of tds) {
        td.style.border = "1px solid black"
        td.style.padding = "5px"
    }
}

function createProductRows(restorani) {
    let table = document.querySelector("#tbody-restorani")
    table.innerHTML = ''

    for (let restoran of restorani) {
        let tabela = document.querySelector("#tbody-restorani")
        let tr = document.createElement("tr")

        let naziv = document.createElement("td")
        let tip = document.createElement("td")

        naziv.textContent = restoran.naziv
        tip.textContent = restoran.tip

        tr.appendChild(naziv)
        tr.appendChild(tip)
        tr.addEventListener('click',
            function (event) {
                displayProductDetails(restoran)
                event.stopPropagation()
            })
        tabela.appendChild(tr)
    }
}

function displayProductDetails(restoran) {
    let detalji = document.querySelector(".prikazDetalji")
    detalji.style.border = "1px solid black"
    let tabela = document.querySelector("#prikaziDetalje")
    tabela.innerHTML = ''

    let trNaziv = document.createElement("tr")
    let tdNaziv = document.createElement("td")
    tdNaziv.textContent = "Naziv: " + restoran.naziv
    trNaziv.appendChild(tdNaziv)
    tabela.appendChild(trNaziv)

    let trTip = document.createElement("tr")
    let tdTip = document.createElement("td")
    tdTip.textContent = "Tip: " + restoran.tip
    trTip.appendChild(tdTip)
    tabela.appendChild(trTip)

    let trOpis = document.createElement("tr")
    let tdOpis = document.createElement("td")
    tdOpis.textContent = "Opis: " + restoran.opis
    trOpis.appendChild(tdOpis)
    tabela.appendChild(trOpis)
}

function saveLocalStorage(restorani) {
    let jelaJSON = JSON.stringify(restorani)
    localStorage.setItem("restorani", jelaJSON)
}

function saveTipovi() {
    localStorage.setItem("tipovi", JSON.stringify(tipovi))
}

function getAllType(restorani) {
    let tipoviJela = []
    for (let restoran of restorani) {
        for (let t of restoran.tip) {
            if (!tipoviJela.includes(t)) {
                tipoviJela.push(t)
            }
        }
    }
    return tipoviJela
}

function addType(tip) {
    if (!tipovi.includes(tip)) {
        tipovi.push(tip)
        saveTipovi() 
    }
}

function generateFoodCheckbox() {
    let container = document.querySelector("#checkBoxContainer")
    container.innerHTML = ''

    for (let tip of tipovi) {
        let checkInput = document.createElement("input")
        checkInput.type = "checkbox"
        checkInput.id = tip
        checkInput.name = "tipKuhinje"
        checkInput.value = tip

        let checkLabel = document.createElement("label")
        checkLabel.htmlFor = tip
        checkLabel.textContent = tip

        container.appendChild(checkLabel)
        container.appendChild(checkInput)
        container.appendChild(document.createElement("br"))
    }
}

function getChecks() {
    let checkedBoxes = document.querySelectorAll('input[name="tipKuhinje"]:checked')
    let checked = []
    for (let checkbox of checkedBoxes) {
        checked.push(checkbox.value)
    }
    return checked
}

function handleFormSubmission(restorani) {
    const dodajBtn = document.querySelector('#dodajBtn')
    const dodajTip = document.querySelector("#dodajTip")
    const dodajTipBtn = document.querySelector("#dodajTipBtn")
    const tipForma = document.querySelector('#tipForma')
    const forma = document.querySelector('#forma')

    dodajBtn.addEventListener('click', function () {
        const formData = new FormData(forma)
        const naziv = formData.get('naziv')
        const opis = formData.get('opis')
        let tipoviJela = getChecks()
        const noviRestoran = new Restoran(naziv, opis, tipoviJela)
        restorani.push(noviRestoran)
        saveLocalStorage(restorani)
        createProductRows(restorani)
        loadTabeleStyles()
        forma.naziv.value=""
        forma.opis.value=""
        generateFoodCheckbox()
    })

    dodajTip.addEventListener('click', function () {
        tipForma.style.visibility = "visible"
        dodajTip.style.visibility = "hidden"
        dodajTipBtn.style.visibility = "visible"
    })

    dodajTipBtn.addEventListener('click', function () {
        const tipInput = document.querySelector('#tipForma')
        if (tipInput) {
            const tipJela = tipInput.value.trim()
            if (tipJela && !tipovi.includes(tipJela)) {
                addType(tipJela)
                generateFoodCheckbox()
                tipInput.value = "" 
                tipForma.style.visibility = "hidden"
                dodajTip.style.visibility = "visible"
                dodajTipBtn.style.visibility = "hidden"
            }
        }
    })
}



