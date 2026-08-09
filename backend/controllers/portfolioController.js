const db = require("../config/db");


const getProfile = (req, res) => {

    db.get(
       `SELECT * FROM profile LIMIT 1`,
        [],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(row);
        }
    );

};


const getSkills = (req, res) => {

    db.all(
        `SELECT * FROM skills`,
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);
        }
    );

};


module.exports = {
    getProfile,
    getSkills
};