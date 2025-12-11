-- Supabase Schema for Ajil Finance Website
-- Run this in your Supabase SQL Editor

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financing Applications Table
CREATE TABLE IF NOT EXISTS financing_applications (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  national_id VARCHAR(20) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  financing_type VARCHAR(100) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  duration_months INTEGER NOT NULL,
  monthly_income DECIMAL(15, 2) NOT NULL,
  employer VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'under_review')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- News Articles Table
CREATE TABLE IF NOT EXISTS news_articles (
  id BIGSERIAL PRIMARY KEY,
  title_ar VARCHAR(500) NOT NULL,
  title_en VARCHAR(500) NOT NULL,
  excerpt_ar TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offers Table
CREATE TABLE IF NOT EXISTS offers (
  id BIGSERIAL PRIMARY KEY,
  title_ar VARCHAR(500) NOT NULL,
  title_en VARCHAR(500) NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  badge_ar VARCHAR(100) NOT NULL,
  badge_en VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE financing_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read access to news" ON news_articles FOR SELECT USING (true);
CREATE POLICY "Allow public read access to offers" ON offers FOR SELECT USING (is_active = true);

-- Policies for public insert access
CREATE POLICY "Allow public newsletter subscription" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public contact submission" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public financing application" ON financing_applications FOR INSERT WITH CHECK (true);

-- Insert sample data for news
INSERT INTO news_articles (title_ar, title_en, excerpt_ar, excerpt_en, content_ar, content_en, category, image_url, published_at) VALUES
('أجل للتمويل تفوز بجائزتين من منشآت', 'Abdul Latif Jameel Finance wins two awards from Monshaat', 'حصدت شركة أجل للتمويل جائزتين من هيئة المنشآت الصغيرة والمتوسطة تقديراً لجهودها في دعم ريادة الأعمال', 'Abdul Latif Jameel Finance has won two awards from the Small and Medium Enterprises Authority in recognition of its efforts in supporting entrepreneurship', 'المحتوى الكامل للخبر...', 'Full news content...', 'awards', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop', NOW() - INTERVAL '2 days'),
('شراكة استراتيجية مع آنت انترناشيونال لدعم المنشآت', 'Strategic partnership with Ant International to support enterprises', 'أعلنت أجل للتمويل عن شراكة جديدة مع آنت انترناشيونال لتقديم حلول مالية مبتكرة', 'Abdul Latif Jameel Finance announced a new partnership with Ant International to provide innovative financial solutions', 'المحتوى الكامل للخبر...', 'Full news content...', 'partnerships', 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop', NOW() - INTERVAL '5 days'),
('إطلاق خدمة التمويل الرقمي الفوري عبر التطبيق', 'Launch of instant digital financing service via the app', 'أطلقت الشركة خدمة جديدة تتيح للعملاء الحصول على موافقة تمويلية فورية عبر التطبيق', 'The company launched a new service that allows customers to get instant financing approval through the app', 'المحتوى الكامل للخبر...', 'Full news content...', 'services', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop', NOW() - INTERVAL '10 days');

-- Insert sample data for offers
INSERT INTO offers (title_ar, title_en, description_ar, description_en, badge_ar, badge_en, image_url) VALUES
('عروض تمويل تويوتا', 'Toyota Financing Offers', 'استمتع بعروض تمويل حصرية على جميع موديلات تويوتا الجديدة بدون دفعة أولى', 'Enjoy exclusive financing offers on all new Toyota models with no down payment', 'عرض محدود', 'Limited Offer', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=500&fit=crop'),
('تمويل نقدي فوري', 'Instant Cash Financing', 'احصل على تمويل نقدي يصل إلى 500,000 ريال بموافقة خلال دقائق', 'Get cash financing up to 500,000 SAR with approval within minutes', 'جديد', 'New', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=500&fit=crop');
