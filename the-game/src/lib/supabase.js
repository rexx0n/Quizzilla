
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

const supabase = createClient('https://hbfmnhsfdoztjbpwiazd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZm1uaHNmZG96dGpicHdpYXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI1Njc1MDUsImV4cCI6MTk3ODE0MzUwNX0.q55-HVNv0f8V5y8vVhZ4XwI5o8FvAy0QW7PtB10v4Ws')
export default supabase