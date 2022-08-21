
let input = prompt("Ingrese nombre:").toUpperCase();
while(input != "ESC"){
while(input === ""){
    alert("nombre invalido")
    input = prompt("Ingrese nombre:").toUpperCase();
}

    alert(`Hola ${input}`)
alert("Cuales son tus 5 gustos de helados preferidos?")
let gustos = [];   

if(input=!""){        
    
    for(i=0; i<5; i++){
        let gusto = prompt("ingresa el gusto").toUpperCase();
        gustos.push(gusto)
        alert(`Elegiste: ${gusto}`); 
    }    
 }
alert(`tus gustos son: ${gustos}`);
alert("Gracias por compartirme tus gustos de helado")
input = prompt("Ingrese nombre:").toUpperCase();
}