package com.bookstore.bookstorebackend.service;

import com.bookstore.bookstorebackend.dto.BookDTO;
import com.bookstore.bookstorebackend.entity.Book;
import com.bookstore.bookstorebackend.exception.ResourceNotFoundException;
import com.bookstore.bookstorebackend.repository.BookRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        return convertToDTO(book);
    }

    public Page<BookDTO> getAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    public Page<BookDTO> searchBooks(String search, Pageable pageable) {
        return bookRepository.searchBooks(search, pageable)
                .map(this::convertToDTO);
    }

    public Page<BookDTO> getBooksByCategory(String category, Pageable pageable) {
        return bookRepository.findByCategory(category, pageable)
                .map(this::convertToDTO);
    }

    public Page<BookDTO> getAvailableBooks(Pageable pageable) {
        return bookRepository.findByAvailableTrue(pageable)
                .map(this::convertToDTO);
    }

    public BookDTO createBook(BookDTO bookDTO) {
        if (bookRepository.findByIsbn(bookDTO.getIsbn()).isPresent()) {
            throw new IllegalArgumentException("Book with this ISBN already exists");
        }

        Book book = convertToEntity(bookDTO);
        Book savedBook = bookRepository.save(book);
        return convertToDTO(savedBook);
    }

    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));

        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setDescription(bookDTO.getDescription());
        book.setCategory(bookDTO.getCategory());
        book.setPrice(bookDTO.getPrice());
        book.setStockQuantity(bookDTO.getStockQuantity());
        book.setPublicationYear(bookDTO.getPublicationYear());
        book.setImageUrl(bookDTO.getImageUrl());
        book.setRating(bookDTO.getRating());
        book.setAvailable(bookDTO.getAvailable());

        Book updatedBook = bookRepository.save(book);
        return convertToDTO(updatedBook);
    }

    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        bookRepository.delete(book);
    }

    private BookDTO convertToDTO(Book book) {
        return BookDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .description(book.getDescription())
                .isbn(book.getIsbn())
                .category(book.getCategory())
                .price(book.getPrice())
                .stockQuantity(book.getStockQuantity())
                .publicationYear(book.getPublicationYear())
                .imageUrl(book.getImageUrl())
                .rating(book.getRating())
                .available(book.getAvailable())
                .createdAt(book.getCreatedAt())
                .updatedAt(book.getUpdatedAt())
                .build();
    }

    private Book convertToEntity(BookDTO bookDTO) {
        return Book.builder()
                .title(bookDTO.getTitle())
                .author(bookDTO.getAuthor())
                .description(bookDTO.getDescription())
                .isbn(bookDTO.getIsbn())
                .category(bookDTO.getCategory())
                .price(bookDTO.getPrice())
                .stockQuantity(bookDTO.getStockQuantity())
                .publicationYear(bookDTO.getPublicationYear())
                .imageUrl(bookDTO.getImageUrl())
                .rating(bookDTO.getRating())
                .available(bookDTO.getAvailable())
                .build();
    }
}
