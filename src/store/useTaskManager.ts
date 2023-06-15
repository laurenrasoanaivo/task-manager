import create from 'zustand';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskManagerState {
  tasks: Task[];
  searchTask: string;
  addTask: (newTask: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
  setSearchTask: (search: string) => void;
}

const useTaskManager = create<TaskManagerState>((set) => ({
  tasks: [],
  searchTask: '',
  addTask: (newTask) => {
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },
  updateTask: (taskId, updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    }));
  },
  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
  setSearchTask: (search) => {
    set({ searchTask: search });
  },
}));

export { useTaskManager };
