import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentImage, setCurrentImage] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast({ variant: 'destructive', description: 'Please select a size' });
      return;
    }
    if (product) {
      addItem(product, selectedSize);
      toast({ description: 'Added to bag' });
    }
  };

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const sizes = product.sizes.split(',');
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`aspect-[3/4] overflow-hidden ${currentImage === idx ? 'ring-2 ring-foreground' : ''}`}
                >
                  <img 
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-4xl mb-4 tracking-wide">{product.name}</h1>
              <p className="font-sans text-2xl">₹{product.price.toFixed(2)}</p>
            </div>

            <div>
              <p className="font-sans text-sm mb-4 tracking-wide">SIZE</p>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border border-foreground font-sans text-sm tracking-wide transition-colors ${
                      selectedSize === size 
                        ? 'bg-foreground text-background' 
                        : 'bg-background text-foreground hover:bg-accent'
                    }`}
                  >
                    {size.trim()}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              className="w-full py-6 text-base tracking-wider" 
              size="lg"
              disabled={!selectedSize}
              onClick={handleAddToBag}
            >
              ADD TO BAG
            </Button>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger className="font-sans text-sm tracking-wide">
                  PRODUCT DETAILS
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-muted-foreground">
                  {product.description}
                  <br /><br />
                  Category: {product.category}
                  <br />
                  Available Sizes: {product.sizes}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="sizing">
                <AccordionTrigger className="font-sans text-sm tracking-wide">
                  SIZING
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-muted-foreground">
                  This item fits true to size. For the perfect fit, we recommend selecting your usual size.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping">
                <AccordionTrigger className="font-sans text-sm tracking-wide">
                  SHIPPING & RETURNS
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-muted-foreground">
                  Free shipping on orders over ₹5,000. Returns accepted within 30 days of purchase.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* You May Also Like */}
        <section className="mt-32">
          <h2 className="font-serif text-3xl mb-12 tracking-wider">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((prod) => (
              <Link 
                key={prod.id} 
                to={`/product/${prod.id}`}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden mb-4">
                  <img 
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-sans text-sm tracking-wide mb-1">{prod.name}</h3>
                <p className="font-sans text-sm text-muted-foreground">₹{prod.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
