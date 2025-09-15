"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Check, 
  X, 
  Edit3, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoListProps {
  onTaskUpdate: (tasks: Task[]) => void;
  onOpenLeftPanel?: (tab: string) => void;
}

export function TodoList({ onTaskUpdate, onOpenLeftPanel }: TodoListProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Mobile UX Audit",
      status: "in-progress",
      priority: "urgent",
      description: "Analyze mobile conversion drop",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "2", 
      title: "Scale Email Campaigns",
      status: "pending",
      priority: "high",
      description: "Double down on 45% revenue driver",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "3",
      title: "Social Media Budget Increase",
      status: "pending", 
      priority: "medium",
      description: "Increase by 25% for $15-20K upside",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      status: "pending",
      priority: "medium",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    onTaskUpdate(updatedTasks);
    setNewTaskTitle("");
  };

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, updatedAt: new Date() }
        : task
    );
    setTasks(updatedTasks);
    onTaskUpdate(updatedTasks);
  };

  const updateTaskTitle = (taskId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, title: newTitle.trim(), updatedAt: new Date() }
        : task
    );
    setTasks(updatedTasks);
    onTaskUpdate(updatedTasks);
    setEditingTask(null);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    onTaskUpdate(updatedTasks);
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "urgent": return "text-red-600 dark:text-red-400";
      case "high": return "text-orange-600 dark:text-orange-400";
      case "medium": return "text-blue-600 dark:text-blue-400";
      case "low": return "text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-600 animate-pulse" />;
      case "pending": return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const [showAddInput, setShowAddInput] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Tasks</h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowAddInput(true)}
          className="h-6 w-6 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Add New Task - Compact */}
      {showAddInput && (
        <div className="mb-2">
          <Input
            placeholder="Add task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask();
                setShowAddInput(false);
              }
              if (e.key === 'Escape') {
                setShowAddInput(false);
                setNewTaskTitle("");
              }
            }}
            onBlur={() => {
              if (newTaskTitle.trim()) {
                addTask();
              }
              setShowAddInput(false);
            }}
            className="text-sm h-8 px-2 py-1"
            autoFocus
          />
        </div>
      )}

      {/* Minimal Task List */}
      <div className="space-y-1">
        {tasks.slice(0, 3).map((task) => (
          <div 
            key={task.id} 
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors"
            onClick={() => onOpenLeftPanel?.('daily')}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                const nextStatus = task.status === 'pending' ? 'in-progress' : 
                                 task.status === 'in-progress' ? 'completed' : 'pending';
                updateTaskStatus(task.id, nextStatus);
              }}
              className="hover:scale-110 transition-transform"
            >
              {getStatusIcon(task.status)}
            </button>
            
            <div className="flex-1 min-w-0 flex items-center gap-2 group">
              {editingTask === task.id ? (
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') updateTaskTitle(task.id, editTitle);
                    if (e.key === 'Escape') setEditingTask(null);
                  }}
                  onBlur={() => updateTaskTitle(task.id, editTitle)}
                  className="text-sm h-6"
                  autoFocus
                />
              ) : (
                <>
                  <div className={`text-sm font-medium truncate ${
                    task.status === 'completed' 
                      ? 'line-through text-gray-500 dark:text-gray-400' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}>
                    {task.title}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingTask(task.id);
                      setEditTitle(task.title);
                    }}
                    className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
            
            {task.priority === 'urgent' && (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
          </div>
        ))}
        
        {tasks.length > 3 && (
          <div 
            className="text-xs text-gray-500 dark:text-gray-400 text-center py-2 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
            onClick={() => onOpenLeftPanel?.('daily')}
          >
            +{tasks.length - 3} more tasks
          </div>
        )}
      </div>

      {/* Task Summary */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        {tasks.filter(t => t.status === 'completed').length} completed • {' '}
        {tasks.filter(t => t.status === 'in-progress').length} in progress • {' '}
        {tasks.filter(t => t.status === 'pending').length} pending
      </div>
    </div>
  );
}
