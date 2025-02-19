import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Swiggy</h2>
                    <p className="text-sm">Order food online from your favorite restaurants with Swiggy.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-orange-500">About Us</a></li>
                        <li><a href="#" className="hover:text-orange-500">Contact</a></li>
                        <li><a href="#" className="hover:text-orange-500">Careers</a></li>
                        <li><a href="#" className="hover:text-orange-500">Blog</a></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Customer Support</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-orange-500">Help & Support</a></li>
                        <li><a href="#" className="hover:text-orange-500">FAQs</a></li>
                        <li><a href="#" className="hover:text-orange-500">Partner with us</a></li>
                        <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-orange-500"><FaFacebookF /></a>
                        <a href="#" className="hover:text-orange-500"><FaTwitter /></a>
                        <a href="#" className="hover:text-orange-500"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
                &copy; 2025 Swiggy. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
