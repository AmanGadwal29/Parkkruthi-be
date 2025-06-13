import React, { useState } from "react";
import { Plus } from "lucide-react"; // Lucide Plus icon

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
  {
    question: "How do I care for the plants I purchase?",
    answer: "Each plant comes with a detailed care guide, and you can also find tips in our blog section.",
  },
  {
    question: "What if the plant gets damaged during delivery?",
    answer: "If your plant arrives damaged, contact our support within 48 hours with photos, and we’ll arrange a replacement or refund.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer: "Yes, orders can be canceled within 2 hours of placement or before they are shipped, whichever is earlier.",
  },
  {
    question: "Do I need an account to shop?",
    answer: "Yes, you need to log in or register to make a purchase, add addresses, or track orders.",
  },
  {
    question: "Are there any offers for bulk or corporate orders?",
    answer: "Yes, we offer custom quotes and discounts for bulk or corporate gifting. Please contact our sales team via the Contact page.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, credit/debit cards, net banking, and wallet payments through secure gateways.",
  },
  {
    question: "Do you provide gardening tools and accessories?",
    answer: "Yes, we offer a variety of tools, pots, planters, and organic fertilizers to support your gardening journey.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-16 bg-[#f5fdf6] font-sans">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1B3C2E] tracking-wide mb-4 leading-snug">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-normal">
          Answers to common queries about orders, returns, and plant care to guide your green journey.
        </p>

        <div className="space-y-6">
          {faqData.map(({ question, answer }, index) => {
            const isOpen = index === activeIndex;

            return (
              <div
                key={index}
                className="bg-white border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-medium text-green-900">
                    {question}
                  </span>

                  <Plus
                    size={28}
                    className={`transition-transform duration-300 transform ${
                      isOpen ? "rotate-45 text-green-700" : "rotate-0 text-green-900"
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-all duration-300 ease-in-out px-6 overflow-hidden ${
                    isOpen ? "grid-rows-[1fr] py-4" : "grid-rows-[0fr] py-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base text-green-800 leading-relaxed">
                      {answer}
                    </p>
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
