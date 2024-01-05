package com.example.second.repository;

import com.example.second.domain.FingerGuard;
import com.example.second.domain.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class FingerGuardRepository {
    @PersistenceContext
    private EntityManager em;
    public void save(FingerGuard fingerGuard){
        em.persist(fingerGuard);
    }
    public FingerGuard findOne(Long id){
        return em.find(FingerGuard.class,id);
    }
}
