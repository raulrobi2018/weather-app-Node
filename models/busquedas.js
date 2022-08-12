import axios from "axios";
import fs from "fs";

class Busquedas {
    historial = [];
    dbPath = "./db/database.json";

    constructor() {
        this.leerBD();
    }

    get historialCapitalizado() {
        let historialCapitalizado = [];
        if (this.historial) {
            this.historial.forEach((lugar) => {
                historialCapitalizado.push(
                    lugar
                        .split(" ")
                        .map((l) => l.charAt(0).toUpperCase() + l.slice(1))
                        .join(" ")
                );
            });
        }

        return historialCapitalizado;
    }

    get paramsMapbox() {
        return {
            limit: 5,
            language: "es",
            access_token: process.env.MAPBOX_KEY
        };
    }

    async buscarCiudad(lugar = "") {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map((lugar) => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
        } catch (error) {
            return [];
        }

        return [];
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPEN_WEATHER,
            units: "metric",
            lang: "es"
        };
    }

    async obtenerClimaLugar(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon}
            });

            const resp = await instance.get();
            const {main, weather} = resp.data;
            return {
                desc: weather[0].description,
                temp_min: main.temp_min,
                temp_max: main.temp_max,
                temp: main.temp
            };
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = "") {
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        //Solo mantengo 6 registros
        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        //Grabar en BD
        this.grabaBD();
    }

    grabaBD() {
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerBD() {
        if (!fs.existsSync(this.dbPath)) {
            return null;
        }

        const info = fs.readFileSync(this.dbPath, {encoding: "utf-8"});
        const data = JSON.parse(info);

        this.historial = data.historial;
    }
}

export {Busquedas};
