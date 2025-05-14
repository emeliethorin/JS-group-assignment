// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xwukfmzjqrmtdhbxzxsp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3dWtmbXpqcXJtdGRoYnh6eHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NjI0MzgsImV4cCI6MjA2MjQzODQzOH0.mU6t1msvqSSUC8KYaY8jn_LU23a16Svjbl3NcIzlXvM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
