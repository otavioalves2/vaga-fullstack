package com.milkcatalog.milkcatalog.controllers

import com.milkcatalog.milkcatalog.entity.ProductEntity
import com.milkcatalog.milkcatalog.services.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

//Interface Adapters
//REST API - Milk Catalog

@RestController
@RequestMapping(value = ["/product"])
class ProductController(@Autowired val productService: ProductService) {

    //Endpoint for the GET method without parameters, returns a list of all products
    @RequestMapping(value = [""],
            method = [RequestMethod.GET],
            produces = [MediaType.APPLICATION_JSON_VALUE])
    fun listAll(): List<ProductEntity> {
        return productService.listAll()
    }

    //Endpoint for the POST method without parameters,
    //inserts the JSON ProductEntity object in the request body into the database
    @RequestMapping(value = [""],
            method = [RequestMethod.POST],
            consumes = [MediaType.APPLICATION_JSON_VALUE],
            produces = [MediaType.APPLICATION_JSON_VALUE])
    fun save(@RequestBody product: ProductEntity): ProductEntity {
        return productService.save(product)
    }

    //Endpoint for the GET method with <code_parameter>(our id),
    //returns the product corresponding to the code entered in the parameter
    @RequestMapping(value = ["/{id}"],
            method = [RequestMethod.GET],
            produces = [MediaType.APPLICATION_JSON_VALUE])
    fun get(@PathVariable("id") id: String): ProductEntity {
        return productService.get(id)
    }

    //Endpoint for the PUT method with <code_parameter>(our id)/update,
    //updates the product corresponding to the code entered in the parameter
    @RequestMapping(value = ["/{id}/update"],
            method = [RequestMethod.PUT],
            consumes = [MediaType.APPLICATION_JSON_VALUE],
            produces = [MediaType.APPLICATION_JSON_VALUE])
    fun update(@RequestBody product: ProductEntity, @PathVariable("id") id: String): ProductEntity {
        return productService.update(product, id)
    }

    //Endpoint for the DELETE method with <code_parameter>(our id),
    //deletes the product corresponding to the code entered in the parameter
    @RequestMapping(value = ["/{id}"],
            method = [RequestMethod.DELETE],
            produces = [MediaType.APPLICATION_JSON_VALUE])
    fun delete(@PathVariable("id") id: String): String {
        productService.delete(id)
        return "DELETED"
    }
}