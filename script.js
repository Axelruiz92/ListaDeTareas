//variables funcion agregar tarea
const fecha = document.querySelector('#fecha'); //con esto seleccionamos un elemeneto de html(fecha)
const lista = document.querySelector('#lista'); 
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter'); 

//variables funcion tachar
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id = 4

const LIST=[]







//Funcion agregar tarea
function agregarTarea (tarea,id,realizado,eliminado) {                       //realizado y eliminado son variables que van a ser false o true dependiendo del caso
    if (eliminado) { return }

    const REALIZADO = realizado ?check :uncheck
    const LINE = realizado ?lineThrough :''

    const elemento =  `
                        <li id="elemento"> 
                        <i class="fa-regular ${REALIZADO}" data="realizado" id="${id}" ></i>
                        <p class="text ${LINE}"> ${tarea} </p>
                        <i class="fas fa-trash" data="eliminado" id="${id}"></i> 
                        
                        </li>
                        `// Backticks permite crear bloques de cadena con elemenetos html                               

    lista.insertAdjacentHTML("beforeend", elemento)  // insertAdjacentHTML es un metodo, usamos beforeend para que inserte un elemento antes de que termine... 
}


//Funcion tareaRealizada

function tareaRealizada(element) {
    element.classList.toggle(check) //toggle agrega o cambia los elementos
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough) //parentnode es una propiedad para ver el elemento padre
    console.log(LIST[element.id].realizado)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true
    console.log(LIST)
    console.log(LIST[element.id])
    console.log(LIST[element.id].realizado)
}

//Funcion tareaEliminada

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode) //del elemento vaya a li, y de li a ul 
    LIST[element.id].eliminado = true
}







// Agregar tarea con click

botonEnter.addEventListener('click', ()=> {             // Metodo addEventListener sirve para crear una funcion de evento //
     const tarea = input.value                          // Con input.value puedo saber el valor del input y se lo asigno a la variable tarea
     if (tarea) {
        agregarTarea(tarea,id,false,false)              // Si nadie escribe nada => input.value no existe, entonces no es = a tarea
                                                        // ¿if tarea existe? si existe, entonces ejecuta agregar tarea y manda el valor que tiene 
        
        LIST.push({                                     // push es un metodo que permite agregar elementos dentro de un array
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })                                                
        }
     input.value = ''
     id++                                          //esto hara que el id se vaya sumando de uno en uno
    })            

// Agregar tarea con tecla Enter

document.addEventListener('keyup', function(event) {
        if(event.key == 'Enter') {                     //Si el event.key es igual a enter entonces => realiza algo... Event.key puede leer las teclas del teclado
            const tarea = input.value 
            if(tarea) {
                agregarTarea(tarea,id,false,false)

                LIST.push({                                     // push es un metodo que permite agregar elementos dentro de un array
                    nombre: tarea,
                    id: id,
                    realizado: false,
                    eliminado: false
                })  
            }
            input.value = ''
            id++

        }
    })



//

lista.addEventListener ('click', function(event) {
    const element = event.target
    const elementData = element.attributes.data.value
    
    if (elementData == 'realizado') {
        tareaRealizada(element)
    }

    else if (elementData == 'eliminado') {
        tareaEliminada(element)
    }
})

