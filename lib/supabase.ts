import { createClient } from '@supabase/supabase-js';

// ดึงค่าจาก .env ถ้าไม่มีให้ใช้ค่า String ตรงๆ (ใส่ URL และ Anon Key จริงของคุณลงไป)
const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://evqpvyzmmhuymrdfkbkb.supabase.co';

const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2cXB2eXptbWh1eW1yZGZrYmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MTI3ODEsImV4cCI6MjEwMTk4ODc4MX0.2M0kemfVVHYxrArjNIcIpU3nmyJuWB9WPQpp7eZAev4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);