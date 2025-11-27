import { createClient } from '@supabase/supabase-js'

// Vite 환경 변수는 import.meta.env로 접근
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || ''
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || ''

// 디버깅용
console.log('Supabase URL from env:', supabaseUrl ? 'Set' : 'Not set');
console.log('Supabase Key from env:', supabaseAnonKey ? 'Set' : 'Not set');

// 환경 변수가 없어도 에러 없이 동작하도록 처리
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any

