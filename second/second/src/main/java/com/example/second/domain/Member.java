package com.example.second.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Member {
    @Id @GeneratedValue
    @Column(name="member_id")
    private Long member_id;
    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="finger_guard_id")
    FingerGuard fingerGuard;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="finger_princess_id")
    FingerPrincess fingerPrincess;

    private String email;

    private String id;

    private String gender;

    private String birth;

    private String password;



}
