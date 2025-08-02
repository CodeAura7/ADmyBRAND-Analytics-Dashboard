"use client";
import React, { useState } from "react";
import type { FilterOptions } from "../types";
import Modal from "./Modal";

type FilterProps = {
  onFilter: (filters: FilterOptions) => void;
  campaignTypes: string[];
};

export default function Filter({ onFilter, campaignTypes }: FilterProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleApply = () => {
    if (!startDate || !endDate) {
      setModalMessage("Please select both start and end dates.");
      setIsModalOpen(true);
      return;
    }

    onFilter({
      dateRange: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      campaignType,
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="campaignType" className="form-label">Campaign Type</label>
            <select
              id="campaignType"
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value)}
              className="form-select"
            >
              <option value="">All</option>
              {campaignTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <button
              onClick={handleApply}
              className="btn btn-primary w-100"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Input Error">
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}
