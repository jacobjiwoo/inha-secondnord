package com.example.second.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Brand {
    @Id
    @GeneratedValue
    @Column(name="Brand_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "finger_princess_id")
    FingerPrincess fingerPrincess;

    private String name;
}
