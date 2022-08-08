import inquirer from "inquirer";
import colors from "colors";

const questions = [
    {
        type: "list",
        name: "option",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: 1,
                name: `${"1.".green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${"2.".green} Historial`
            },
            {
                value: 0,
                name: `${"0.".green} Salir`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log("===============================".green);
    console.log("  Seleccione una opción   ".white);
    console.log("===============================\n".green);

    const {option} = await inquirer.prompt(questions);

    return option;
};

const pausa = async () => {
    console.log("\n");
    await inquirer.prompt({
        type: "input",
        name: "question",
        message: `\nPresione ${"ENTER".green} para continuar\n`
    });
};

const leerInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Ingrese un valor";
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((t, index) => {
        return {value: t.id, name: `${index + 1} `.green + t.desc};
    });

    //Agregamos una opción a las choices
    choices.unshift({
        value: "0",
        name: "0.".green + " Cancelar"
    });

    const preguntas = [{type: "list", name: "id", message: "Borrar", choices}];

    const {id} = await inquirer.prompt(preguntas);
    return id;
};

const confirmar = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);

    return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((t, index) => {
        return {
            value: t.id,
            name: `${index + 1} `.green + t.desc,
            checked: t.completadaEn ? true : false
        };
    });

    const pregunta = [
        {type: "checkbox", name: "ids", message: "Seleccione", choices}
    ];

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
};

export {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
};
