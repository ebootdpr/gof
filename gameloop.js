var canvas = document.getElementById('life');
var grafico = canvas.getContext('2d');
let alturaGrafico = canvas.height;
let anchuraGrafico = canvas.width;

let listaParticulas = [] //crea lo q va a contener las posiciones de las particulas
let listaParticulasVelocidades = []
let listaDeMasas = []

function random(parametro) {
    return Math.random() * parametro
}
function crearParticulasXYrandom(number) {
    for (let i = 0; i < number; i++) {
        listaParticulas.push(random(200))
        listaParticulas.push(random(200))
        listaParticulasVelocidades.push(random(1)-random(1))
        listaParticulasVelocidades.push(random(1)-random(1))
        listaDeMasas.push(random(1)+1)
        listaDeMasas.push(random(1)+1)
    }
}
function dibujarParticulas(listaXY, color) {

    grafico.fillStyle = color
    for (let i = 0; i < listaXY.length; i += 2) {
        if(i===4){
            grafico.fillRect(Math.round(listaXY[4]), Math.round(listaXY[5]), 6, 6)
        }
        else{
        grafico.fillRect(Math.round(listaXY[i]), Math.round(listaXY[i + 1]), 1, 1)
        }
    }
}
function lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }
function rule(listaXY, listaVel, gravedad, pow,dmin,dmax) {
    for (let i = 0; i < listaXY.length; i += 2) {
        let fuerzaNetaX = 0
        let fuerzaNetaY = 0
        particulaX = listaXY[i]
        particulaY = listaXY[i + 1]
        for (let j = 0; j < listaXY.length; j += 2) {
            if (i != j) {
                let otraX = listaXY[j]
                let otraY = listaXY[j + 1]
                let dx = otraX - particulaX
                let dy = otraY - particulaY
                let d = Math.pow((dx * dx + dy * dy),pow)
                
                    if(j==4){

                        fuerzaNetaX += 12*gravedad * (dx) / d
                        fuerzaNetaY += 12*gravedad * (dy) / d
                    }else{
                        if (d > dmin && d < dmax) {
                        
                        fuerzaNetaX += listaDeMasas[j]*gravedad * (dx) / d
                        fuerzaNetaY += listaDeMasas[j]*gravedad * (dy) / d
                    }
                    if (d<1){
                        listaParticulasVelocidades[j]=listaParticulasVelocidades[i]
                        listaParticulasVelocidades[j+1]=listaParticulasVelocidades[i+1]
                    }
                }
            }
        }
        listaVel[i] += fuerzaNetaX / listaDeMasas[i]
        listaVel[i + 1] += fuerzaNetaY / listaDeMasas[i]
    }
}
function borrarPantalla() {
    grafico.fillStyle = 'gray'
    grafico.fillRect(0, 0, anchuraGrafico, alturaGrafico)
}
let perdidaDeEnergiaPorcentual = 0.8
function trabajoDeBordes(listaXY, i) {
    if (listaXY[i] <= 0) {
        listaParticulasVelocidades[i] *= -1 * perdidaDeEnergiaPorcentual
        listaXY[i] = 1
    } else if (listaXY[i] >= anchuraGrafico) {
        listaParticulasVelocidades[i] *= -1 * perdidaDeEnergiaPorcentual
        listaXY[i] = anchuraGrafico - 1
    }

    if (listaXY[i + 1] <= 0) {
        listaParticulasVelocidades[i + 1] *= -1 * perdidaDeEnergiaPorcentual
        listaXY[i + 1] = 1
    } else if (listaXY[i + 1] >= alturaGrafico) {
        listaParticulasVelocidades[i + 1] *= -1 * perdidaDeEnergiaPorcentual
        listaXY[i + 1] = alturaGrafico - 1
    }
}

function leyDeInercia(listaXY) {
    for (let i = 0; i < listaXY.length; i += 2) {
        trabajoDeBordes(listaXY, i)
        listaXY[i] += listaParticulasVelocidades[i]
        listaXY[i + 1] += listaParticulasVelocidades[i + 1]
    }


}

setInterval(update, 10)


crearParticulasXYrandom(100)
listaDeMasas[4]=1000
listaParticulasVelocidades[4]=0
listaParticulasVelocidades[5]=0
listaParticulas[4]=anchuraGrafico/2
listaParticulas[5]=alturaGrafico/2
function update() {
    borrarPantalla()
    rule(listaParticulas, listaParticulasVelocidades, 1, 1.9,21,600)
    leyDeInercia(listaParticulas)
    dibujarParticulas(listaParticulas, 'red')

}
