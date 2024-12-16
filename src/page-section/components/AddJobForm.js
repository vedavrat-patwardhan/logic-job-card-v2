import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import { createJob } from "../../api/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const jobSchema = z.object({
  // Required fields
  customerName: z.string().min(1, "Customer name is required"),
  mobileNo: z.string().min(1, "Phone number is required"),
  material: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .transform((val) => val.value),
  brand: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .transform((val) => val.value),
  problem: z.string().min(1, "Problem description is required"),

  // Optional fields
  srNo: z.string().optional(),
  password: z.string().optional(),
  estimate: z.string().optional(),
  repairedBy: z.string().optional(),
  modelNo: z.string().optional(),
  accessories: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .transform((val) => val?.map((item) => item.value))
    .optional()
    .default([]),
  receivedBy: z.string().optional(),
  remark: z.string().optional(),
});

const materialOptions = [
  { value: "Laptop", label: "Laptop" },
  { value: "Projector", label: "Projector" },
  { value: "Tablet", label: "Tablet" },
  { value: "Printer", label: "Printer" },
];

const brandOptions = [
  { value: "Hp", label: "HP" },
  { value: "Dell", label: "Dell" },
  { value: "Asus", label: "Asus" },
  { value: "Lenovo", label: "Lenovo" },
  { value: "Apple", label: "Apple" },
  { value: "BenQ", label: "BenQ" },
  { value: "Acer", label: "Acer" },
  { value: "Other", label: "Other" },
];

const accessoryOptions = [
  { value: "bag", label: "Bag" },
  { value: "charger", label: "Charger" },
  { value: "powerCord", label: "Power Cord" },
  { value: "mouse", label: "Mouse" },
  { value: "dongle", label: "Dongle" },
];

export const AddJobForm = ({ onClose, onSuccess }) => {
  const [jobNo, setJobNo] = useState("Loading...");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      customerName: "",
      companyName: "",
      currentStatus: "",
      done: false,
      mobileNo: "",
      material: "",
      accessories: [],
      brand: "",
      modelNo: "",
      srNo: "",
      password: "",
      problem: "",
      estimate: "",
      receivedBy: "",
      repairedBy: "",
      remark: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createJob({ ...data, jobNo });
      toast.success("Job created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to create job");
    }
  };

  const inputStyle =
    "w-full px-4 py-2 text-gray-900 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  const renderError = (field) => {
    if (errors[field]) {
      return (
        <p className="mt-1 text-sm text-red-500">{errors[field].message}</p>
      );
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DATA_API_URL}/latest-job`)
      .then((res) => {
        const newNo = parseInt(res.data.jobNo.slice(2)) + 1;
        const newJobNo = `LS${newNo}`;
        setJobNo(newJobNo);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label className={labelStyle}>Job No</label>
          <input
            value={jobNo}
            disabled
            placeholder="Enter job number"
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Date</label>
          <input type="date" {...register("date")} className={inputStyle} />
          {renderError("date")}
        </div>

        <div>
          <label className={labelStyle}>Customer Name</label>
          <input
            {...register("customerName", {
              required: "Customer name is required",
            })}
            placeholder="Enter customer name"
            className={inputStyle}
          />
          {renderError("customerName")}
        </div>

        <div>
          <label className={labelStyle}>Company Name</label>
          <input
            {...register("companyName")}
            placeholder="Enter company name"
            className={inputStyle}
          />
          {renderError("companyName")}
        </div>

        <div>
          <label className={labelStyle}>Mobile No</label>
          <input
            {...register("mobileNo", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter valid 10 digit mobile number",
              },
            })}
            placeholder="Enter 10 digit mobile number"
            className={inputStyle}
          />
          {renderError("mobileNo")}
        </div>

        <div>
          <label className={labelStyle}>Material</label>
          <Controller
            name="material"
            control={control}
            rules={{ required: "Material is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={materialOptions}
                placeholder="Select material"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {renderError("material")}
        </div>

        <div>
          <label className={labelStyle}>Brand</label>
          <Controller
            name="brand"
            control={control}
            rules={{ required: "Brand is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={brandOptions}
                placeholder="Select brand"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {renderError("brand")}
        </div>

        <div>
          <label className={labelStyle}>Model No</label>
          <input
            {...register("modelNo")}
            placeholder="Enter model number"
            className={inputStyle}
          />
          {renderError("modelNo")}
        </div>

        <div>
          <label className={labelStyle}>Serial No</label>
          <input
            {...register("srNo")}
            placeholder="Enter serial number"
            className={inputStyle}
          />
          {renderError("srNo")}
        </div>

        <div>
          <label className={labelStyle}>Password</label>
          <input
            {...register("password")}
            type="text"
            placeholder="Enter device password"
            className={inputStyle}
          />
          {renderError("password")}
        </div>

        <div className="col-span-2">
          <label className={labelStyle}>Accessories</label>
          <Controller
            name="accessories"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                closeMenuOnSelect={false}
                options={accessoryOptions}
                placeholder="Select accessories"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {renderError("accessories")}
        </div>
        <div className="col-span-2">
          <label className={labelStyle}>Problem</label>
          <textarea
            {...register("problem", {
              required: "Problem description is required",
            })}
            placeholder="Describe the problem"
            rows={3}
            className={inputStyle}
          />
          {renderError("problem")}
        </div>

        <div>
          <label className={labelStyle}>Estimate</label>
          <input
            {...register("estimate")}
            placeholder="Enter estimate amount"
            className={inputStyle}
          />
          {renderError("estimate")}
        </div>

        <div>
          <label className={labelStyle}>Received By</label>
          <input
            {...register("receivedBy", { required: "Received by is required" })}
            placeholder="Enter receiver's name"
            className={inputStyle}
          />
          {renderError("receivedBy")}
        </div>

        <div>
          <label className={labelStyle}>Repaired By</label>
          <input
            {...register("repairedBy")}
            placeholder="Enter repairer's name"
            className={inputStyle}
          />
          {renderError("repairedBy")}
        </div>

        <div className="col-span-2">
          <label className={labelStyle}>Remarks</label>
          <textarea
            {...register("remark")}
            placeholder="Enter additional remarks"
            rows={2}
            className={inputStyle}
          />
          {renderError("remark")}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded hover:bg-blue-600"
        >
          Create Job
        </button>
      </div>
    </form>
  );
};
