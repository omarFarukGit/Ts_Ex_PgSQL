import express from "express";
import type { Application, Request, Response } from "express";
import config from "./config/dotenv.config";
import { Pool } from "pg";
const app: Application = express();
const port = config.port;

app.use(express.json());
const pool = new Pool({
  connectionString: config.connectionString,
});

const initDB = async () => {
  try {
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS users2(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      age INT
      )
    `,
    );
    console.log("db connect succefully");
  } catch (error: any) {
    console.log("db not connect succefully", { error });
  }
};

app.post("/api/user", express.json(), async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO users2(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *
      `,
      [name, email, password, age],
    );

    console.log(result);
    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users2
      `);
    res.status(200).json({
      success: true,
      message: "users get successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
  SELECT *FROM users2 WHERE id=$1
  `,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "get user successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM users2 WHERE id=$1 
      `,
      [id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "delete user successfully",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age } = req.body;
  try {
    const result = await pool.query(
      `
      UPDATE users2 SET name=$1,
      password=$2,
      age= COALESCE($3,age) WHERE id=$4 RETURNING *

      `,
      [name, password, age, id],
    );
       if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "updated user successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

await initDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
