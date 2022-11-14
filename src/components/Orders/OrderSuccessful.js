import React from "react";
import { motion } from "framer-motion";
import "./OrderSuccessful.css";

import harbour from "../../images/banner images/harbour.png";

function OrderSuccessful() {
  return (
    <div className="orderSuccessfulContainer">
      <motion.div
        className="orderSuccessfulSubContainer1"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{
          ease: "easeIn",
          duration: 2,
          type: "spring",
          stiffness: 50,
        }}
      >
        <div>
          <motion.p
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="para"
          >
            Woohoo!
          </motion.p>
          <motion.p
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="para1"
          >
            Order placed successfully
          </motion.p>
        </div>
      </motion.div>
      <motion.div
        className="orderSuccessfulSubContainer2"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          ease: "easeIn",
          duration: 2,
          type: "spring",
          stiffness: 50,
        }}
      >
        <div></div>
      </motion.div>
    </div>
  );
}

export default OrderSuccessful;
