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
    @Enumerated(EnumType.STRING)
    private AuthorizationGuard authorizationGuard;

    @OneToOne(mappedBy = "fingerGuard",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    Member member;

    @OneToMany(mappedBy = "fingerGuard",cascade = CascadeType.ALL)
    private List<FingerGuardCategory> fingerGuardCategories = new ArrayList<>();



    private int memberCount;

    private String introduction;
    private String openUrl;

    /**
     * 연관관계 편의 메서드
     */

    public void addMember(Member member){
        this.member = member;
        member.setFingerGuard(this);
    }
    public void addFingerGuardCategory(FingerGuardCategory fingerGuardCategory){
        fingerGuardCategories.add(fingerGuardCategory);
        fingerGuardCategory.setFingerGuard(this);
    }
    /**
     * 도메인 모델
     *
     *
     */
    public static FingerGuard createFingerGuard(Job job, Member member, List<FingerGuardCategory> fingerGuardCategories,String introduction,String openUrl){
              FingerGuard fingerGuard = new FingerGuard();
              fingerGuard.addMember(member);
              fingerGuard.setAuthorizationGuard(AuthorizationGuard.NOT_AUTHORIZED);
              for (FingerGuardCategory fingerGuardCategory : fingerGuardCategories) {
                  fingerGuard.addFingerGuardCategory(fingerGuardCategory);
              }
              fingerGuard.setIntroduction(introduction);
              fingerGuard.setOpenUrl(openUrl);
              fingerGuard.setJob(job);
              return fingerGuard;



          }

}
