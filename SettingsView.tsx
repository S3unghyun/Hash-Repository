/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  date: string; // YYYY-MM-DD formatted
  notes?: string;
  priority: 'low' | 'medium' | 'high';
}

export type ActiveTab = 'tasks' | 'calendar' | 'settings';

export interface CategoryPreset {
  id: string;
  name: string;
  color: string; // Tailwind color class or hex
}
