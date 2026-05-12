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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary -z-20"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>
        
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
              <Button size="lg" className="rounded-full text-base px-8 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all" onClick={() => window.open('https://wa.me/971581191176', '_blank')} data-testid="hero-whatsapp">
                <FaWhatsapp className="mr-2 w-5 h-5" /> WhatsApp Booking
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i}
              >
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 group bg-white h-full">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  </div>
                  <CardContent className="p-6 relative">
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                       {service.icon}
                    </div>
                    <h4 className="font-serif text-xl mb-2 text-foreground group-hover:text-primary transition-colors">{service.title}</h4>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Investment in Beauty</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Our Price List</h3>
            <p className="text-muted-foreground font-light text-lg">Transparent pricing for our premium services. Exceptional value for exquisite results.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Column 1 */}
            <div className="space-y-10">
              {/* Henna */}
              <div>
                <h4 className="font-serif text-2xl text-primary border-b border-primary/20 pb-2 mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5" /> Henna Design
                </h4>
                <div className="flex justify-between items-center py-3 border-b border-border/50 hover:bg-secondary/50 px-2 transition-colors rounded">
                  <span className="font-medium">Starting from</span>
                  <span className="font-serif text-primary font-semibold">25 - 300 AED</span>
                </div>
              </div>
              
              {/* Waxing */}
              <div>
                <h4 className="font-serif text-2xl text-primary border-b border-primary/20 pb-2 mb-6 flex items-center gap-2">
                  <Droplet className="w-5 h-5" /> Waxing
                </h4>
                {[
                  { name: "Full Hand Wax", price: "70 AED" },
                  { name: "Half Hand Wax", price: "25 AED" },
                  { name: "Full Leg Wax", price: "70 AED" },
                  { name: "Half Leg Wax", price: "25 AED" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-border/50 hover:bg-secondary/50 px-2 transition-colors rounded">
                    <span className="font-medium text-foreground/80">{item.name}</span>
                    <span className="font-serif text-primary font-semibold">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="space-y-10">
              {/* Combo */}
              <div>
                <h4 className="font-serif text-2xl text-primary border-b border-primary/20 pb-2 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Beauty Combo
                </h4>
                <div className="flex justify-between items-center py-3 border-b border-border/50 hover:bg-secondary/50 px-2 transition-colors rounded">
                  <span className="font-medium text-foreground/80 max-w-[70%]">Half Leg + Half Hand + Full Face Bleach</span>
                  <span className="font-serif text-primary font-semibold">55 AED</span>
                </div>
              </div>

              {/* Hair Styling */}
              <div>
                <h4 className="font-serif text-2xl text-primary border-b border-primary/20 pb-2 mb-6 flex items-center gap-2">
                  <Scissors className="w-5 h-5" /> Hair Styling & Blow Dry
                </h4>
                {[
                  { name: "Blow Dry - Short Hair", price: "30 AED" },
                  { name: "Blow Dry - Long Hair", price: "50 AED" },
                  { name: "Hair Styling - Fair Hair", price: "30 AED" },
                  { name: "Hair Styling - Full Hair Wavy", price: "80 AED" },
                  { name: "Hair Styling - Half Hair Wavy", price: "50 AED" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-border/50 hover:bg-secondary/50 px-2 transition-colors rounded">
                    <span className="font-medium text-foreground/80">{item.name}</span>
                    <span className="font-serif text-primary font-semibold">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground italic">* Prices may vary based on specific requirements and hair length/volume. Please consult with our staff before treatment.</p>
          </div>
        </div>
      </section>

      {/* Home Service Banner */}
      <section id="home-service" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 -z-20"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)] -z-10"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-md rounded-full mb-8">
              <FaMapMarkerAlt className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 leading-tight">Home Service Available <br/>in Abu Dhabi</h2>
            <p className="text-lg md:text-xl font-light text-primary-foreground/90 mb-10">
              We bring luxury beauty services to your doorstep. Book our home service today and experience premium beauty care from the comfort of your home.
            </p>
            <p className="text-sm uppercase tracking-widest font-semibold mb-10 opacity-80">Serving Shabiya ME10 & Surrounding Areas</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="h-16 px-8 rounded-full bg-white text-primary hover:bg-secondary hover:scale-105 transition-all text-lg font-semibold shadow-xl" onClick={() => window.open('https://wa.me/971581191176', '_blank')}>
                <FaWhatsapp className="mr-3 w-6 h-6 text-[#25D366]" /> WhatsApp Home Service
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-8 rounded-full border-white/50 text-white hover:bg-white/10 hover:text-white transition-all text-lg" onClick={() => window.open('tel:+971581191176')}>
                <FaPhoneAlt className="mr-3 w-5 h-5" /> Call: +971 58 119 1176
              </Button>
            </div>
          </motion.div>
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
