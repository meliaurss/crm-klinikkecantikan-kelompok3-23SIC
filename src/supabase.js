import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://odoamrsapwahlmaechol.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kb2FtcnNhcHdhaGxtYWVjaG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNzc1NTUsImV4cCI6MjA2NTk1MzU1NX0.WoXKubADup0Ja3Bn6a8X8wchQgXuPEFOlA60bxrOuK0'
export const supabase = createClient(supabaseUrl, supabaseKey)