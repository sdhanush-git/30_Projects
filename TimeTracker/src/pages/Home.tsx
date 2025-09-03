import { useState, useEffect } from "react";
import InputForm from "../components/TimeForm";
import TimeChart from "@/components/TimeChart";
import Navbar from "@/components/Navbar";

const Home = () => {
  const [data, setData] = useState<{ activity: string; hours: number }[]>([]);
  const [saveClicked, setSaveClicked] = useState(false);
  const [clearClicked, setClearClicked] = useState(false);

  // Load saved data from localStorage once on mount
  useEffect(() => {
    const saved = localStorage.getItem("activities");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handleAdd = (activity: string, hours: number) => {
    setData((pre) => [...pre, { activity, hours }]);
  };

  // Save data to localStorage with animation trigger
  const handleSave = () => {
    setSaveClicked(true);
    localStorage.setItem("activities", JSON.stringify(data));
    alert("Successfully saved");
  };

  // Clear localStorage and state with animation trigger
  const handleClear = () => {
    setClearClicked(true);
    localStorage.removeItem("activities");
    setData([]);
    alert("Successfully deleted");
  };

  // Remove animation class after it ends (300ms pulse duration)
  useEffect(() => {
    if (saveClicked) {
      const timer = setTimeout(() => setSaveClicked(false), 300);
      return () => clearTimeout(timer);
    }
  }, [saveClicked]);

  useEffect(() => {
    if (clearClicked) {
      const timer = setTimeout(() => setClearClicked(false), 300);
      return () => clearTimeout(timer);
    }
  }, [clearClicked]);

  return (
    <>
      <Navbar />
      <div className="mx-auto my-20 px-4 py-4 rounded-xl shadow-lg max-w-lg w-full bg-[#EEEFE0] flex flex-col gap-7 sm:max-w-md md:max-w-xl md:p-6 min-h-[40vh]">
        <h2 className="font-bold text-2xl text-[#819A91]">Time Tracker</h2>
        <InputForm onAdd={handleAdd} />
        <TimeChart data={data} />
        {/* Save and Clear buttons below the chart */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSave}
            className={`flex-1 bg-[#819A91] text-white py-2 rounded hover:bg-[#A7C1A8] transition transform ${
              saveClicked ? "scale-110" : ""
            }`}
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className={`flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition transform ${
              clearClicked ? "scale-110" : ""
            }`}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
