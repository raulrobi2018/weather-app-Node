import dotenv from "dotenv";

import {
    inquirerMenu,
    leerInput,
    listarLugares,
    pausa
} from "./helpers/inquirer.js";
import {Busquedas} from "./models/busquedas.js";

dotenv.config();

const main = async () => {
    let opt = "";
    const busquedas = new Busquedas();

    do {
        //Esperamos a que tengamos resuelto el menú para imprimir en pantalla
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput("Ciudad: ");

                //Buscar los lugares
                const lugares = await busquedas.buscarCiudad(termino);

                //Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === "0") continue;
                const lugarSel = lugares.find((l) => l.id === id);

                //Guardar en historial
                busquedas.agregarHistorial(lugarSel.nombre);

                //Clima
                const climaActual = await busquedas.obtenerClimaLugar(
                    lugarSel.lat,
                    lugarSel.lng
                );

                //Mostrar resultados

                console.clear();
                console.log("\nInformación de la ciudad\n".green.underline);
                console.log("Ciudad: ".green + lugarSel.nombre);
                console.log("Lat: ".green + lugarSel.lat);
                console.log("Lng: ".green + lugarSel.lng);
                console.log("Temperatura: ".green + climaActual.temp);
                console.log("Mínima: ".green + climaActual.temp_min);
                console.log("Máxima: ".green + climaActual.temp_max);
                console.log("Como está el clima: ".green + climaActual.desc);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, index) => {
                    const idx = `${index + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
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
