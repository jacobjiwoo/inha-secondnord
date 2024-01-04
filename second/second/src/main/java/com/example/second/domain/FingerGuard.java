package com.example.second.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class FingerGuard {
    @Id
    @GeneratedValue
    @Column(name="finger_guard_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private Job job;

    @OneToMany(mappedBy = "fingerGuard")
    private List<Product> favProduct = new ArrayList<>();


    private Long memberCount;
    //추후에 추가
    private String openUrl;
}
