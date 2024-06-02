const { Pool } = require('pg')

const config = {
    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    port: process.env.PORT
}

const pool = new Pool (config)

// consultar todos los estudiantes
const consultarTodos = async () => {
    try {
        const sql = 'SELECT * FROM estudiantes'

    const queryObject = {
        text:sql,
        values: [],
        rowMode: 'array'
    }
    const response= await pool.query(queryObject)
    console.log(response.rows)
    } catch (error) {
        console.error("Se ha producido un error", error)
    }
}

// node index.js nuevo 'Brian May' '12.345.678-9' guitarra 7

// agregar estudiante
const agregarEstudiante = async () => {
    try {
        const sql = 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [process.argv[3], process.argv[4], process.argv[5], Number(process.argv[6])];
        
        const queryObject = {
            text : sql,
            values: values,
            rowMode: 'array'
        }
    
        const response = await pool.query(queryObject)
        console.log(`Estudiante ${result.rows[0].nombre} agregado con éxito`)
    } catch (error) {
        console.error("Se ha producido un error", error)
    }
}

// editar estudiante  node index.js editar 'Brian May' '12.345.678-9' guitarra 10
const actualizarEstudiante = async () => {
    try {
        const sql = 'Actualizar estudiantes SET nombre = $2, curso = $3 ,nivel = $4 WHERE rut = $1'
    const values = [process.argv[4], process.argv[3], process.argv[5],process.argv[6]]

    const queryObject = {
        text : sql,
        values: values,
        rowMode: 'array'
    }

    const response= await pool.query(queryObject)
    console.log(`Estudiante ${values[1]} editado con éxito`)
    } catch (error) {
        console.error("Se ha producido un error", error)
    }
}

 // consultar por rut 
 const consultarPorRut = async () => {
    try {
        const sql = 'SELECT * FROM estudiantes WHERE rut = $1'
        const values = [process.argv[4]]

        const queryObject = {
            text : sql,
            values: values,
            rowMode: 'array'
        }

        const response = await pool.query(queryObject)
        console.log(response.rows)
    } catch (error) {
        console.error("Se ha producido un error",error)
    }
}

const eliminarEstudiante = async () => {
    try {
        const sql = 'DELETE * FROM estudiantes WHERE rut = $1'
        const values= [process.argv[4]]
    
        const queryObject = {
            text : sql,
            values: values,
            rowMode: 'array'
        }
    
        const response = await pool.query(queryObject)
        console.log(`estudiante con rut ${process.argv[4]}eliminado con éxito`)
    } catch (error) {
        console.error("Se ha producido un error", error)
    }
   }


const inpt = process.argv[2];
// para elegir opción
switch (inpt) {
    case "agregar":
        agregarEstudiante()
        break;
    case "consultarTodos":
        consultarTodos()
        break;
    case "rut":
        consultarPorRut()
        break;
    case "editar":
        actualizarEstudiante()
        break;
    case "eliminar":
        eliminarEstudiante();
        break;
    default:

        break;
}