/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Circle, XCircle, Pencil, Calendar, Tag, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Save } from 'lucide-react';
import { Task, CategoryPreset } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
  categories: CategoryPreset[];
}

export function TaskItem({ task, onToggle, onDelete, onUpdate, categories }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editCategory, setEditCategory] = useState(task.category);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDate, setEditDate] = useState(task.date);
  const [editNotes, setEditNotes] = useState(task.notes || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate({
      ...task,
      title: editTitle.trim(),
      category: editCategory,
      priority: editPriority,
      date: editDate,
      notes: editNotes.trim() || undefined,
    });
    setIsEditing(false);
  };

  const selectedCat = categories.find(c => c.name === task.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      style={{ contentVisibility: 'auto' }}
      className="border-b border-gray-100 dark:border-gray-800/40 py-3.5 transition-colors duration-200"
      id={`task-item-${task.id}`}
    >
      <div className="flex items-center gap-3.5 px-1 group">
        {/* Checked/Unchecked Toggle */}
        <button
          onClick={() => onToggle(task.id)}
          className="flex-shrink-0 relative focus:outline-none focus:ring-2 focus:ring-green-400 rounded-full cursor-pointer"
          id={`toggle-btn-${task.id}`}
          aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
        >
          <motion.div whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
            {task.completed ? (
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white border-2 border-green-500">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-green-500/80 hover:border-green-500 flex items-center justify-center text-transparent hover:text-green-500/20">
                <Check className="w-3.5 h-3.5 stroke-[2] text-current" />
              </div>
            )}
          </motion.div>
        </button>

        {/* Task Title */}
        <div className="flex-grow flex flex-col min-w-0">
          <span
            onClick={() => onToggle(task.id)}
            className={`font-sans text-base transition-all duration-200 cursor-pointer select-none truncate ${
              task.completed
                ? 'line-through text-gray-400 dark:text-gray-500 font-normal'
                : 'text-gray-800 dark:text-gray-100 font-medium'
            }`}
          >
            {task.title}
          </span>
          
          {/* Subtle metadata pills underneath */}
          {!isEditing && (
            <div className="flex flex-wrap gap-1.5 mt-1 items-center">
              {/* Category Pill */}
              {task.category && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedCat?.color || '#a1a1aa' }} />
                  {task.category}
                </span>
              )}
              {/* Date Pill */}
              {task.date && (
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                  <Calendar className="w-2.5 h-2.5" />
                  {task.date}
                </span>
              )}
              {/* Priority Pill */}
              {task.priority !== 'low' && (
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  task.priority === 'high' 
                    ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400' 
                    : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                }`}>
                  <AlertTriangle className="w-2.5 h-2.5" />
                  {task.priority.toUpperCase()}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
          {/* Delete Icon */}
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors active:scale-90"
            id={`delete-btn-${task.id}`}
            title="Delete task"
          >
            <XCircle className="w-5 h-5 stroke-[1.8]" />
          </button>
          
          {/* Edit/Brush Toggle */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-1.5 rounded-full transition-colors active:scale-90 ${
              isEditing 
                ? 'text-green-600 bg-green-50 dark:bg-green-950/40' 
                : 'text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20'
            }`}
            id={`edit-btn-${task.id}`}
            title="Edit / Customize details"
          >
            <Pencil className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>
      </div>

      {/* Editing Panel (Custom slide-down details form) */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="overflow-hidden mt-3 px-3 mx-1 bg-gray-50/75 dark:bg-gray-800/20 rounded-xl border border-gray-100 dark:border-gray-800/50"
            id={`task-edit-panel-${task.id}`}
          >
            <div className="py-4 space-y-3.5 text-sm">
              {/* Title input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-1.5 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm font-medium"
                  placeholder="Task title"
                />
              </div>

              {/* Grid or row for Category and Priority */}
              <div className="grid grid-cols-2 gap-3">
                {/* Category selectors */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                    Category
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-2 py-1.5 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs font-semibold select-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority input */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                    Priority
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-white dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
                    {(['low', 'medium', 'high'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setEditPriority(p)}
                        className={`py-1 text-[10px] font-extrabold rounded-md uppercase transition-all ${
                          editPriority === p
                            ? p === 'high'
                              ? 'bg-rose-500 text-white'
                              : p === 'medium'
                              ? 'bg-amber-500 text-white'
                              : 'bg-green-600 text-white'
                            : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Target date input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs font-semibold"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                  Notes / Subtext
                </label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-400 text-xs"
                  placeholder="Add notes about this task..."
                />
              </div>

              {/* Action and Save Options */}
              <div className="flex gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 font-semibold text-white px-3.5 py-1.5 text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
