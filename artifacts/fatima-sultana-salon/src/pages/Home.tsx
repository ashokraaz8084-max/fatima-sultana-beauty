import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { Scissors, Droplet, Sparkles, Star, CheckCircle, ChevronDown, Calendar, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Phone number is required"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a preferred date"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      date: "",
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    const text = `Hi, I would like to book an appointment.\nName: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nPreferred Date: ${data.date}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/971581191176?text=${encodedText}`, '_blank');
    toast({
      title: "Opening WhatsApp",
      description: "Redirecting to WhatsApp to complete your booking.",
    });
    form.reset();
  };

  const services = [
    { title: "Henna Design", description: "Traditional and contemporary henna designs for hands and feet", img: "/images/service-henna.png", icon: <Star className="w-5 h-5 text-accent" /> },
    { title: "Hair Cut & Styling", description: "Expert cuts and styling for all hair types", img: "/images/service-haircut.png", icon: <Scissors className="w-5 h-5 text-accent" /> },
    { title: "Waxing", description: "Smooth, gentle full-body waxing services", img: "/images/service-waxing.png", icon: <Droplet className="w-5 h-5 text-accent" /> },
    { title: "Face Bleach", description: "Brightening face bleach for radiant glowing skin", img: "/images/service-bleach.png", icon: <Sparkles className="w-5 h-5 text-accent" /> },
    { title: "Blow Dry", description: "Professional blow dry for silky smooth hair", img: "/images/service-blowdry.png", icon: <Scissors className="w-5 h-5 text-accent" /> },
    { title: "Wavy Hair Styling", description: "Beautiful waves and curls crafted to perfection", img: "/images/service-wavy.png", icon: <Scissors className="w-5 h-5 text-accent" /> },
    { title: "Eyebrow & Lashes", description: "Precision eyebrow shaping and lash extensions", img: "/images/service-eyebrow.png", icon: <Sparkles className="w-5 h-5 text-accent" /> },
    { title: "Facial & Beauty Care", description: "Deep cleansing and nourishing facial treatments", img: "/images/service-facial.png", icon: <Droplet className="w-5 h-5 text-accent" /> },
  ];

  const galleryImages = [
    "/images/service-haircut.png",
    "/images/service-blowdry.png",
    "/images/service-facial.png",
    "/images/service-henna.png",
    "/images/hero.png",
    "/images/service-waxing.png",
    "/images/service-eyebrow.png",
    "/images/about.png",
    "/images/service-wavy.png",
  ];

  const reviews = [
    { name: "Aisha Al Mansoori", rating: 5, text: "Absolutely amazing experience! The henna design was breathtaking and the staff made me feel like royalty. Will definitely be back.", service: "Henna Design" },
    { name: "Fatima Khalil", rating: 5, text: "The home service is a game changer. They came to my villa in Shabiya and did a full facial + blow dry. Absolutely professional and hygienic.", service: "Home Service" },
    { name: "Mariam Al Zaabi", rating: 5, text: "Best blow dry I've ever had in Abu Dhabi. My hair was silky and shiny for days. The salon atmosphere is so elegant and relaxing.", service: "Blow Dry" },
    { name: "Sara Hassan", rating: 5, text: "I've tried many salons across Abu Dhabi but Fatima Sultana is truly in a class of its own. The beauticians are so skilled and caring.", service: "Facial & Beauty Care" },
    { name: "Noura Al Rashidi", rating: 5, text: "The waxing service was so gentle and thorough. The ladies are very experienced and the salon is spotlessly clean. Highly recommended!", service: "Waxing" },
    { name: "Hessa Al Dhaheri", rating: 5, text: "Came for a bridal henna before my wedding and I was speechless. The design was more beautiful than I imagined. Thank you so much!", service: "Henna Design" },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary/30">
      
      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/971581191176" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#128C7E] transition-all hover:scale-110 flex items-center justify-center group"
        data-testid="fab-whatsapp"
      >
        <FaWhatsapp className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-foreground px-3 py-1 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us
        </span>
      </a>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer" onClick={() => scrollToSection('home')}>
            <span className="font-serif text-2xl font-semibold tracking-tight text-primary">Fatima Sultana</span>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">Ladies Beauty Saloon</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['Home', 'About', 'Services', 'Pricing', 'Gallery', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-primary transition-colors hover-elevate no-default-hover-elevate relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                data-testid={`nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
            <Button 
              onClick={() => window.open('https://wa.me/971581191176', '_blank')}
              className="rounded-full px-6 font-semibold"
              data-testid="nav-book-now"
            >
              Book Now
            </Button>
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col pt-24 px-6 md:hidden"
          >
            <button className="absolute top-6 right-6 p-2" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8 text-foreground" />
            </button>
            <div className="flex flex-col gap-6 text-xl font-serif text-center mt-10">
              {['Home', 'About', 'Services', 'Pricing', 'Gallery', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="hover:text-primary transition-colors py-2"
                >
                  {item}
                </button>
              ))}
              <Button 
                onClick={() => window.open('https://wa.me/971581191176', '_blank')}
                className="mt-6 rounded-full py-6 text-lg"
              >
                Book Appointment
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-secondary/60 -z-20"></div>
        {/* Luxury background pattern */}
        <div className="absolute inset-0 opacity-[0.025] -z-10" style={{backgroundImage: "repeating-linear-gradient(45deg, hsl(340,60%,72%) 0, hsl(340,60%,72%) 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px"}} />
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-primary/12 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-10 right-1/3 w-48 h-48 bg-primary/6 rounded-full blur-2xl -z-10"></div>
        {/* Gold thin line at top */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        
        <div className="container mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 text-center md:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-primary/20 px-4 py-2 rounded-full w-fit mx-auto md:mx-0 shadow-sm">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium tracking-wide text-foreground/80">Abu Dhabi's Trusted Beauty Destination</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight text-foreground">
              Fatima Sultana <br />
              <span className="text-primary italic">Ladies Beauty</span> Saloon
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-lg mx-auto md:mx-0">
              Premium Ladies Beauty Services at Your Doorstep. Experience unhurried, polished, and exquisitely crafted care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
              <Button size="lg" className="rounded-full text-base px-8 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all" onClick={() => scrollToSection('contact')} data-testid="hero-book-appointment">
                Book Appointment
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base px-8 h-14 border-primary/30 hover:bg-primary/5 transition-all" onClick={() => window.open('tel:+97158619276')} data-testid="hero-call">
                <FaPhoneAlt className="mr-2 w-4 h-4 text-primary" /> Call Now
              </Button>
            </div>
            <div className="mt-4">
               <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mx-auto md:mx-0 group">
                 Explore our services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-t-full rounded-b-[4rem] transform rotate-3 scale-105 -z-10"></div>
            <motion.img 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              src="/images/hero.png" 
              alt="Luxury Salon Interior" 
              className="rounded-t-full rounded-b-[4rem] shadow-2xl object-cover w-full h-[600px] border-4 border-white/50"
            />
            
            <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                <Star className="fill-current w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg leading-none text-foreground">5.0</p>
                <p className="text-xs text-muted-foreground font-medium">Top Rated Salon</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
          <ChevronDown className="w-8 h-8 text-primary/60" />
        </div>
      </section>

      {/* Luxury Marquee Strip */}
      <div className="bg-gradient-to-r from-[#c25b7a] via-primary to-[#d4789a] py-3 overflow-hidden">
        <div className="flex gap-0 animate-[marquee_30s_linear_infinite] whitespace-nowrap w-max">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8 text-white/90 text-xs uppercase tracking-[0.2em] font-semibold">
              <span>Henna Design</span>
              <Star className="w-3 h-3 fill-white/60 text-white/60 shrink-0" />
              <span>Hair Styling</span>
              <Star className="w-3 h-3 fill-white/60 text-white/60 shrink-0" />
              <span>Waxing</span>
              <Star className="w-3 h-3 fill-white/60 text-white/60 shrink-0" />
              <span>Facial Care</span>
              <Star className="w-3 h-3 fill-white/60 text-white/60 shrink-0" />
              <span>Blow Dry</span>
              <Star className="w-3 h-3 fill-white/60 text-white/60 shrink-0" />
              <span>Eyebrow &amp; Lashes</span>
              <Star className="w-3 h-3 fill-white/60 text-white/60 shrink-0" />
              <span>Home Service Available</span>
              <Star className="w-3 h-3 fill-white/60 text-white/60 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-secondary rounded-[2rem] transform -rotate-3 -z-10"></div>
              <img src="/images/about.png" alt="Facial Treatment" className="rounded-[2rem] shadow-xl w-full object-cover h-[500px]" />
              
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] hidden sm:block">
                <p className="font-serif text-4xl text-primary font-bold mb-1">5+</p>
                <p className="text-sm text-muted-foreground font-medium leading-tight">Years of Excellence in Beauty Care</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-sm uppercase tracking-widest text-primary font-semibold">Our Story</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">Welcome to Fatima Sultana</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-lg">
                Fatima Sultana Ladies Beauty Saloon provides professional ladies beauty services with a dedicated home service facility in Abu Dhabi. 
              </p>
              <p className="text-muted-foreground font-light leading-relaxed text-lg">
                We offer premium care, hygienic service, and experienced beauticians dedicated to making every woman feel beautiful and confident in a luxurious, safe environment.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                {['Experienced Beauticians', 'Premium Care', 'Hygienic Service', 'Home Service Available'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-medium text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-8 border-t border-border/50">
                {[
                  { value: '500+', label: 'Happy Clients' },
                  { value: '8+', label: 'Services' },
                  { value: '5+', label: 'Years Exp.' },
                  { value: '24/7', label: 'Home Service' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-serif text-primary font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">What We Offer</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Our Premium Services</h3>
            <p className="text-muted-foreground font-light text-lg">Experience our curated selection of luxury beauty treatments designed to enhance your natural radiance.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                key={i}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl border border-primary/10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white h-full flex flex-col">
                  <div className="h-52 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    {/* Gold icon badge overlaid on image */}
                    <div className="absolute bottom-4 left-4 z-20 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center border border-accent/30 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <span className="group-hover:text-white transition-colors text-accent">{service.icon}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-serif text-lg mb-2 text-foreground group-hover:text-primary transition-colors font-semibold">{service.title}</h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed flex-1">{service.description}</p>
                    <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-primary/70 font-semibold">Book Now</span>
                      <button
                        onClick={() => window.open('https://wa.me/971581191176', '_blank')}
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary transition-colors group/btn"
                        data-testid={`service-book-${i}`}
                      >
                        <FaWhatsapp className="w-4 h-4 text-primary group-hover/btn:text-white transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-28 relative overflow-hidden" style={{background: "linear-gradient(135deg, hsl(340,30%,98%) 0%, hsl(0,0%,100%) 50%, hsl(38,60%,98%) 100%)"}}>
        {/* Decorative corner ornaments */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/4 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/60" />
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Investment in Beauty</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/60" />
            </div>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Our Price List</h3>
            <p className="text-muted-foreground font-light text-lg">Transparent pricing for our premium services. Exceptional value, exquisite results.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Henna */}
            {[
              {
                icon: <Star className="w-5 h-5" />, title: "Henna Design", items: [
                  { name: "Elegant (Simple)", price: "25 AED" },
                  { name: "Classic", price: "50 AED" },
                  { name: "Detailed", price: "100 AED" },
                  { name: "Premium", price: "150 AED" },
                  { name: "Luxury", price: "200 AED" },
                  { name: "Bridal", price: "300 AED" },
                ]
              },
              {
                icon: <Droplet className="w-5 h-5" />, title: "Waxing", items: [
                  { name: "Full Hand Wax", price: "70 AED" },
                  { name: "Half Hand Wax", price: "25 AED" },
                  { name: "Full Leg Wax", price: "70 AED" },
                  { name: "Half Leg Wax", price: "25 AED" },
                ]
              },
              {
                icon: <Sparkles className="w-5 h-5" />, title: "Beauty Combo", highlight: true, items: [
                  { name: "Half Leg + Half Hand + Full Face Bleach", price: "55 AED" },
                ]
              },
              {
                icon: <Scissors className="w-5 h-5" />, title: "Hair Styling & Blow Dry", items: [
                  { name: "Blow Dry — Short Hair", price: "30 AED" },
                  { name: "Blow Dry — Long Hair", price: "50 AED" },
                  { name: "Hair Styling — Fair Hair", price: "30 AED" },
                  { name: "Full Hair Wavy", price: "80 AED" },
                  { name: "Half Hair Wavy", price: "50 AED" },
                ]
              },
            ].map((cat, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
                className={`rounded-3xl border ${cat.highlight ? 'border-accent/40 bg-gradient-to-br from-accent/8 to-primary/6' : 'border-primary/10 bg-white'} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}
              >
                {/* Card header */}
                <div className={`px-7 py-5 flex items-center gap-3 border-b ${cat.highlight ? 'border-accent/20 bg-gradient-to-r from-accent/10 to-primary/5' : 'border-primary/8 bg-secondary/40'}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.highlight ? 'bg-accent text-white' : 'bg-primary/15 text-primary'}`}>
                    {cat.icon}
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-foreground">{cat.title}</h4>
                  {cat.highlight && (
                    <span className="ml-auto text-xs bg-accent text-white px-3 py-1 rounded-full font-semibold uppercase tracking-wide">Best Value</span>
                  )}
                </div>
                {/* Items */}
                <div className="px-7 py-4 space-y-0">
                  {cat.items.map((item, ii) => (
                    <div key={ii} className="flex justify-between items-center py-3.5 border-b border-border/30 last:border-0 group/item">
                      <span className="text-sm font-medium text-foreground/75 group-hover/item:text-foreground transition-colors">{item.name}</span>
                      <span className="font-serif text-primary font-bold text-base ml-4 shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-xs text-muted-foreground/70 italic">* Prices may vary based on specific requirements and hair length. Please consult with our staff.</p>
          </motion.div>
        </div>
      </section>

      {/* Home Service Banner */}
      <section id="home-service" className="relative overflow-hidden">
        {/* Deep pink gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c25b7a] via-primary to-[#d4789a]" />
        {/* Light shimmer overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,220,200,0.15),transparent_60%)]" />
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 border border-white/10" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5 border border-white/10" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-white/5" />

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: headline + CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-primary-foreground"
            >
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full mb-8">
                <FaMapMarkerAlt className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold tracking-widest uppercase">Abu Dhabi Home Service</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-6">
                Luxury Beauty <br />
                <span className="italic opacity-90">at Your Doorstep</span>
              </h2>

              <p className="text-lg font-light text-white/85 leading-relaxed mb-4 max-w-md">
                Can't come to us? We come to you. Our skilled beauticians bring the full salon experience — premium products, hygienic tools, and expert care — directly to your home anywhere in Abu Dhabi.
              </p>
              <p className="text-sm uppercase tracking-widest font-semibold text-white/60 mb-10">
                Serving Shabiya ME10 &amp; All Abu Dhabi Areas
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all text-base font-semibold shadow-2xl"
                  onClick={() => window.open('https://wa.me/971581191176', '_blank')}
                  data-testid="home-service-whatsapp"
                >
                  <FaWhatsapp className="mr-2 w-5 h-5 text-[#25D366]" /> WhatsApp: +971 58 119 1176
                </Button>
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-transparent border-2 border-white/60 text-white hover:bg-white/10 transition-all text-base"
                  onClick={() => window.open('tel:+971581191176')}
                  data-testid="home-service-call"
                >
                  <FaPhoneAlt className="mr-2 w-4 h-4" /> Call Now
                </Button>
              </div>
            </motion.div>

            {/* Right: feature tiles */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: <Sparkles className="w-6 h-6" />, title: "All Services Available", desc: "Full menu of salon treatments at your home" },
                { icon: <CheckCircle className="w-6 h-6" />, title: "100% Hygienic", desc: "Sterilised tools, disposable covers, clean setup" },
                { icon: <Star className="w-6 h-6" />, title: "Expert Beauticians", desc: "Trained professionals with years of experience" },
                { icon: <FaMapMarkerAlt className="w-6 h-6" />, title: "All Abu Dhabi Areas", desc: "Shabiya, Khalifa, Musaffah & more" },
                { icon: <FaPhoneAlt className="w-5 h-5" />, title: "Easy Booking", desc: "One WhatsApp message is all it takes" },
                { icon: <FaWhatsapp className="w-6 h-6" />, title: "Quick Response", desc: "We confirm your slot within minutes" },
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="bg-white/12 backdrop-blur-sm border border-white/15 rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white mb-3 group-hover:bg-white/30 transition-colors">
                    {feat.icon}
                  </div>
                  <h4 className="text-white font-semibold text-sm leading-snug mb-1">{feat.title}</h4>
                  <p className="text-white/65 text-xs font-light leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Our Gallery</h3>
            <p className="text-muted-foreground font-light text-lg">A glimpse into our luxurious space and the exquisite results we deliver.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 auto-rows-[200px] md:auto-rows-[300px]">
            {galleryImages.map((src, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                key={i}
                className={`relative group overflow-hidden rounded-xl cursor-pointer ${i === 0 || i === 4 ? 'row-span-2' : ''}`}
                onClick={() => setActiveImage(src)}
              >
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
                </div>
                <img src={src} alt={`Gallery image ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2">
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={activeImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews Section */}
      <section id="reviews" className="py-28 relative overflow-hidden bg-white">
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full mb-5">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-semibold tracking-widest uppercase text-primary">Client Love</span>
              <Star className="w-4 h-4 text-accent fill-accent" />
            </div>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-5">What Our Clients Say</h3>
            <p className="text-muted-foreground font-light text-lg">Trusted by hundreds of ladies across Abu Dhabi. Here is what they have to say about their experience.</p>
          </motion.div>

          {/* 5-star summary bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 bg-secondary/50 border border-primary/10 rounded-3xl py-6 px-10 max-w-lg mx-auto shadow-sm"
          >
            <div className="text-center">
              <p className="text-6xl font-serif font-bold text-primary leading-none">5.0</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-border/50 hidden sm:block" />
            <div className="text-center">
              <div className="flex gap-1 justify-center mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-6 h-6 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">500+ Happy Clients</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-testid={`review-card-${i}`}
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-primary/8 h-full flex flex-col group hover:-translate-y-1">
                  {/* Gold quote mark */}
                  <span className="absolute -top-4 left-8 text-6xl text-accent/30 font-serif leading-none select-none">"</span>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-foreground/75 font-light leading-relaxed text-sm flex-1 mb-6 italic">
                    "{review.text}"
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-5" />

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center shrink-0 text-white font-serif font-semibold text-lg shadow-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground font-serif leading-tight">{review.name}</p>
                      <p className="text-xs text-primary/80 mt-0.5 font-medium tracking-wide">{review.service}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA below reviews */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-14"
          >
            <p className="text-muted-foreground font-light mb-6">Ready to experience the difference yourself?</p>
            <Button
              size="lg"
              className="rounded-full px-10 h-14 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              onClick={() => window.open('https://wa.me/971581191176', '_blank')}
              data-testid="reviews-book-cta"
            >
              <FaWhatsapp className="mr-2 w-5 h-5" /> Book Your Appointment
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white border-t border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">Get in Touch</h2>
                <h3 className="text-4xl font-serif text-foreground mb-6">Contact Us</h3>
                <p className="text-muted-foreground font-light text-lg mb-8">Ready for your transformation? Book an appointment or contact us for any inquiries.</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg font-serif mb-1">Location</h4>
                    <p className="text-muted-foreground">Shabiya ME10<br/>Abu Dhabi - U.A.E</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <FaPhoneAlt className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg font-serif mb-1">Phone</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center justify-between gap-4">
                        <span>Salon: +971 58 619 2276</span>
                        <Button size="sm" variant="outline" className="h-8 text-xs rounded-full border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10" onClick={() => window.open('https://wa.me/971586192276', '_blank')}>WhatsApp</Button>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Home Service: +971 58 119 1176</span>
                        <Button size="sm" variant="outline" className="h-8 text-xs rounded-full border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10" onClick={() => window.open('https://wa.me/971581191176', '_blank')}>WhatsApp</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <Star className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg font-serif mb-1">Owner</h4>
                    <p className="text-muted-foreground">Sameera Shareef</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking Form */}
            <div className="bg-secondary/40 p-8 md:p-10 rounded-[2rem] shadow-sm border border-border/50">
              <h3 className="text-2xl font-serif text-foreground mb-6">Book an Appointment</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" className="bg-white border-none shadow-sm h-12 rounded-xl" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+971 50 123 4567" type="tel" className="bg-white border-none shadow-sm h-12 rounded-xl" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Select Service</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white border-none shadow-sm h-12 rounded-xl">
                              <SelectValue placeholder="Choose a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl">
                            {services.map(s => (
                              <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
                            ))}
                            <SelectItem value="Home Service">Home Service Request</SelectItem>
                            <SelectItem value="Multiple">Multiple Services</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Preferred Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="date" className="bg-white border-none shadow-sm h-12 rounded-xl pr-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full h-14 rounded-xl text-lg font-semibold bg-primary hover:bg-primary/90 mt-4" data-testid="form-submit">
                    Send via WhatsApp
                  </Button>
                </form>
              </Form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#402A30] text-primary-foreground pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-b border-white/10 pb-16">
            
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold tracking-tight text-white mb-1">Fatima Sultana</h3>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/60">Ladies Beauty Saloon</p>
              </div>
              <p className="text-white/70 font-light leading-relaxed max-w-sm">
                Abu Dhabi's premier destination for luxury ladies beauty care. Where elegance meets expertise.
              </p>
              <div className="flex gap-4 mt-2">
                <a href="https://wa.me/971581191176" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-xl font-semibold mb-6 text-white">Our Services</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                {services.map(s => (
                  <li key={s.title}>
                    <button onClick={() => scrollToSection('services')} className="text-white/70 hover:text-primary transition-colors text-sm text-left">
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-xl font-semibold mb-6 text-white">Contact Info</h4>
              <ul className="space-y-4 text-white/70 text-sm">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-4 h-4 mt-1 shrink-0 text-primary" />
                  <span>Shabiya ME10, Abu Dhabi, UAE</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="w-4 h-4 shrink-0 text-primary" />
                  <span>+971 58 619 2276</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="w-4 h-4 shrink-0 text-primary" />
                  <span>+971 58 119 1176 (Home Service)</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50 text-center md:text-left">
            <p>© {new Date().getFullYear()} Fatima Sultana Ladies Beauty Saloon. All Rights Reserved.</p>
            <p className="flex items-center gap-1 justify-center">
              Made with <span className="text-primary mx-1">♥</span> in Abu Dhabi
            </p>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
