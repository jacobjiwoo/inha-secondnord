package com.example.second.repository;

import com.example.second.domain.FingerPrincess;
import com.example.second.domain.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

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
}
