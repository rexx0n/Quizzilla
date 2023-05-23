
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

const supabase = createClient('https://huqamqzpidbjfvpoqdti.supabase.co/', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cWFtcXpwaWRiamZ2cG9xZHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NDA0NzUsImV4cCI6MjAwMDQxNjQ3NX0.X0jVOJpS1fI3bnjkcWHWQhMloHgXxGXWrFsI-SHJObs')
export default supabase