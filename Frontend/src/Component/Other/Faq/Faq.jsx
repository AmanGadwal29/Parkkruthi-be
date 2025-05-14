import React, { useState } from "react";
// Optional: Uncomment to use framer-motion
// import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "What is your return policy?",
    answer: "You can return any item within 30 days of purchase.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries around the world.",
  },
  {
    question: "How can I track my order?",
    answer: "Once shipped, you will receive a tracking number via email.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="px-4 md:px-20 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        FREQUENTLY ASKED QUESTIONS
      </h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => {
          const isOpen = index === activeIndex;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm transition hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-left text-base font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="relative w-5 h-5 transition-transform">
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-gray-800 transform -translate-y-1/2 transition-all duration-300" />
                  <span
                    className={`absolute left-[47%] top-0 w-0.5 h-5 bg-gray-800 origin-center transform transition-all duration-300 ${
                      isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                    }`}
                  />
                </span>
              </button>

              {/* Animated answer box */}
              <div
                id={`faq-answer-${index}`}
                className={`grid transition-all duration-300 ease-in-out px-6 ${
                  isOpen ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr] py-0"
                } overflow-hidden`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-gray-600 pb-5">{faq.answer}</p>
                </div>
              </div>

              {/* Or, with framer-motion — uncomment to use
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-5"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
