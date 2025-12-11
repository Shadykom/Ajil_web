export interface Database {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          id: number
          email: string
          subscribed_at: string
          created_at: string
        }
        Insert: {
          email: string
          subscribed_at?: string
        }
        Update: {
          email?: string
          subscribed_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: number
          name: string
          email: string
          phone: string
          message: string
          subject: string
          submitted_at: string
          created_at: string
        }
        Insert: {
          name: string
          email: string
          phone: string
          message: string
          subject: string
          submitted_at?: string
        }
        Update: {
          name?: string
          email?: string
          phone?: string
          message?: string
          subject?: string
        }
      }
      financing_applications: {
        Row: {
          id: number
          full_name: string
          national_id: string
          phone: string
          email: string
          financing_type: string
          amount: number
          duration_months: number
          monthly_income: number
          employer: string
          status: 'pending' | 'approved' | 'rejected' | 'under_review'
          submitted_at: string
          created_at: string
        }
        Insert: {
          full_name: string
          national_id: string
          phone: string
          email: string
          financing_type: string
          amount: number
          duration_months: number
          monthly_income: number
          employer: string
          status?: 'pending' | 'approved' | 'rejected' | 'under_review'
          submitted_at?: string
        }
        Update: {
          status?: 'pending' | 'approved' | 'rejected' | 'under_review'
        }
      }
      news_articles: {
        Row: {
          id: number
          title_ar: string
          title_en: string
          excerpt_ar: string
          excerpt_en: string
          content_ar: string
          content_en: string
          category: string
          image_url: string
          published_at: string
          created_at: string
        }
        Insert: {
          title_ar: string
          title_en: string
          excerpt_ar: string
          excerpt_en: string
          content_ar: string
          content_en: string
          category: string
          image_url: string
          published_at?: string
        }
        Update: {
          title_ar?: string
          title_en?: string
          excerpt_ar?: string
          excerpt_en?: string
          content_ar?: string
          content_en?: string
          category?: string
          image_url?: string
          published_at?: string
        }
      }
      offers: {
        Row: {
          id: number
          title_ar: string
          title_en: string
          description_ar: string
          description_en: string
          badge_ar: string
          badge_en: string
          image_url: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          title_ar: string
          title_en: string
          description_ar: string
          description_en: string
          badge_ar: string
          badge_en: string
          image_url: string
          is_active?: boolean
        }
        Update: {
          title_ar?: string
          title_en?: string
          description_ar?: string
          description_en?: string
          badge_ar?: string
          badge_en?: string
          image_url?: string
          is_active?: boolean
        }
      }
    }
  }
}

export interface NewsArticle {
  id: number
  title_ar: string
  title_en: string
  excerpt_ar: string
  excerpt_en: string
  content_ar: string
  content_en: string
  category: string
  image_url: string
  published_at: string
}

export interface Offer {
  id: number
  title_ar: string
  title_en: string
  description_ar: string
  description_en: string
  badge_ar: string
  badge_en: string
  image_url: string
  is_active: boolean
}

export interface FinancingApplication {
  full_name: string
  national_id: string
  phone: string
  email: string
  financing_type: string
  amount: number
  duration_months: number
  monthly_income: number
  employer: string
}
