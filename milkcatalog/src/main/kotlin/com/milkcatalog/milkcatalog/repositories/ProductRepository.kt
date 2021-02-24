package com.milkcatalog.milkcatalog.repositories

import com.milkcatalog.milkcatalog.entity.ProductEntity
import org.springframework.stereotype.Repository
import org.springframework.data.jpa.repository.JpaRepository

//Enterprise Business Rules
//Repository interface

@Repository
interface ProductRepository : JpaRepository<ProductEntity, String>