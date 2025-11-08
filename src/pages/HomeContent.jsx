import React from "react";
import { motion } from "framer-motion";
import { BedDouble, Utensils, Waves, Mail, Phone, MapPin } from "lucide-react";
import hotelImage1 from "../assets/hotel-image-1.jpg";
import hotelImage2 from "../assets/hotel-image-2.jpg";
import hotelImage3 from "../assets/hotel-image-3.jpg";
import { useNavigate } from "react-router-dom";

const HomeContent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col overflow-hidden">
      <section
        className="relative bg-cover bg-center min-h-[80vh] md:h-screen flex flex-col justify-center items-center text-center rounded-xl mt-1"
        style={{
          backgroundImage: `url(${hotelImage1})`,
        }}
      >
        <motion.div
          id="hero"
          className="bg-black bg-opacity-50 p-6 md:p-10 rounded-2xl max-w-3xl mx-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg leading-snug">
            Welcome to Aura Hotels
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-4">
            Experience luxury and comfort like never before.
          </p>
          <motion.button
            className="mt-6 px-6 py-3 bg-yellow-500 text-black rounded-xl font-semibold shadow-md hover:bg-yellow-400 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/Booking")}
          >
            Book Your Stay
          </motion.button>
        </motion.div>
      </section>

      <motion.section
        id="about"
        className="h-screen py-16 px-6 md:px-20 bg-gray-50 flex flex-col lg:flex-row items-center justify-center gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            About Us
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
            At Aura Hotels, we redefine luxury and comfort through curated
            spaces designed to make your stay memorable. Whether you seek
            peaceful relaxation or adventure, our world-class amenities and warm
            hospitality ensure a remarkable experience every time.
          </p>
          <motion.button
            className="px-6 py-3 bg-yellow-500 text-black rounded-xl font-semibold shadow-md hover:bg-yellow-400 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open("https://example.com", "_blank")}
          >
            Learn More
          </motion.button>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <div className="flex flex-col gap-4">
            <motion.img
              src={hotelImage1}
              alt="Hotel 1"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src={hotelImage3}
              alt="Hotel 3"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            />
          </div>

          <motion.img
            src={hotelImage2}
            alt="Hotel 2"
            className="w-40 h-56 sm:w-52 sm:h-64 md:w-64 md:h-80 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </motion.section>

      <motion.section
        id="services"
        className="py-16 px-6 md:px-20 bg-white text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Our Premium Services
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-16">
          {[
            {
              icon: <BedDouble className="w-10 h-10 text-yellow-500 mb-4" />,
              title: "Luxury Rooms",
              desc: "Spacious, elegant rooms equipped with smart amenities and modern decor.",
            },
            {
              icon: <Utensils className="w-10 h-10 text-yellow-500 mb-4" />,
              title: "Fine Dining",
              desc: "Enjoy curated dishes from global cuisines, crafted by top chefs.",
            },
            {
              icon: <Waves className="w-10 h-10 text-yellow-500 mb-4" />,
              title: "Infinity Pool",
              desc: "Relax by our serene poolside with skyline views and refreshing vibes.",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all flex-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center">
                {service.icon}
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8 flex justify-center">
          What Our Guests Say
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {[
            {
              text: "Absolutely amazing experience! The staff was friendly and the rooms were top-notch.",
              name: "John D.",
            },
            {
              text: "Best vacation ever! The food, the ambiance, and the pool were just perfect.",
              name: "Priya S.",
            },
          ].map((review, index) => (
            <motion.div
              key={index}
              className="bg-yellow-50 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition flex-1"
              whileHover={{ scale: 1.03 }}
            >
              <p className="italic text-gray-700 text-sm md:text-base">
                “{review.text}”
              </p>
              <span className="block mt-4 font-semibold text-gray-900">
                - {review.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="pb-12 pt-7 px-6 md:px-20 bg-gray-50 flex flex-col justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-9 text-gray-800">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black p-8 md:p-10 rounded-2xl shadow-lg flex flex-col justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-5 text-base md:text-lg">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-black" />
                <p>123 Beach Avenue, Goa, India</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-3 text-black" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-3 text-black" />
                <p>contact@aurahotels.com</p>
              </div>
            </div>
            <iframe
              title="hotel-location"
              className="mt-8 rounded-xl shadow-md w-full h-60 sm:h-72"
              style={{ border: 0 }}
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.44173061785!2d76.88483257251708!3d11.014126297388279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1762530124031!5m2!1sen!2sin"
              allowFullScreen
            ></iframe>
          </motion.div>

          <motion.form
            className="bg-white p-6 md:p-8 rounded-2xl shadow-md flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center lg:text-left">
              Send Us Your Feedback
            </h3>
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            ></textarea>
            <motion.button
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-black rounded-xl font-semibold shadow-md hover:bg-yellow-400 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Feedback
            </motion.button>
          </motion.form>
        </div>
      </motion.section>

      <motion.section
        className="py-10 bg-yellow-500 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold" onClick={() => navigate("/Booking")}>
          Ready to Book Your Stay?
        </h2>
        <motion.button
          className="mt-4 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/Booking")}
        >
          Book Now
        </motion.button>
      </motion.section>

      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        <p>&copy; 2025 Aura Hotels. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomeContent;
