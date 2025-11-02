package com.pucci.opulence.controller;

import com.pucci.opulence.dto.CartDTO;
import com.pucci.opulence.dto.CartRequest;
import com.pucci.opulence.model.Cart;
import com.pucci.opulence.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173", "http://localhost:3000"})
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartDTO>> getCartByUserId(@PathVariable Long userId) {
        List<Cart> cart = cartService.getCartByUserId(userId);
        List<CartDTO> cartDTOs = cart.stream()
                .map(CartDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(cartDTOs);
    }
    
    @PostMapping
    public ResponseEntity<Cart> addToCart(@Valid @RequestBody CartRequest request) {
        try {
            Cart cart = cartService.addToCart(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(cart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCartItem(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        try {
            Integer quantity = body.get("quantity");
            Cart cart = cartService.updateCartItem(id, quantity);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> removeFromCart(@PathVariable Long id) {
        try {
            cartService.removeFromCart(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Item removed from cart");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Map<String, String>> clearCart(@PathVariable Long userId) {
        try {
            cartService.clearCart(userId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cart cleared");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
