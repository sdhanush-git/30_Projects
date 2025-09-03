import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface Props {
  onAdd: (activity: string, hours: number) => void;
}

const TimeForm = ({ onAdd }: Props) => {
  const [activity, setActivity] = useState("");
  const [hours, setHours] = useState("");

  const addActivity = () => {
    if (!activity.trim() || !hours) return alert("Please fill the form");
    onAdd(activity, Number(hours));
    setActivity("");
    setHours("");
  };

  return (
    <div className="space-y-4">
      <Input
        className="w-full rounded-md bg-[#D1D8BE] text-[#819A91] border-none focus:ring-2 focus:ring-[#A7C1A8]"
        placeholder="Activity (e.g sleep)"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <Input
        className="w-full rounded-md bg-[#D1D8BE] text-[#819A91] border-none focus:ring-2 focus:ring-[#A7C1A8]"
        placeholder="Hours"
        value={hours}
        type="number"
        min="0"
        max="24"
        onChange={(e) => setHours(e.target.value)}
      />

      <Button
        className="w-full my-3 rounded-md bg-[#819A91] text-white hover:bg-[#A7C1A8] transition"
        onClick={addActivity}
      >
        Add Activity
      </Button>
    </div>
  );
};

export default TimeForm;
