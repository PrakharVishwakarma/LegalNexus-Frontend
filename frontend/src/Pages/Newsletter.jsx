import Lottie from "lottie-react";

import lottieNewsLetter1 from '../assets/lottie/lottieNewsLetter1.json'


const Newsletter = () => {
  return (
    <div className="flex w-full h-[40rem]">
      <div className="flex justify-center content-end w-5/12">
      <Lottie animationData={lottieNewsLetter1} loop={true} />
      </div>
      <section className="newsletter-wrapper bg-gray-50 w-7/12 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto text-center h-fit">
          {/* Header Section */}
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-800">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Stay updated with the latest news, articles, and offers. We promise not to spam you!
          </p>

          {/* Form Section */}
          <form className="mt-8 flex flex-col lg:flex-row items-center justify-center gap-4 w-full lg:w-3/4 mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="w-full lg:w-2/3 px-4 py-3 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500"
            />
            <button
              type="submit"
              className="w-full lg:w-auto bg-indigo-600 text-white px-6 py-3 font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
