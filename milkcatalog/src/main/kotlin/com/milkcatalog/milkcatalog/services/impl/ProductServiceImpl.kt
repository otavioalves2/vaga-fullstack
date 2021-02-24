package com.milkcatalog.milkcatalog.services.impl

import com.milkcatalog.milkcatalog.entity.ProductEntity
import com.milkcatalog.milkcatalog.repositories.ProductRepository
import com.milkcatalog.milkcatalog.services.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

//Application Business Rules
//Implementation class for our Service Interface
//Uses JpaRepository methods

@Service
data class ProductServiceImpl(@Autowired val productRepository: ProductRepository): ProductService {

    //Uses JpaRepository findAll method to return a ProductEntity list of all products
    override fun listAll(): List<ProductEntity> {
        return productRepository.findAll()
    }

    //Uses JpaRepository getOne method to return a product that matches the id (in our case it's the code parameter)
    override fun get(id: String): ProductEntity {
        return productRepository.getOne(id)
    }

    //Uses JpaRepository save method to insert a new product
    override fun save(product: ProductEntity): ProductEntity {
        return productRepository.save(product)
    }

    //Uses JpaRepository getOne method to get the product to be updated,
    //we replace the required values with the new values and insert them back into the database
    override fun update(product: ProductEntity, id: String): ProductEntity {
        var edit: ProductEntity = productRepository.getOne(id)
        edit.name = product.name

        return productRepository.save(edit)
    }

    //Uses JpaRepository delete method to delete the product that matches the id (in our case it's the code parameter)
    override fun delete(id: String) {
        productRepository.delete(productRepository.getOne(id))
    }

}
