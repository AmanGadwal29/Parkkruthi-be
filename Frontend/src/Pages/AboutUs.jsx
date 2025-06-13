import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-4">About Parkkruthi</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        At Parkkruthi, we believe gardening is more than a hobby — it’s a lifestyle. We’re committed to bringing nature closer to every home.
      </p>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-green-50 p-6 rounded-lg border border-green-100 shadow-sm">
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Our Vision</h2>
          <p className="text-gray-700 text-sm">
            To create a greener, healthier future by encouraging sustainable gardening and making plant care accessible to everyone in India.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-100 shadow-sm">
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Our Mission</h2>
          <p className="text-gray-700 text-sm">
            We strive to deliver high-quality plants, gardening tools, and eco-friendly solutions to customers across the country with trust, care, and responsibility.
          </p>
        </div>
      </div>

      {/* Team / Story */}
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-green-100 mb-16">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed text-sm">
          Founded by a group of nature lovers and tech enthusiasts, Parkkruthi started as a small initiative to make gardening easy for urban homes. With the rise in awareness around sustainability, we envisioned a platform that not only sells plants and products — but also educates, inspires, and supports plant lovers across India.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm mt-4">
          From balcony gardeners to backyard farmers, we serve all. Every product we ship is handpicked and carefully packed to ensure it reaches you in perfect condition.
        </p>
      </div>

      {/* Stats or Trust Signals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6 mb-16">
        <div>
          <h3 className="text-3xl font-bold text-green-700">15,000+</h3>
          <p className="text-gray-600 text-sm">Happy Customers</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-700">1 Lakh+</h3>
          <p className="text-gray-600 text-sm">Plants Delivered</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-700">100%</h3>
          <p className="text-gray-600 text-sm">Eco-Friendly Packaging</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Join our green revolution.</h3>
        <p className="text-gray-600 text-sm mb-4">Start your gardening journey with Parkkruthi today.</p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
