import conn from "@/utils/db";

async function handler(req: { body: { content: any; }; }, res: any) {
  try {
    console.log("req nom", req.body);
    const query = "INSERT INTO posts(content) VALUES($1)";
    const values = [req.body.content];
    const result = await conn.query(query, values);
    console.log("ttt", result);
    res.end()
} catch (error) {
    console.log(error);
  }
}

export default handler;
