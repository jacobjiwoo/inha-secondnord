package com.example.second.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class FingerPrincess {

    @Id
    @GeneratedValue
    @Column(name="finger_princess_id")
    private Long id;
    @OneToMany(mappedBy = "fingerPrincess")
    private List<Brand> favBrand = new ArrayList<>();
    @OneToMany(mappedBy = "fingerPrincess")
    private List<Product> favProduct = new ArrayList<>();
}
