import { Link, useParams } from 'react-router-dom';
import { products } from '@/data/products';

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();
  const categoryUpper = category?.toUpperCase() as 'TOPS' | 'TROUSERS';
  
  const filteredProducts = products.filter(p => p.category === categoryUpper);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <h1 className="font-serif text-5xl mb-16 tracking-wider">{categoryUpper}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden mb-4">
                <img 
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="font-sans text-sm tracking-wide mb-1">{product.name}</h3>
              <p className="font-sans text-sm text-muted-foreground">₹{product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
