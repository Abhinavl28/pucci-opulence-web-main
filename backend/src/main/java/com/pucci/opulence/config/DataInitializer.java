package com.pucci.opulence.config;

import com.pucci.opulence.model.Product;
import com.pucci.opulence.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public void run(String... args) throws Exception {
        long productCount = productRepository.count();
        
        if (productCount == 0) {
            System.out.println("⚠️  No products found in database!");
            System.out.println("📋 Please import the database schema:");
            System.out.println("   cd database");
            System.out.println("   mysql -u root -proot < schema.sql");
            System.out.println("");
            System.out.println("Or run: database\\import.bat");
            System.out.println("");
            System.out.println("Loading minimal sample data for testing...");
            
            // Load minimal data for testing if schema.sql wasn't imported
            Product product1 = new Product();
            product1.setName("White PUCCI Tee");
            product1.setPrice(new BigDecimal("799.99"));
            product1.setCategory(Product.Category.TOPS);
            product1.setSizes("Oversized S,M,L,XL");
            product1.setDescription("A premium oversized tee featuring the iconic PUCCI branding. Crafted from the finest cotton for ultimate comfort and style.");
            product1.setImages("[\"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80\",\"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80\"]");
            productRepository.save(product1);
            
            Product product2 = new Product();
            product2.setName("Black Gradient Graffiti");
            product2.setPrice(new BigDecimal("1299.99"));
            product2.setCategory(Product.Category.TOPS);
            product2.setSizes("Oversized S,M,L,XL");
            product2.setDescription("An exclusive oversized piece featuring bold gradient graffiti design. A statement piece for the fashion-forward.");
            product2.setImages("[\"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80\",\"https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80\"]");
            productRepository.save(product2);
            
            Product product3 = new Product();
            product3.setName("Flared Black Comforts");
            product3.setPrice(new BigDecimal("1499.99"));
            product3.setCategory(Product.Category.TROUSERS);
            product3.setSizes("28,30,32,34");
            product3.setDescription("Luxurious flared trousers in deep black. Tailored to perfection with a comfortable fit that exudes elegance.");
            product3.setImages("[\"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80\",\"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80\"]");
            productRepository.save(product3);
            
            Product product4 = new Product();
            product4.setName("Pleated Ivory");
            product4.setPrice(new BigDecimal("1599.99"));
            product4.setCategory(Product.Category.TROUSERS);
            product4.setSizes("28,30,32,34");
            product4.setDescription("Sophisticated pleated trousers in pristine ivory. A timeless piece that combines classic elegance with modern sophistication.");
            product4.setImages("[\"https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80\",\"https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80\"]");
            productRepository.save(product4);
            
            System.out.println("✅ Loaded " + productRepository.count() + " sample products");
        } else {
            System.out.println("✅ Database contains " + productCount + " products");
        }
    }
}
