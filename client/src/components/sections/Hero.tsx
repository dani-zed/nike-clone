import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      <img
        src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative max-w-7xl mx-auto px-4 text-white">
        <h1 className="text-6xl font-bold mb-6">Just Do It</h1>
        <p className="text-xl mb-8 max-w-xl">
          Your journey to greatness starts here. Discover the latest in sport innovation and style.
        </p>
        <div className="flex gap-4">
          <Button variant="secondary" size="lg">
            Shop Men
          </Button>
          <Button variant="secondary" size="lg">
            Shop Women
          </Button>
        </div>
      </div>
    </section>
  );
}