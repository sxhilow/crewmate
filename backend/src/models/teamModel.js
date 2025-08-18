import pool from "../config/db.js"
import { BadRequestError, NotFoundError } from "../errors/index.js";

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

export const getTeamService = async (teamId, userId) => {

    const authCheck = await pool.query("SELECT 1 FROM team_members WHERE team_id=$1 AND user_id=$2", [teamId, userId]);

    if(!authCheck.rows || authCheck.rows.length === 0){
        throw new BadRequestError("Team dosen't exists");
    }
    const teamWithMembers = await pool.query(`SELECT t.id AS team_id, t.name AS team_name, u.name, u.username, u.id AS member_id 
                                    FROM teams t
                                    JOIN team_members tm ON tm.team_id = t.id
                                    JOIN users u ON u.id = tm.user_id
                                    WHERE t.id = $1`, [teamId]);

    if (!teamWithMembers.rows || teamWithMembers.rows.length === 0) {
        throw new NotFoundError("Team not found");
    }


    const member = teamWithMembers.rows.map((row) => ({
        id: row.member_id,
        name: row.name,
        username: row.username
    }))

    return {
        id: teamWithMembers.rows[0].team_id,
        name: teamWithMembers.rows[0].team_name,
        member: member
    }
}