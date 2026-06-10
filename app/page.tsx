// main entry point
import TodoApp from "./components/todo";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-0px)] flex-1 items-center justify-center bg-black-50 font-sans text-black-900">
      <TodoApp />
    </main>

  );
}

