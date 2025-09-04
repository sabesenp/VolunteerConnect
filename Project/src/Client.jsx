import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL = "https://kdiavpfconxxwpplptey.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaWF2cGZjb254eHdwcGxwdGV5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTg5MzM1OCwiZXhwIjoyMDQ3NDY5MzU4fQ.wExYA6Fnx_og6V05rUNBA1NhijHSffibUWNWRu2RF3Y";

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
