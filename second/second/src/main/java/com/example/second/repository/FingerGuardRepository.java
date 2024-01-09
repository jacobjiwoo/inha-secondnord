package com.example.second.repository;

import com.example.second.domain.FingerGuard;
import com.example.second.domain.Member;
import com.example.second.domain.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    public List<FingerGuard> findAll(){
        return em.createQuery("select f from FingerGuard f", FingerGuard.class).getResultList();
    }
    public List<FingerGuard> findAllWithMember(){
        return em.createQuery("select f from FingerGuard f"+
                " join fetch f.member m",FingerGuard.class).getResultList();
    }
}
