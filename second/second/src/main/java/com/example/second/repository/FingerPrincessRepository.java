package com.example.second.repository;

import com.example.second.domain.FingerGuard;
import com.example.second.domain.FingerPrincess;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FingerPrincessRepository {
    @PersistenceContext
    private EntityManager em;
    public void save(FingerPrincess fingerPrincess){
        em.persist(fingerPrincess);
    }

    public FingerPrincess findOne(Long id){
        return em.find(FingerPrincess.class,id);
    }

    public List<FingerPrincess> findAllWithMember(){
        return em.createQuery("select f from FingerPrincess f"+
                " join fetch f.member m",FingerPrincess.class).getResultList();
    }
}
