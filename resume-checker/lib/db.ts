"use server";

import { neon } from "@neondatabase/serverless";

export async function getDbConnection() {
  if (!process.env.Database_URL) {
    throw new Error("neon Database url is not found ");
  }

  const sql = neon(process.env.Database_URL);
  console.log("dbconnection is right !");

  return sql;
}
