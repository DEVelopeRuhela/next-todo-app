"use client";

import { useState } from "react";
import toast from "react-hot-toast";


export const TodoInput = ({
  checkDelay,
  onAdd,
  disabled,
}: {
  checkDelay: () => Promise<void>;
  onAdd: (text: string, priority: string, targetDate:string, targetTime:string ) => Promise<void>;
  disabled?: boolean;
}) => {
  const [targetDate, setTargetDate] = useState<string>("");
  const [targetTime, setTargetTime] = useState<string>("");
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    
    try {
      await onAdd(trimmed, priority, targetDate, targetTime);
      setText("");
      setPriority("Medium");
      setTargetDate("");
      setTargetTime("");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-300 transition-all shadow-sm"
        disabled={disabled}
      />
      
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
        <select
          className="flex-1 md:flex-none rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 shadow-sm"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        
        <input 
          type="date" 
          className="flex-1 md:flex-none rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 shadow-sm text-zinc-600" 
          onChange={(e) => setTargetDate(e.target.value)} 
          value={targetDate} 
        />
        
        <input 
          type="time" 
          className="flex-1 md:flex-none rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 shadow-sm text-zinc-600" 
          onChange={(e) => setTargetTime(e.target.value)} 
          value={targetTime} 
        />
        
        <button
          type="submit"
          disabled={disabled}
          className="w-full md:w-auto md:ml-auto rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-zinc-800 transition-colors shadow-sm"
        >
          Add 
        </button>
      </div>
    </form>
  );
}


