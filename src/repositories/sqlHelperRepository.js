const { QueryTypes } = require('sequelize');
const sequelize = require('../database/connection');

class SqlHelperRepository {
    async executeSQLQuery(sqlQuery) {
        try {
            const results = await sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
            return results;
        } catch (error) {
            console.error('Error executing SQL query:', error);
            throw error;
        }
    }
}

module.exports = new SqlHelperRepository();