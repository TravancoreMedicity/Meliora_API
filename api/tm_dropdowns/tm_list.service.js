const { pool } = require('../../config/database')
module.exports = {

    getProjectList: (callBack) => {
        pool.query(
            `SELECT 
            tm_project_slno,
            tm_project_name 
            FROM tm_project_mast  order by tm_project_name ASC`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getGoalsList: (callBack) => {
        pool.query(
            `SELECT 
            tm_goals_slno,
            tm_goal_name 
            FROM tm_goal_mast  order by tm_goal_name ASC`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}