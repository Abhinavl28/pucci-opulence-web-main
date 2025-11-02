package com.pucci.opulence.dto;

import com.pucci.opulence.model.Cart;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Long id;
    private Long userId;
    private ProductDTO product;
    private Integer quantity;
    private String size;
    
    public static CartDTO fromEntity(Cart cart) {
        CartDTO dto = new CartDTO();
        dto.setId(cart.getId());
        dto.setUserId(cart.getUser().getId());
        dto.setProduct(ProductDTO.fromEntity(cart.getProduct()));
        dto.setQuantity(cart.getQuantity());
        dto.setSize(cart.getSize());
        return dto;
    }
}
