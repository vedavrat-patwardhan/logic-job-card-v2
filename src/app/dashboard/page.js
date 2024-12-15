"use client";
import { motion } from "framer-motion";
import { DashboardPage } from "../../page-section/Dashboard";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <DashboardPage />
    </motion.div>
  );
};

export default Dashboard;
