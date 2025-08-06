import pg from '../db/index.js';
import { successRes } from '../utils/successRes.js';


class BaseController {
    async create(req, res) {
        try {
            const tableName = req.params?.table;
            const values = Object.values(req.body);
            const keys = Object.keys(req.body);
            const Doller = values.map((itm, index) => `$${index + 1}`).join(',');

            const sorov = ` INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${Doller}) RETURNING *`

            const natija = await pg.query(sorov, values);
            const data = natija.rows[0];

            return successRes(res, data, 201);
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async getAll(req, res) {
        try {
            const tableName = req.params?.table;
            const sorov = `SELECT * FROM ${tableName}`;
            const natija = await pg.query(sorov);

            return successRes(res, natija.rows);
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async getById(req, res) {
        try {
            const tableName = req.params?.table;
            const id = req.params?.id;
            const sorov = ` SELECT * FROM ${tableName} WHERE id = ${id}`;

            const natija = await pg.query(sorov)
            const data = natija.rows[0]

            return successRes(res, data)
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }


    async update(req, res) {
        try {
            const tableName = req.params?.table;
            const id = req.params?.id;
            const body = req.body;
            const values = Object.values(body);
            const keys = Object.keys(body);
            const Doller = keys.map((itm, index) => `${itm}=($${index + 1})`).join(',')

            const sorov = `UPDATE ${tableName} SET ${Doller} WHERE id = ${id} RETURNING *`

            const natija = await pg.query(sorov, values)

            return successRes(res, natija.rows[0])
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async delete(req, res) {
        try {
            const tableName = req.params?.table;
            const id = req.params?.id;

            const sorov = `DELETE FROM ${tableName} WHERE id = ${id}`

            await pg.query(sorov);

            return successRes(res, {})
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }


}

export default BaseController;

