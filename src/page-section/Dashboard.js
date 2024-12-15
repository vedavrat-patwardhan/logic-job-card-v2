"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { FilterBox } from "@/components/FilterBox";
import { JobsTable } from "@/components/Table";
import toast from "react-hot-toast";
import { getJobs } from "../api/dashboard";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "../components/Pagination";
import { Modal } from "../components/Modal";
import { AddJobForm } from "./components/AddJobForm";

export const DashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPage = parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("search") || "";
  const ITEMS_PER_PAGE = 20;

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const data = await getJobs(currentPage, searchQuery);
      setJobs(data.jobs);
      setTotalJobs(data.jobCount);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    params.set("page", "1");
    router.push(`/dashboard?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/dashboard?${params.toString()}`);
  };

  const handleAddRecord = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (job) => {
    // To be implemented
    console.log("Edit job:", job);
  };

  const handleDelete = (jobId) => {
    // To be implemented
    console.log("Delete job:", jobId);
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage, searchQuery]);

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-4">
        <FilterBox onSearch={handleSearch} onAddRecord={handleAddRecord} />
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
          </div>
        ) : (
          <>
            <JobsTable
              jobs={jobs}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalJobs / ITEMS_PER_PAGE)}
              onPageChange={handlePageChange}
            />
          </>
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Job"
        >
          <AddJobForm
            onClose={() => setIsModalOpen(false)}
            onSuccess={fetchJobs}
          />
        </Modal>
      </main>
    </div>
  );
};
