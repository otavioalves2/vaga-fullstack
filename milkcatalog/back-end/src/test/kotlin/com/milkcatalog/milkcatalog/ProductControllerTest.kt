package com.milkcatalog.milkcatalog

import com.fasterxml.jackson.databind.ObjectMapper
import com.milkcatalog.milkcatalog.entity.ProductEntity
import com.milkcatalog.milkcatalog.repositories.ProductRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {
    @Autowired lateinit var mockMvc: MockMvc

    @Autowired lateinit var productRepository: ProductRepository

    //Find all test, if the types are matching
    @Test
    fun `test find all`(){
        mockMvc.perform(MockMvcRequestBuilders.get("/product}"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("\$").isArray)
                .andExpect(MockMvcResultMatchers.jsonPath("\$.[0].code").isString)
                .andExpect(MockMvcResultMatchers.jsonPath("\$.[0].name").isString)
                .andDo(MockMvcResultHandlers.print())
    }
    //Test find by code filter
    @Test
    fun `test find by code`(){
        val product = productRepository.save(ProductEntity(code = "55", name = "Leiteste1"))

        mockMvc.perform(MockMvcRequestBuilders.get("/product/${product.code}"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("\$.[0].code").value(product.code))
                .andExpect(MockMvcResultMatchers.jsonPath("\$.[0].name").value(product.name))
                .andDo(MockMvcResultHandlers.print())
    }
    //Test find by name filter
    @Test
    fun `test find by name`(){
        val product = productRepository.save(ProductEntity(code = "56", name = "Leiteste2"))

        mockMvc.perform(MockMvcRequestBuilders.get("/product/${product.name}"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.jsonPath("\$.[0].code").value(product.code))
                .andExpect(MockMvcResultMatchers.jsonPath("\$.[0].name").value(product.name))
                .andDo(MockMvcResultHandlers.print())
    }
    //Test save product
    @Test
    fun `test save product`(){
        val product = productRepository.save(ProductEntity(code = "57", name = "Leiteste3"))

        val json = ObjectMapper().writeValueAsString(product)

        mockMvc.perform(MockMvcRequestBuilders.post("/product")
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(json))
                .andExpect(MockMvcResultMatchers.status().isCreated)
                .andExpect(MockMvcResultMatchers.jsonPath("\$.code").value(product.code))
                .andExpect(MockMvcResultMatchers.jsonPath("\$.name").value(product.name))
                .andDo(MockMvcResultHandlers.print())
    }


}