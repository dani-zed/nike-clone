import { Button } from '../ui/Button';

export function Newsletter() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Join Our Nike Family</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Sign up for Nike emails to be the first to know about new products, member offers, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-black"
          />
          <Button size="lg">
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  );
}