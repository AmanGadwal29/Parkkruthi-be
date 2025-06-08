import React, { useState } from "react";

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
    <section className="w-full px-4 md:px-20 py-16 bg-[#f9fafb]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqData.map(({ question, answer }, index) => {
            const isOpen = index === activeIndex;

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-medium text-gray-800">{question}</span>

                  {/* Plus icon turns to cross on open */}
                  <span className="relative w-5 h-5">
                    <span
                      className={`absolute w-full h-0.5 bg-gray-800 left-0 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    />
                    <span
                      className={`absolute h-full w-0.5 bg-gray-800 left-1/2 top-0 transform -translate-x-1/2 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    />
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-all duration-300 ease-in-out px-6 overflow-hidden ${
                    isOpen ? "grid-rows-[1fr] py-4" : "grid-rows-[0fr] py-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base text-gray-700 leading-relaxed">{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
