package com.example.second.repository;

import com.example.second.domain.Brand;

import com.example.second.domain.Category;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class BrandRepository {
    @PersistenceContext
    private EntityManager em;
    public void save(Brand brand){
        em.persist(brand);
    }
    public Brand findOne(Long id){
        return em.find(Brand.class,id);
    }
}
