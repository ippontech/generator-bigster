package com.bigster

import com.typesafe.scalalogging.slf4j.LazyLogging
import org.apache.spark.{SparkConf, SparkContext}

object Driver extends LazyLogging {

  def run(master: Option[String], filename: String): Unit = {

    val sparkConf = new SparkConf()
      .setAppName("main")
    master.map(sparkConf.setMaster(_))
    val sc = new SparkContext(sparkConf)

    logger.info("Processing file")

    val file = sc.textFile(filename)
    val count = file.count()
    logger.info(s"Count: ${count}")

    logger.info("Done processing file")
  }

}
