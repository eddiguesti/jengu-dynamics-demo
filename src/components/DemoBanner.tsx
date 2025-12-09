import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-4 py-2.5 relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9IndoaXRlIi8+PC9nPjwvc3ZnPg==')]" />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 relative">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>

        <p className="text-sm font-medium text-center">
          <span className="font-bold">Interactive Demo</span>
          <span className="mx-2 opacity-75">|</span>
          <span className="opacity-90">
            Explore Camp Azur Etoiles - a fictional campsite in Bandol, France
          </span>
          <span className="mx-2 opacity-75">|</span>
          <a
            href="https://jengu.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline font-semibold"
          >
            Get Started with Jengu
          </a>
        </p>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default DemoBanner;
