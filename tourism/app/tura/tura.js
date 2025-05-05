class Tura{
    constructor(naziv, duzina, opis, tagovi){
        this.naziv= naziv
        this.duzina=duzina
        this.opis=opis
        this.tagovi= tagovi
    }
}

let ture = []

function prikazTure(){
    let listaDiv = document.getElementById("tura-lista")
    listaDiv.innerHTML = ""

    for (let i=0; i < ture.length; i++){
        let tura = ture[i]

        let kartica = document.createElement("div")
        kartica.className = "tura-kartica"
        kartica.textContent = tura.naziv + " (" + tura.duzina + " km)"

        kartica.addEventListener("click", function(){
            prikaziDetaljeTure(tura)
        })
        listaDiv.appendChild(kartica)
    }
}

function prikaziDetaljeTure(tura){
    let detaljiDiv= document.getElementById("tura-detalji")
    detaljiDiv.innerHTML= ""

    let p = document.createElement("p")
    p.innerHTML = "<strong>Opis:</strong> " + tura.opis + "<br>" +
    "<strong>Tagovi:</strong> " + tura.tagovi.join(", ")

    detaljiDiv.appendChild(p)
}
function inicijalizujTure(){
    ture = [
        new Tura("Gradska šetnja", 5, "Vođena tura kroz centar grada.", ["gradska", "istorijska"]),
        new Tura("Planinska avantura", 12, "Pešačka tura sa prelepim pogledom.", ["priroda", "planinarenje"]),
        new Tura("Kulturna ekspedicija", 8, "Muzeji, galerije i spomenici kulture.", ["kultura", "umetnost"])
     ]
     prikazTure();
}
document.addEventListener("DOMContentLoaded", inicijalizujTure)