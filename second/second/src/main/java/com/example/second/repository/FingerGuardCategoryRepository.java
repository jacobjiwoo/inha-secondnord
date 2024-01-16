package com.example.second.repository;


import com.example.second.domain.FingerGuardCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class FingerGuardCategoryRepository {
    @PersistenceContext
    private EntityManager em;

    public void save(FingerGuardCategory fingerGuardCategory){
        em.persist(fingerGuardCategory);

    }
}
