import type React from "react";
import toast from "react-hot-toast";

const NewsletterCTA = () => {
  const handleSubscribe = (e: React.SubmitEvent) => {
    e.preventDefault();
    toast.success("Thank you for joining the Culinary Inner Circle!");
  };

  return (
    <section className="bg-primary-container text-on-primary py-20 xl:py-32 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl text-white mb-4">
          Join the Culinary Inner Circle
        </h2>
        <p className="text-sm text-on-primary-container mb-8 leading-relaxed">
          Subscribe to receive first access to new openings and sesonal tasting
          menus.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Email Address"
            className="flex-1 bg-white/10 border-b border-on-primary-container/30 focus:border-white text-white text-sm py-3 px-4 outline-none placeholder:text-on-primary-container/70 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-white text-primary hover:bg-secondary hover:text-white transition-colors text-xs tracking-widest uppercase py-3 px-8 cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterCTA;
