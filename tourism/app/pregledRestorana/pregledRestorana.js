`use strict`
class Jelo{
    constructor(naziv, opis, tip){
        this.naziv = naziv
        this.opis = opis
        this.tip = tip
    }
}


document.addEventListener('DOMContentLoaded', initializeJela)

function initializeJela() {
    //JSON
    let jela = []
    let jelaString = localStorage.getItem("jela")
    if(jelaString) {
        jela = JSON.parse(jelaString)
    }

    createProductRows(jela)
    loadTabeleStyles(jela)
    saveLocalStorage(jela)
  }

function loadTabeleStyles(){
    let tabela = document.querySelector("#jela") 
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
function createProductRows(jela){
    let table = document.querySelector("#tbody-jela")
    table.innerHTML = ''

    for(let jelo of jela){
        let tabela = document.querySelector("#tbody-jela") 
        let tr = document.createElement("tr")
    
        
        let naziv= document.createElement("td") 
        let tip= document.createElement("td")
        
        naziv.textContent =jelo.naziv
        tip.textContent = jelo.tip 
        
        tr.appendChild(naziv)
        tr.appendChild(tip)
        tr.addEventListener('click',
            function (event) {
                    displayProductDetails(jelo)
                    event.stopPropagation()
             })
        tabela.appendChild(tr)
    }
}
function displayProductDetails(jelo) {
    let detalji = document.querySelector(".prikazDetalji")
    detalji.style.border="1px solid black"
    let tabela = document.querySelector("#prikaziDetalje");
    tabela.innerHTML = ''; 

    let trNaziv = document.createElement("tr");
    let tdNaziv = document.createElement("td");
    tdNaziv.textContent = "Naziv: " + jelo.naziv;
    trNaziv.appendChild(tdNaziv);
    tabela.appendChild(trNaziv);

    let trTip = document.createElement("tr");
    let tdTip = document.createElement("td");
    tdTip.textContent = "Tip: " + jelo.tip;
    trTip.appendChild(tdTip);
    tabela.appendChild(trTip);

    let trOpis = document.createElement("tr");
    let tdOpis = document.createElement("td");
    tdOpis.textContent = "Opis: " + jelo.opis;
    trOpis.appendChild(tdOpis);
    tabela.appendChild(trOpis);
    
}


function saveLocalStorage(jela){
    let jelaJSON =JSON.stringify(jela)
    localStorage.setItem("jela", jelaJSON)
}