const STORAGE_KEY = 'odak.tasks.v1';

export function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return [];
    return saved.filter((task) =>
      task && typeof task.id === 'string' && typeof task.title === 'string' &&
      typeof task.description === 'string' && typeof task.completed === 'boolean'
    );
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
