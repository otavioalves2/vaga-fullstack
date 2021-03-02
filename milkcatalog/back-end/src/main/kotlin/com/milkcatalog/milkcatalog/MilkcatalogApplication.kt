package com.milkcatalog.milkcatalog

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MilkcatalogApplication

fun main(args: Array<String>) {
	runApplication<MilkcatalogApplication>(*args)
}
