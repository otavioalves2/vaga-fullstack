package com.milkcatalog.milkcatalog.services

import com.milkcatalog.milkcatalog.entity.ProductEntity

//Application Business Rules
//Product Service interface with our Use Cases methods signature

interface ProductService {
    fun listAll(): List<ProductEntity>
    fun get(id: String): ProductEntity
    fun save(product: ProductEntity): ProductEntity
    fun update(product: ProductEntity, id: String): ProductEntity
    fun delete(id: String)
}