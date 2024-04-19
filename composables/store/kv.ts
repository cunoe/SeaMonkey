export interface KVData {
  key: string;
  value: string;
}
import Database from "tauri-plugin-sql-api";

export async function getKV(key: string): Promise<string> {
  const db = await Database.load("sqlite:data.db");
  return db.select("SELECT * FROM properties WHERE key = ? LIMIT 1", [key]).then((res: any) => {
    console.log(res)
    if (res.length > 0) {
      return res[0].value
    } else {
      return '';
    }
  });
}

export async function saveKV(key: string, value: string): Promise<number> {
  const db = await Database.load("sqlite:data.db");
  return db.execute("INSERT OR REPLACE INTO properties (key, value) VALUES (?, ?)", [key, value]).then((res) => {
    return res.rowsAffected;
  });
}