import React from 'react';
import { Hero } from '../components/sections/Hero';
import { FeaturedProducts } from '../components/sections/FeaturedProducts';
import { PopularCategories } from '../components/sections/PopularCategories';
import { Newsletter } from '../components/sections/Newsletter';

export function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <PopularCategories />
      <Newsletter />
    </div>
  );
}