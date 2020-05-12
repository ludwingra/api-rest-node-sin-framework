const { bodyParser } = require('../lib/bodyParser');
const response = require('../helper/response')

let taskController = {};

let database = [];

taskController.getTaskHandler = async (req, res) => {
    await response.ok(res, 200, JSON.stringify(database));
}

taskController.createTaskHandler = async (req, res) => {
    try {
        await bodyParser(req);
        database.push(req.body);
        await response.okCreate(res, 201, JSON.stringify(database));
    } catch (error) {
        await response.error(res, 400, 'Invalid Data');
    }
}

taskController.updateTaskHandler = async (req, res) => {
    try {
        const { url } = req;

        let idQuery = url.split('?')[1]; // id=2
        let idKey = idQuery.split('=')[0];
        let idValue = idQuery.split('=')[1];

        if (idKey === 'id') {
            await bodyParser(req);
            // Busca y actualiza
            database[idValue - 1] = req.body;
            // Respuesta ok
            await response.okCreate(res, 201, JSON.stringify(database))

        } else {
            // Respuesta error
            await response.error(res, 400, 'Invalid request Query');
        }
    } catch (error) {
        // Respuesta error
        await response.error(res, 400, 'Invalid Body Data was provided', error.message);

    }
}

taskController.deleteTaskHandler = async (req, res) => {
    try {
        const { url } = req;

        let idQuery = url.split('?')[1]; // id=2
        let idKey = idQuery.split('=')[0];
        let idValue = idQuery.split('=')[1];
        if (idKey === 'id') {
            // Respuesta Ok
            database.splice(idValue - 1, 1);
            await response.ok(res, { message: 'Delete succesfully' });
        } else {
            await response.error(res, 400, 'Invalid Query')
        }
    } catch (error) {
        await response.error(res, 400, 'Invalid Body Data was provided', error.message);
    }
}

module.exports = taskController;