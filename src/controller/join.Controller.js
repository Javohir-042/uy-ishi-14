import BaseController from "./base.controller.js";
import pg from "../db/index.js";
import { successRes } from "../utils/successRes.js";


class JoinController extends BaseController {
    async join(req, res) {
        try {
            const query = `SELECT 
            admin.id AS admin_id,
            admin.name AS admin_name,
            dokon.id AS dokon_id,
            dokon.name AS dokon_name,
            account.id AS account_id,
            account.name AS account_nomi
            FROM admin
            JOIN dokon ON admin.id = dokon.adminid
            left JOIN account ON account.adminid = admin.id;
            `

            const data = await pg.query(query);
            const natija = data.rows;

            return successRes(res, natija);
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
}

export default new JoinController();

// returning  => ohirgi qoshganini qaytarib beradi 
