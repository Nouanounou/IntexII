import { useState } from 'react';

// Default FAQs - can be passed as props instead
const defaultFaqs = [
  {
    question: 'What is CineNiche?',
    answer:
      'CineNiche is a streaming platform dedicated to offering unique, curated content that mainstream services often overlook. We focus on independent films, international cinema, and niche genres that passionate movie lovers appreciate.',
  },
  {
    question: 'How do I sign up?',
    answer:
      "Signing up is easy! Click the 'Register' button at the top of the page, fill in your information, select a subscription plan, and start streaming your favorite niche content immediately.",
  },
  {
    question: 'What devices does CineNiche support?',
    answer:
      'Despite serving a small content niche, CineNiche has seen rapid growth in its subscriber base and has developed apps for a wide range of platforms, including Windows, Mac, iOS, Android, Roku, AppleTV, GoogleTV, and more.',
  },
  {
    question: 'How do I contact support?',
    answer:
      "You can reach our support team by emailing support@cineniche.com or through the 'Help' section in your account menu. We're available 24/7 to assist with any questions or concerns.",
  },
];

export default function FAQSection({ faqs = defaultFaqs }) {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="py-12 px-6 bg-zinc-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-zinc-700 pb-2">
              <button
                className="flex justify-between items-center w-full py-4 text-left text-lg font-medium hover:text-teal-400 transition"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <span className="text-2xl">
                  {expandedFaq === index ? '−' : '+'}
                </span>
              </button>
              {expandedFaq === index && (
                <div className="pb-4 text-gray-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
