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


const getProjects = (req, res) => {

    db.all(
        `SELECT * FROM projects ORDER BY sort_order ASC, id ASC`,
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


const getExperience = (req, res) => {

    db.all(
        `SELECT * FROM experience ORDER BY sort_order ASC, id ASC`,
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


const getEducation = (req, res) => {

    db.all(
        `SELECT * FROM education ORDER BY sort_order ASC, id ASC`,
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


const createMessage = (req, res) => {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            error: "الاسم والبريد الإلكتروني والرسالة كلها مطلوبة"
        });
    }

    db.run(
        `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`,
        [name, email, message],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                name,
                email,
                message
            });
        }
    );

};


module.exports = {
    getProfile,
    getSkills,
    getProjects,
    getExperience,
    getEducation,
    createMessage
};
