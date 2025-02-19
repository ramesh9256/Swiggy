import { FaUtensils, FaTruck, FaSmile } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">About Swiggy</h1>
      <p className="text-lg text-center mb-10">
        Welcome to Swiggy, your one-stop destination for delicious meals delivered right to your doorstep! We bring your favorite restaurants closer to you with fast, reliable, and hassle-free food delivery.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
          <FaUtensils className="text-5xl text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Variety of Restaurants</h3>
          <p className="text-gray-600">Choose from a wide range of cuisines and top-rated restaurants near you.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
          <FaTruck className="text-5xl text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Superfast Delivery</h3>
          <p className="text-gray-600">Get your food delivered hot and fresh in no time with our lightning-fast service.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
          <FaSmile className="text-5xl text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
          <p className="text-gray-600">We prioritize your satisfaction by ensuring top-notch service and quality.</p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-orange-500">Join the Swiggy Experience!</h2>
        <p className="text-gray-700 mt-2">Order now and enjoy great food from your favorite restaurants, delivered with care.</p>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition duration-300">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default About;
