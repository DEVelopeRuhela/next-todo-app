"use client";

import { useState } from "react";


export const TodoInput = ({
  onAdd,
  disabled,
}: {
  onAdd: (text: string) => void;
  disabled?: boolean;
}) => {
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo…"
        className="flex-1 rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300"

        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}


