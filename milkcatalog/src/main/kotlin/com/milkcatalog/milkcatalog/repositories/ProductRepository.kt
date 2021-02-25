package com.milkcatalog.milkcatalog.repositories

import com.milkcatalog.milkcatalog.entity.ProductEntity
import org.springframework.stereotype.Repository
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

//Enterprise Business Rules
//Repository interface

@Repository
interface ProductRepository : JpaRepository<ProductEntity, String>{
    //Custom Query which returns list of products that your code starts with the code passed by parameter
    @Query(value="SELECT * FROM product_entity WHERE code LIKE :code%", nativeQuery = true)
        fun findProductByCode(code: String): List<ProductEntity>

    //Custom Query which returns the list of products whose name contains the name passed by parameter
    @Query(value="SELECT * FROM product_entity WHERE name LIKE %:name%", nativeQuery = true)
        fun findProductByName(name: String): List<ProductEntity>
}