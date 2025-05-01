import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xipnmoxsjuogfvoramfm.supabase.co'; // your actual URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcG5tb3hzanVvZ2Z2b3JhbWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NjgwMTQsImV4cCI6MjA2MTE0NDAxNH0.KASzKITk-jLL4I6HuayMWo1vv8xqGUE7qVWwbk0GPX4'; // your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

