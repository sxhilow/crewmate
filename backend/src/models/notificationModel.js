import pool from "../config/db.js"
import { NotFoundError } from "../errors/index.js"

export const getAllNotificationsService = async (userId) => {
    const notifications = await pool.query(`SELECT n.*, u.username AS actor_username, p.title AS project_title, p.tagline AS project_tagline
                                            FROM notifications n
                                            JOIN users u ON n.actor_id = u.id
                                            LEFT JOIN projects p ON n.project_id = p.id
                                            LEFT JOIN project_requests pr ON n.request_id = pr.id
                                            WHERE n.user_id=$1 AND (n.request_id IS NULL OR pr.status='pending')
                                            ORDER BY n.created_at DESC`, [userId])

    if(!notifications.rows){
        throw new NotFoundError("No notifications found")
    }

    return notifications.rows
}