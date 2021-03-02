package com.milkcatalog.milkcatalog.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

//Enterprise Business Rules
//Entity class with the definition of our table.
//Primary Key :- code

@Entity
@Table(name="product_entity")
data class ProductEntity(@Id @Column(name = "code") var code: String? = null,
                         @Column(name = "name") var name: String? = null)