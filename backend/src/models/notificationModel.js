import pool from "../config/db.js"
import { NotFoundError } from "../errors/index.js"

export const getAllNotificationsService = async (userId) => {
    const notifications = await pool.query(`SELECT n.*, u.username AS actor_username FROM notifications n
                                            JOIN users u ON n.actor_id = u.id
                                            WHERE n.user_id=$1 ORDER BY created_at DESC`, [userId])

    if(!notifications.rows){
        throw new NotFoundError("No notifications found")
    }

    return notifications.rows
}