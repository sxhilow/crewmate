import pool from "../config/db.js"
import { NotFoundError } from "../errors/index.js"

export const searchSkillsService = async(searchItem) => {

    let searchResults;

    if(searchItem && searchItem.trim() !== ""){
        searchResults = await pool.query("SELECT id, name FROM skills WHERE name ILIKE $1 ORDER BY name LIMIT 10", [`%${searchItem}%`]) 
    }else{
        searchResults = await pool.query("SELECT * FROM skills LIMIT 10") 
    }

    if(searchResults.rows.length === 0 || !searchResults){
        throw new NotFoundError("No skills Found")
    }

    const option = searchResults.rows.map((skill) => ({
        label: skill.name,
        value: skill.id
    }))

    return option;
}