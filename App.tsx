
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Monitor, Smartphone, Cloud, Cpu, 
  Github, Linkedin, Twitter, Mail, MapPin, Phone, Settings, 
  Plus, Edit, Trash, Save, LogOut, Layout, Image as ImageIcon,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { AppState, BlogPost, Service, Product } from './types';
import { loadState, saveState } from './store';

// Context for global state
const AppStateContext = createContext<{
  state: AppState;
  updateState: (newState: Partial<AppState>) => void;
} | undefined>(undefined);

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
};

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useAppState();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold font-outfit text-slate-900">{state.settings.siteName}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Get Started
            </Link>
            {state.isLoggedIn && (
              <Link to="/admin" className="p-2 text-slate-500 hover:text-blue-600">
                <Settings className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in fade-in slide-in-from-top-4">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-slate-700 border-b border-slate-100 last:border-0"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 text-center bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { state } = useAppState();
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold font-outfit text-white">{state.settings.siteName}</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Empowering businesses worldwide with scalable, reliable, and innovative digital solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Mobile Applications</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Cloud Infrastructure</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">AI & Data Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Stay updated with the latest tech trends and agency news.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-xs">
          <p>© {new Date().getFullYear()} Sugeos Tech Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Pages
const Home = () => {
  const { state } = useAppState();
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-600 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            Building the Next Generation of Apps
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold font-outfit text-slate-900 leading-tight mb-8">
            {state.content.hero.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            {state.content.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all"
            >
              {state.content.hero.cta}
            </Link>
            <Link 
              to="/products" 
              className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      {state.settings.layout.showStats && (
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-slate-500 font-medium">Projects Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">40+</div>
                <div className="text-slate-500 font-medium">Expert Engineers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-slate-500 font-medium">Client Retention</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">12+</div>
                <div className="text-slate-500 font-medium">Global Awards</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Overview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-outfit mb-4">Comprehensive Solutions</h2>
            <p className="text-slate-600">We offer end-to-end services tailored to your specific business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {state.services.map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {service.icon === 'Monitor' && <Monitor className="w-6 h-6" />}
                  {service.icon === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                  {service.icon === 'Cloud' && <Cloud className="w-6 h-6" />}
                  {service.icon === 'Cpu' && <Cpu className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.description}</p>
                <Link to="/services" className="text-blue-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32" />
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">Ready to start your next project?</h2>
          <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto">
            Our team is standing by to help you navigate your digital transformation journey. Let's build something amazing together.
          </p>
          <Link to="/contact" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-slate-50 transition-all">
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

const About = () => {
  const { state } = useAppState();
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold font-outfit text-slate-900 mb-8">{state.content.about.title}</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              {state.content.about.text}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-700 mb-2">Our Mission</h4>
                <p className="text-sm text-blue-600/80">{state.content.about.mission}</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-2">Our Vision</h4>
                <p className="text-sm text-slate-600">{state.content.about.vision}</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/teamwork/800/600" 
              alt="Our Team" 
              className="rounded-3xl shadow-2xl shadow-slate-200"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-slate-900">100% Client Satisfaction</div>
                <div className="text-xs text-slate-500">Based on recent audits</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet Our Experts</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Our leadership team brings decades of combined experience in software architecture and design.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img 
                  src={`https://picsum.photos/seed/person${i}/400/500`} 
                  alt="Team member" 
                  className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-bold text-xl mb-1">Expert Name {i}</h3>
              <p className="text-blue-600 text-sm font-medium mb-3">Senior Software Architect</p>
              <div className="flex gap-3">
                <a href="#" className="p-1.5 bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all"><Linkedin className="w-4 h-4" /></a>
                <a href="#" className="p-1.5 bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all"><Twitter className="w-4 h-4" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const { state } = useAppState();
  return (
    <div className="pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-outfit">Our Software Products</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Discover the enterprise solutions we've built to solve real-world problems.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {state.products.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-64">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {product.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{product.description}</p>
                <button className="w-full py-3 bg-slate-50 text-slate-900 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                  Request Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const { state } = useAppState();
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-outfit">Insights & News</h1>
            <p className="text-slate-600">Thoughts on the future of tech and our agency updates.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {state.posts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative rounded-3xl overflow-hidden mb-6 aspect-video">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">{tag}</span>
                ))}
              </div>
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{post.title}</h2>
              <p className="text-slate-600 mb-6 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div>
                  <div className="text-sm font-bold">{post.author}</div>
                  <div className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString()}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-outfit">Let's build something together</h1>
            <p className="text-slate-600 text-lg mb-12">
              Have a question or a project in mind? We'd love to hear from you.
            </p>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">Email Us</div>
                  <div className="text-slate-600">hello@sugeos.tech</div>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">Call Us</div>
                  <div className="text-slate-600">+1 (555) 000-0000</div>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">Visit Us</div>
                  <div className="text-slate-600">123 Tech Avenue, Silicon Valley, CA</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 lg:p-12 rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-slate-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">First Name</label>
                    <input type="text" required className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Last Name</label>
                    <input type="text" required className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input type="email" required className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Subject</label>
                  <select className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500">
                    <option>General Inquiry</option>
                    <option>New Project</option>
                    <option>Partnership</option>
                    <option>Careers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Message</label>
                  <textarea rows={4} required className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const { state, updateState } = useAppState();
  const [activeTab, setActiveTab] = useState<'content' | 'settings' | 'blog' | 'products'>('content');
  const [passcode, setPasscode] = useState('');
  
  if (!state.isLoggedIn) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center px-4 bg-slate-100">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-slate-500">Enter your credentials to manage the site.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Admin Passcode</label>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Hint: 1234"
              />
            </div>
            <button 
              onClick={() => {
                if (passcode === '1234') {
                  updateState({ isLoggedIn: true });
                } else {
                  alert('Incorrect passcode');
                }
              }}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            {[
              { id: 'content', icon: Layout, label: 'Page Content' },
              { id: 'blog', icon: Edit, label: 'Blog Posts' },
              { id: 'products', icon: Monitor, label: 'Products' },
              { id: 'settings', icon: Settings, label: 'Site Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 hover:bg-blue-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
            <button 
              onClick={() => updateState({ isLoggedIn: false })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 bg-white hover:bg-red-50 mt-10"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              {activeTab === 'content' && (
                <div className="space-y-10">
                  <h2 className="text-2xl font-bold mb-6">Edit Page Content</h2>
                  <div className="grid grid-cols-1 gap-8">
                    {/* Hero Section */}
                    <div className="p-6 bg-slate-50 rounded-2xl">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Layout className="w-5 h-5" /> Hero Section
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title</label>
                          <input 
                            type="text" 
                            value={state.content.hero.title}
                            onChange={(e) => updateState({ content: { ...state.content, hero: { ...state.content.hero, title: e.target.value } } })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Subtitle</label>
                          <textarea 
                            value={state.content.hero.subtitle}
                            onChange={(e) => updateState({ content: { ...state.content, hero: { ...state.content.hero, subtitle: e.target.value } } })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                    {/* About Section */}
                    <div className="p-6 bg-slate-50 rounded-2xl">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" /> About Us
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Main Description</label>
                          <textarea 
                            value={state.content.about.text}
                            onChange={(e) => updateState({ content: { ...state.content, about: { ...state.content.about, text: e.target.value } } })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'blog' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm">
                      <Plus className="w-4 h-4" /> New Post
                    </button>
                  </div>
                  <div className="space-y-4">
                    {state.posts.map(post => (
                      <div key={post.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-4">
                          <img src={post.image} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <div className="font-bold">{post.title}</div>
                            <div className="text-xs text-slate-400">{post.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit className="w-5 h-5" /></button>
                          <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash className="w-5 h-5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold">Site Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold mb-2">Agency Name</label>
                        <input 
                          type="text" 
                          value={state.settings.siteName}
                          onChange={(e) => updateState({ settings: { ...state.settings, siteName: e.target.value } })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">Primary Color</label>
                        <input 
                          type="color" 
                          value={state.settings.primaryColor}
                          onChange={(e) => updateState({ settings: { ...state.settings, primaryColor: e.target.value } })}
                          className="w-full h-10 p-1 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold mb-2">SEO Description</label>
                        <textarea 
                          value={state.settings.seo.description}
                          onChange={(e) => updateState({ settings: { ...state.settings, seo: { ...state.settings.seo, description: e.target.value } } })}
                          className="w-full px-4 py-2 border rounded-lg"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Manage Products</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm">
                      <Plus className="w-4 h-4" /> Add Product
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {state.products.map(product => (
                      <div key={product.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                         <img src={product.image} className="w-16 h-16 rounded-xl object-cover" />
                         <div className="flex-1">
                            <div className="font-bold">{product.title}</div>
                            <div className="text-xs text-slate-500 uppercase">{product.category}</div>
                         </div>
                         <button className="p-2 text-slate-400 hover:text-red-600"><Trash className="w-5 h-5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end sticky bottom-8">
              <button 
                onClick={() => {
                   saveState(state);
                   alert('All changes saved successfully to LocalStorage!');
                }}
                className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-2xl shadow-xl shadow-green-200 hover:bg-green-700 hover:-translate-y-1 transition-all"
              >
                <Save className="w-5 h-5" /> Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// State Provider
const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(loadState());

  useEffect(() => {
    // Sync SEO titles
    document.title = state.settings.seo.title;
  }, [state.settings.seo.title]);

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <AppStateContext.Provider value={{ state, updateState }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Main App
function App() {
  return (
    <AppStateProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Home />} /> {/* Services is anchor/page hybrid */}
              <Route path="/products" element={<Products />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppStateProvider>
  );
}

export default App;
