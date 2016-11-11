package com.bigster

import com.typesafe.scalalogging.slf4j.LazyLogging


object Main extends App with LazyLogging {

  val filename = args(0)
  val master = if (args.length == 2) Some(args(1)) else None

  logger.info(s"Master: ${master}")
  logger.info(s"File: ${filename}")

  Driver.run(master, filename)

}
