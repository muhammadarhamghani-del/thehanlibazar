import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';

const FAQS = [
  {
    question: "What are the dimensions of the bed sheet and will it fit thick mattresses?",
    answer: "Our bed sheet is a generous King Size flat cut measuring 92\" x 94\", paired with 2 matching quilted pillow covers (19\" x 29\"). Because it is a normal flat bedspread with wide dimensions, it drapes gracefully over thick mattresses (10\" to 14\"+) and leaves plenty of fabric for a clean, secure tuck underneath."
  },
  {
    question: "Does the dark burgundy or royal emerald color bleed in the wash?",
    answer: "No. We exclusively use certified Fast Reactive Dyes that form a permanent chemical bond with the combed cotton fibers rather than cheap surface pigments. Even in our rich Imperial Burgundy and Midnight Charcoal shades, your sheets will not bleed onto your clothes or fade in the laundry when washed in cold water as instructed."
  },
  {
    question: "Is it genuinely 100% pure cotton, or is polyester blended in?",
    answer: "It is 100% pure export-grade combed cotton. In Pakistan's hot summer months, polyester blends trap heat and act like plastic wraps, causing sweating and restless turns. Combed cotton breathes naturally, allowing continuous airflow and cooling comfort throughout the night."
  },
  {
    question: "How does Cash on Delivery (COD) work across Pakistan, and how long does delivery take?",
    answer: "We offer Nationwide Cash on Delivery to over 200 cities and towns across Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and beyond). Orders are dispatched within 24 hours from Islamabad and usually arrive at your doorstep within 2 to 4 business days. You only pay the courier when you hold the parcel in your hands."
  },
  {
    question: "What are the recommended washing instructions?",
    answer: "Wash before first use in cold or gentle lukewarm water using a mild liquid detergent. Do not use harsh chlorine bleaches. Tumble dry on low heat or line-dry in gentle shade. Pure combed cotton actually gets softer and smoother with each subsequent wash!"
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Everything You Need to Know</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Frequently Asked Questions.
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          Clear answers about fabrics, dimensions, washing, and nationwide Cash on Delivery.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl bg-stone-900/80 border border-white/5 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-900 transition-colors"
              >
                <span className="text-sm sm:text-base font-bold text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* WhatsApp Help Banner */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-stone-900 to-emerald-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-white">Still have questions before ordering?</h4>
          <p className="text-xs text-zinc-300 mt-1">
            Our bedding experts are online on WhatsApp to help with mattress measurements & fabric advice.
          </p>
        </div>
        <a
          href="https://wa.me/923363326666?text=Salam!%20I%20have%20a%20question%20about%20The%20Hanli%20Bazar%20bedsheets."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
