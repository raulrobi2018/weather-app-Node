import {inquirerMenu, leerInput, pausa} from "./helpers/inquirer.js";
import {Busquedas} from "./models/busquedas.js";

const main = async () => {
    let opt = "";
    const busqueda = new Busquedas();

    do {
        //Esperamos a que tengamos resuelto el menú para imprimir en pantalla
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await leerInput("Ciudad: ");
                console.log(lugar);

                //Buscar los lugares

                //Seleccionar el lugar

                //Clima

                //Mostrar resultados

                console.log("Información de la ciudad\n".green);
                console.log("Ciudad:");
                console.log("Lat:");
                console.log("Lng:");
                console.log("Temperatura:");
                console.log("Mínima:");
                console.log("Máxima:");
                break;
            case 2:
                break;
            default:
                break;
        }

        if (opt !== 0) {
            await pausa();
        }
    } while (opt !== 0);
};

main();
