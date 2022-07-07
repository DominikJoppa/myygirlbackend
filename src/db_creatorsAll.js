import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { supabase } from "./config/supabase.js";

export const { data, error } = await supabase
  .from('creators')
  .select()
console.log(data); 