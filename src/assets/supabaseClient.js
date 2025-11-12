import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
const supabaseApi = import.meta.env.VITE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseApi);

export default supabase;
