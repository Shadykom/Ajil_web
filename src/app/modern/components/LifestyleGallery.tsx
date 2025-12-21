'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Star,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface Story {
  id: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  testimonialAr?: string;
  testimonialEn?: string;
  customerName?: string;
  customerRole?: string;
}

const stories: Story[] = [
  {
    id: '1',
    type: 'video',
    src: 'https://cdn.coverr.co/videos/coverr-happy-family-on-a-road-trip-8469/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80',
    titleAr: 'رحلة عائلية',
    titleEn: 'Family Journey',
    subtitleAr: 'مع أجل، كل وجهة ممكنة',
    subtitleEn: 'With AJIL, every destination is possible',
    testimonialAr: 'حصلت على سيارة العائلة خلال أسبوع واحد فقط!',
    testimonialEn: 'Got our family car in just one week!',
    customerName: 'Ahmed Al-Rashid',
    customerRole: 'Happy Customer',
  },
  {
    id: '2',
    type: 'video',
    src: 'https://cdn.coverr.co/videos/coverr-young-businessman-working-late-at-night-8354/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
    titleAr: 'طموح بلا حدود',
    titleEn: 'Boundless Ambition',
    subtitleAr: 'نمو أعمالك يبدأ من هنا',
    subtitleEn: 'Your business growth starts here',
    testimonialAr: 'ساعدني أجل في توسيع مشروعي الصغير',
    testimonialEn: 'AJIL helped me expand my small business',
    customerName: 'Sara Mohammed',
    customerRole: 'Business Owner',
  },
  {
    id: '3',
    type: 'video',
    src: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-city-at-night-4400/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80',
    titleAr: 'مدن المستقبل',
    titleEn: 'Cities of Tomorrow',
    subtitleAr: 'نبني المستقبل معاً',
    subtitleEn: 'Building the future together',
    testimonialAr: 'تمويل سريع وخدمة احترافية',
    testimonialEn: 'Fast financing and professional service',
    customerName: 'Khalid Al-Harbi',
    customerRole: 'Entrepreneur',
  },
  {
    id: '4',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&q=80',
    titleAr: 'حياة جديدة',
    titleEn: 'New Beginnings',
    subtitleAr: 'كل حلم يستحق التحقيق',
    subtitleEn: 'Every dream deserves to come true',
    testimonialAr: 'بفضل أجل، حققت حلمي',
    testimonialEn: 'Thanks to AJIL, I achieved my dream',
    customerName: 'Noura Al-Salem',
    customerRole: 'New Home Owner',
  },
];

export default function LifestyleGallery() {
  const { language, dir } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeStory = stories[activeIndex];
  const isRTL = dir === 'rtl';

  // Auto-advance stories
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % stories.length);
          return 0;
        }
        return prev + 1;
      });
    }, 80); // ~8 seconds per story

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToStory = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const nextStory = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length);
    setProgress(0);
  };

  const prevStory = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
    setProgress(0);
  };

  return (
    <section className="py-24 bg-[#00377B] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#0066B3]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F7941D]/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#F7941D] text-sm font-semibold mb-4">
            <Heart className="w-4 h-4" />
            {language === 'ar' ? 'قصص النجاح' : 'Success Stories'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {language === 'ar' ? 'حياة يومية مع أجل' : 'Everyday Life with AJIL'}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'اكتشف كيف ساعدنا آلاف العملاء في تحقيق أحلامهم'
              : 'Discover how we helped thousands of customers achieve their dreams'}
          </p>
        </motion.div>

        {/* Story Viewer */}
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
            {/* Progress Bars */}
            <div className="absolute top-4 left-4 right-4 z-20 flex gap-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStory(index)}
                  className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                >
                  <motion.div
                    className="h-full bg-white"
                    style={{
                      width: index === activeIndex ? `${progress}%` : index < activeIndex ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </button>
              ))}
            </div>

            {/* Media */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {activeStory.type === 'video' ? (
                  <video
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                    poster={activeStory.poster}
                  >
                    <source src={activeStory.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={activeStory.src}
                    alt={language === 'ar' ? activeStory.titleAr : activeStory.titleEn}
                    fill
                    className="object-cover"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Navigation Arrows */}
            <button
              onClick={prevStory}
              className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors z-20`}
            >
              {isRTL ? <ArrowRight className="w-6 h-6 text-white" /> : <ArrowLeft className="w-6 h-6 text-white" />}
            </button>
            <button
              onClick={nextStory}
              className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors z-20`}
            >
              {isRTL ? <ArrowLeft className="w-6 h-6 text-white" /> : <ArrowRight className="w-6 h-6 text-white" />}
            </button>

            {/* Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
              </button>
              {activeStory.type === 'video' && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                </button>
              )}
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {language === 'ar' ? activeStory.titleAr : activeStory.titleEn}
                  </h3>
                  <p className="text-xl text-white/80 mb-6">
                    {language === 'ar' ? activeStory.subtitleAr : activeStory.subtitleEn}
                  </p>

                  {/* Testimonial Card */}
                  {activeStory.testimonialAr && (
                    <motion.div
                      className="inline-flex items-center gap-4 bg-white/95 backdrop-blur-md rounded-2xl p-4"
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#F7941D] flex items-center justify-center">
                        <Star className="w-6 h-6 text-white fill-white" />
                      </div>
                      <div>
                        <p className="text-[#00377B] font-semibold">
                          "{language === 'ar' ? activeStory.testimonialAr : activeStory.testimonialEn}"
                        </p>
                        <p className="text-sm text-[#0066B3]">
                          {activeStory.customerName} - {activeStory.customerRole}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Story Thumbnails */}
          <div className="flex justify-center gap-4 mt-8">
            {stories.map((story, index) => (
              <motion.button
                key={story.id}
                onClick={() => goToStory(index)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                  index === activeIndex ? 'border-[#F7941D]' : 'border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={story.poster || story.src}
                  alt=""
                  fill
                  className="object-cover"
                />
                {index === activeIndex && (
                  <motion.div
                    className="absolute inset-0 bg-[#F7941D]/30"
                    layoutId="activeStoryThumb"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
