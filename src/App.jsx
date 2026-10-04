import { useEffect, useMemo, useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskItem from './components/TaskItem.jsx';
import { loadTasks, saveTasks } from './storage.js';

const filters = [
  { id: 'all', label: 'Tümü' },
  { id: 'active', label: 'Devam edenler' },
  { id: 'completed', label: 'Tamamlananlar' },
];

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState('all');
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      saveTasks(tasks);
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  const visibleTasks = useMemo(() => tasks.filter((task) =>
    filter === 'all' || (filter === 'active' && !task.completed) || (filter === 'completed' && task.completed)
  ), [tasks, filter]);

  function addTask(values) {
    setTasks((current) => [{ id: crypto.randomUUID(), ...values, completed: false }, ...current]);
    setFilter('all');
  }

  function editTask(id, values) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, ...values } : task));
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand"><span className="brand-mark" aria-hidden="true">✳</span><span>odak<span className="brand-dot">.</span></span></div>
        <span className="header-note">Gününe alan aç.</span>
      </header>

      <main>
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> DAHA SADE BİR GÜN</span>
            <h1 id="page-title">Küçük adımlar,<br /><em>büyük ilerleme.</em></h1>
            <p>Yapacaklarını bir yere bırak. Önceliklerini gör, ilerlemeni takip et ve tamamladıklarının keyfini çıkar.</p>
          </div>
          <div className="hero-art" aria-hidden="true"><div className="orb orb-one" /><div className="orb orb-two" /><div className="art-star">✳</div><div className="art-spark">✦</div></div>
        </section>

        <section className="stats" aria-label="Görev özeti">
          <div className="stat"><span className="stat-number">{tasks.length.toString().padStart(2, '0')}</span><span>Toplam görev</span></div>
          <div className="stat"><span className="stat-number">{activeCount.toString().padStart(2, '0')}</span><span>Devam eden</span></div>
          <div className="stat"><span className="stat-number">{completedCount.toString().padStart(2, '0')}</span><span>Tamamlanan</span></div>
          <div className="stats-caption">Her tamamlanan görev,<br />yeni bir başlangıç.</div>
        </section>

        <div className="content-grid">
          <TaskForm onAdd={addTask} />
          <section className="list-section" aria-labelledby="list-heading">
            <div className="list-heading-row"><div><span className="eyebrow">GÜNÜNÜN AKIŞI</span><h2 id="list-heading">Görevlerin</h2></div><span className="list-count">{tasks.length} görev</span></div>
            <div className="filters" role="group" aria-label="Görevleri filtrele">
              {filters.map((item) => <button key={item.id} type="button" className={`filter ${filter === item.id ? 'selected' : ''}`} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}
            </div>
            {visibleTasks.length ? (
              <ul className="task-list">{visibleTasks.map((task) => <TaskItem key={task.id} task={task} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />)}</ul>
            ) : (
              <div className="empty-state"><span aria-hidden="true">✦</span><h3>{tasks.length ? 'Burada henüz görev yok.' : 'Başlamak için bir görev ekle.'}</h3><p>{tasks.length ? 'Diğer sekmelere göz atabilir veya yeni bir görev ekleyebilirsin.' : 'İlk adımı atmak için soldaki formu doldur.'}</p></div>
            )}
          </section>
        </div>
        {storageError && <p className="storage-error" role="alert">Görevler bu tarayıcıda saklanamadı. Depolama iznini kontrol et.</p>}
      </main>
      <footer className="site-footer"><span>odak<span className="brand-dot">.</span></span><span>Biraz daha net. Biraz daha hafif.</span><span>Verilerin yalnızca bu tarayıcıda saklanır.</span></footer>
    </div>
  );
}
