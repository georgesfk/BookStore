package com.bookstore.bookstorebackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @Enumerated(EnumType.STRING)
    private ERole name;

    @Column(length = 500)
    private String description;

    public enum ERole {
        ROLE_USER,
        ROLE_ADMIN,
        ROLE_MODERATOR
    }
}
