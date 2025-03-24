
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    text: "PaymanMate reduced our reconciliation time by 75%. What used to take days now takes just a few hours. The automated system has virtually eliminated payment matching errors.",
    name: "Rachel Thompson",
    position: "Property Manager, Urban Heights",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 2,
    text: "The financial health scoring feature gives us unprecedented insight into our properties' performance. We can now identify potential issues before they become problems.",
    name: "Michael Chen",
    position: "Director, Eastside Properties",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 3,
    text: "The implementation was seamless, and our tenants love the clear payment system. Support has been exceptional whenever we've needed assistance.",
    name: "Jessica Martinez",
    position: "Operations Manager, Sunset Realty",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval: number | undefined;
    
    if (autoplay) {
      interval = window.setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 6000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoplay]);

  const navigateTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setAutoplay(false);
  };

  const navigatePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };

  const navigateNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setAutoplay(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  return (
    <div className="relative">
      <div className="relative h-96 md:h-80 overflow-hidden bg-blue-50 rounded-2xl">
        <div className="absolute top-6 left-8 text-primary">
          <Quote className="h-12 w-12 opacity-20" />
        </div>
        
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="absolute inset-0 flex items-center justify-center p-12"
          >
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl italic mb-8 text-foreground">
                "{testimonials[currentIndex].text}"
              </p>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden mb-4 border-2 border-white shadow-lg">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="h-full w-full object-cover" 
                  />
                </div>
                <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                <p className="text-muted-foreground">{testimonials[currentIndex].position}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-subtle z-10"
          onClick={navigatePrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-subtle z-10"
          onClick={navigateNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary w-6" : "bg-primary/30"
            }`}
            onClick={() => navigateTo(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
