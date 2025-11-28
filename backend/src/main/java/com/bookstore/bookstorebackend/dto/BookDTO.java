package com.bookstore.bookstorebackend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String description;
    private String isbn;
    private String category;
    private BigDecimal price;
    private Integer stockQuantity;
    private Integer publicationYear;
    private String imageUrl;
    private Double rating;
    private Boolean available;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
