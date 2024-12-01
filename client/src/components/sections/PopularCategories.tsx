import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: "Men's Training",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3",
    link: "/mens-training"
  },
  {
    id: 2,
    title: "Women's Running",
    image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?ixlib=rb-4.0.3",
    link: "/womens-running"
  },
  {
    id: 3,
    title: "Basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3",
    link: "/basketball"
  }
];

export function PopularCategories() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="group relative overflow-hidden rounded-lg aspect-[4/5]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <div className="flex items-center gap-2 text-sm font-medium">
                  Shop Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}