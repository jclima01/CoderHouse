//condicional que analiza si somos tocayos.
let nombre1 = prompt("ingrese nombre jugador 1:")
let nombre2 = prompt("ingrese nombre jugador 2:")
if(nombre1 === "" || nombre2 === ""){
    alert("algun nombre es invalido")
} else if((nombre1 !="") && nombre1.toLowerCase() === nombre2.toLowerCase()){
        alert(`hola jugador ${nombre1}`)
        alert(`hola jugador ${nombre2}`)
        alert('ustedes son tocayos!')
}else if(nombre1.toLowerCase() != nombre2.toLowerCase()){
        alert('no somos tocayos!')
    }