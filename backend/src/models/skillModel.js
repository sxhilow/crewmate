import pool from "../config/db.js"
import { NotFoundError } from "../errors/index.js"

export const searchSkillsService = async(searchItem) => {

    let searchResults;

    if(searchResults && searchResults.trim() !== ""){
        searchResults = await pool.query("SELECT name FROM skills WHERE name ILIKE $1 ORDER BY name LIMIT 10", [`%${searchItem}%`]) 
    }else{
        searchResults = await pool.query("SELECT name FROM skills LIMIT 10") 
    }

    if(searchResults.rows.length === 0 || !searchResults){
        throw new NotFoundError("No skills Found")
    }

    const option = searchResults.rows.map((skill) => ({
        option: skill.name,
        result: skill.name
    }))

    return option;
}