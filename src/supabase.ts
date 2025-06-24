import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wxynvqlvsnfnjnexmudq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4eW52cWx2c25mbmpuZXhtdWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTE5NjEsImV4cCI6MjA2NjM2Nzk2MX0.DMeeZ32rsEyLhY9XNQG2mwnrdzKMDoFEC2o7A8TuO2g"; // Paste your anon (public) key here

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
