import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600">
            Have questions or need help? Get in touch with us!
          </p>
          <div className="p-4 bg-gray-50 rounded-lg shadow flex items-center space-x-4">
            <FaPhoneAlt className="text-primary text-2xl" />
            <div>
              <p className="text-gray-700 font-semibold">Phone</p>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow flex items-center space-x-4">
            <FaEnvelope className="text-primary text-2xl" />
            <div>
              <p className="text-gray-700 font-semibold">Email</p>
              <p className="text-gray-600">support@swiggyclone.com</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow flex items-center space-x-4">
            <FaMapMarkerAlt className="text-primary text-2xl" />
            <div>
              <p className="text-gray-700 font-semibold">Address</p>
              <p className="text-gray-600">Bangalore, India</p>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div className="bg-gray-50 p-6 rounded-xl shadow">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Send a Message</h3>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-2 border rounded-lg" />
            <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-lg" />
            <textarea placeholder="Your Message" className="w-full p-2 border rounded-lg h-28"></textarea>
            <button className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
