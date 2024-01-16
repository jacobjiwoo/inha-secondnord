package com.example.second.repository;

import com.example.second.domain.Category;
import com.example.second.domain.Member;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryRepository {
    @PersistenceContext
    private EntityManager em;

    public void save(Category category){
        em.persist(category);
    }
    public Category findOne(Long id){
        return em.find(Category.class,id);
    }

}
