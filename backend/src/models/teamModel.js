import pool from "../config/db.js"
import { BadRequestError } from "../errors/index.js";

export const getAllteamsService = async (userId) => {
    const userTeams = await pool.query(`SELECT t.*, COUNT(tm2.user_id) AS member_count FROM teams t
                                        JOIN team_members tm ON tm.team_id = t.id
                                        LEFT JOIN team_members tm2 ON tm2.team_id = t.id
                                        WHERE tm.user_id=$1
                                        GROUP BY t.id`, [userId]);
    if(!userTeams.rows || userTeams.rows.length === 0){
        throw new BadRequestError("User not in any team")
    }

    return userTeams.rows
}