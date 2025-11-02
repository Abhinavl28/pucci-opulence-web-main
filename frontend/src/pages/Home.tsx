import { Link } from 'react-router-dom';
import { products } from '@/data/products';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
          alt="Fall 2025 Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-end justify-center pb-20">
          <h1 className="font-serif text-background text-5xl md:text-7xl tracking-wider">
            The Fall 2025 Collection
          </h1>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-8">
        <Link to="/tops" className="group relative h-[600px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=800&q=80"
            alt="Shop Tops"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-background text-4xl tracking-wider bg-foreground/30 px-8 py-4">
              Shop Tops
            </span>
          </div>
        </Link>
        
        <Link to="/trousers" className="group relative h-[600px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80"
            alt="Shop Trousers"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-background text-4xl tracking-wider bg-foreground/30 px-8 py-4">
              Shop Trousers
            </span>
          </div>
        </Link>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="font-serif text-4xl mb-12 text-center tracking-wider">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden mb-4">
                <img 
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-sans text-sm tracking-wide mb-1">{product.name}</h3>
              <p className="font-sans text-sm text-muted-foreground">₹{product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
