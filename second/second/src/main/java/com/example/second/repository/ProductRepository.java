package com.example.second.repository;

import com.example.second.domain.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class ProductRepository {
    @PersistenceContext
    private EntityManager em;

    public void save(Product product){
        em.persist(product);
    }

}
