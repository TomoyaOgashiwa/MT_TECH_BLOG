import { Database } from "@/type/database/SupabaseTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Client側で使用するsupabase
export const supabaseClient = createClientComponentClient<Database>();
