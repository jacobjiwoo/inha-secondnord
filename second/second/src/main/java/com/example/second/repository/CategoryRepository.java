package com.example.second.repository;

import com.example.second.domain.Category;
import com.example.second.domain.Member;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    public List<Category> findAll(){
        return em.createQuery("select c from Category c", Category.class).getResultList();
    }
//    public Category findWithFingerGuardCategory(Long id){
//        return em.createQuery("select c from Category c"+
//                " join fetch c.fingerGuardCategories"+
//                " where c.id = :categoryId", Category.class).setParameter("categoryId",id).getSingleResult();
//    }

}
