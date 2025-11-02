package com.pucci.opulence.dto;

import com.pucci.opulence.model.Product;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String category;
    private String description;
    private BigDecimal price;
    private List<String> images;
    private String sizes;
    
    public static ProductDTO fromEntity(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setCategory(product.getCategory().name());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setSizes(product.getSizes());
        
        // Parse images JSON string to List
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<String> imageList = mapper.readValue(product.getImages(), new TypeReference<List<String>>() {});
            dto.setImages(imageList);
        } catch (Exception e) {
            // Fallback: if JSON parsing fails, try splitting by comma
            dto.setImages(Arrays.asList(product.getImages().split(",")));
        }
        
        return dto;
    }
}
