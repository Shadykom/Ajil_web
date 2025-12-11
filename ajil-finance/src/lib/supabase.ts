import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Newsletter subscription
export async function subscribeToNewsletter(email: string) {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email, subscribed_at: new Date().toISOString() }])
    .select()
  
  if (error) throw error
  return data
}

// Contact form submission
export async function submitContactForm(formData: {
  name: string
  email: string
  phone: string
  message: string
  subject: string
}) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{ ...formData, submitted_at: new Date().toISOString() }])
    .select()
  
  if (error) throw error
  return data
}

// Financing application
export async function submitFinancingApplication(applicationData: {
  full_name: string
  national_id: string
  phone: string
  email: string
  financing_type: string
  amount: number
  duration_months: number
  monthly_income: number
  employer: string
}) {
  const { data, error } = await supabase
    .from('financing_applications')
    .insert([{ ...applicationData, submitted_at: new Date().toISOString(), status: 'pending' }])
    .select()
  
  if (error) throw error
  return data
}

// Get news articles
export async function getNewsArticles(limit = 6) {
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

// Get offers
export async function getOffers(active = true) {
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('is_active', active)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}
