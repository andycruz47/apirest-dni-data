import { pool } from "../db.js";

export const getpersons = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM persona");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getperson = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params)
    const [rows] = await pool.query("SELECT * FROM persona WHERE dni = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "person not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteperson = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM persona WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "person not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createperson = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO persona (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.status(201).json({ id: rows.insertId, name, salary });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateperson = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE persona SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "person not found" });

    const [rows] = await pool.query("SELECT * FROM persona WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
