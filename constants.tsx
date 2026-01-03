
import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  isLoggedIn: false,
  settings: {
    primaryColor: '#2563eb', // blue-600
    accentColor: '#4f46e5', // indigo-600
    fontFamily: 'Inter',
    siteName: 'Sugeos Tech Systems',
    tagline: 'Innovating the Future of Digital Solutions',
    logo: '',
    seo: {
      title: 'Sugeos Tech Systems | Premier Software Development Agency',
      description: 'We build world-class digital products including web apps, mobile apps, and enterprise solutions.',
      keywords: 'software development, web design, mobile apps, AI solutions, Sugeos Tech Systems'
    },
    layout: {
      showStats: true,
      showTestimonials: true,
      showNewsletter: true,
    }
  },
  content: {
    hero: {
      title: 'Transforming Ideas into Digital Excellence',
      subtitle: 'We are a full-cycle software development company delivering cutting-edge solutions for startups and enterprises worldwide.',
      cta: 'Explore Our Services'
    },
    about: {
      title: 'About Sugeos Tech Systems',
      text: 'Founded in 2020, Sugeos Tech Systems has quickly grown into a leading technology partner for businesses looking to innovate. Our team of expert engineers, designers, and strategists are dedicated to pushing the boundaries of what is possible in the digital realm.',
      mission: 'To empower businesses through scalable, reliable, and innovative technology solutions.',
      vision: 'To be the global benchmark for excellence in software engineering and digital transformation.'
    }
  },
  services: [
    {
      id: '1',
      title: 'Web Development',
      description: 'Modern, responsive, and high-performance web applications built with the latest technologies.',
      icon: 'Monitor'
    },
    {
      id: '2',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile experiences that engage users and drive growth.',
      icon: 'Smartphone'
    },
    {
      id: '3',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and serverless architectures for maximum reliability.',
      icon: 'Cloud'
    },
    {
      id: '4',
      title: 'AI & Data Science',
      description: 'Leveraging machine learning to unlock insights and automate complex business processes.',
      icon: 'Cpu'
    }
  ],
  products: [
    {
      id: 'p1',
      title: 'Nexus ERP',
      description: 'A comprehensive resource planning tool for small to medium manufacturing enterprises.',
      image: 'https://picsum.photos/seed/nexus/600/400',
      category: 'Enterprise'
    },
    {
      id: 'p2',
      title: 'SwiftPay',
      description: 'A secure and lighting-fast payment gateway for the modern web.',
      image: 'https://picsum.photos/seed/swiftpay/600/400',
      category: 'Fintech'
    },
    {
      id: 'p3',
      title: 'HealthLink',
      description: 'Connecting patients with providers through a unified telemedicine platform.',
      image: 'https://picsum.photos/seed/healthlink/600/400',
      category: 'Healthcare'
    }
  ],
  posts: [
    {
      id: 'b1',
      title: 'The Future of Web Development in 2025',
      excerpt: 'Exploring the impact of WebAssembly and AI-driven development tools on the modern web stack.',
      content: 'The landscape of web development is shifting rapidly...',
      author: 'Sugeos Team',
      date: '2024-10-15',
      image: 'https://picsum.photos/seed/tech1/800/600',
      tags: ['Development', 'Trends']
    },
    {
      id: 'b2',
      title: 'Why Cloud-Native is the Only Way Forward',
      excerpt: 'How building for the cloud from day one can save your business time and money.',
      content: 'Cloud-native architecture isn\'t just a buzzword...',
      author: 'John Doe',
      date: '2024-09-22',
      image: 'https://picsum.photos/seed/tech2/800/600',
      tags: ['Cloud', 'Architecture']
    }
  ]
};
