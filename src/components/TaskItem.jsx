import { useState } from 'react';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState('');

  function save(event) {
    event.preventDefault();
    if (!title.trim()) {
      setError('Görev başlığı boş bırakılamaz.');
      return;
    }
    onEdit(task.id, { title: title.trim(), description: description.trim() });
    setError('');
    setEditing(false);
  }

  function cancel() {
    setTitle(task.title);
    setDescription(task.description);
    setError('');
    setEditing(false);
  }

  function remove() {
    if (window.confirm(`“${task.title}” görevini silmek istiyor musun?`)) onDelete(task.id);
  }

  return (
    <li className={`task-card ${task.completed ? 'is-complete' : ''}`}>
      {editing ? (
        <form className="edit-form" onSubmit={save}>
          <label htmlFor={`edit-title-${task.id}`}>Görev başlığı</label>
          <input id={`edit-title-${task.id}`} value={title} onChange={(event) => { setTitle(event.target.value); setError(''); }} maxLength={100} aria-invalid={Boolean(error)} aria-describedby={error ? `edit-error-${task.id}` : undefined} required autoFocus />
          {error && <p className="field-error" id={`edit-error-${task.id}`} role="alert">{error}</p>}
          <label htmlFor={`edit-description-${task.id}`}>Açıklama</label>
          <textarea id={`edit-description-${task.id}`} value={description} onChange={(event) => setDescription(event.target.value)} maxLength={300} rows="2" />
          <div className="edit-actions">
            <button type="button" className="text-button" onClick={cancel}>Vazgeç</button>
            <button type="submit" className="primary-button small">Kaydet</button>
          </div>
        </form>
      ) : (
        <>
          <button className="check-button" type="button" role="checkbox" aria-checked={task.completed}
            aria-label={`${task.title} görevini ${task.completed ? 'tamamlanmadı' : 'tamamlandı'} olarak işaretle`}
            onClick={() => onToggle(task.id)}><span aria-hidden="true">{task.completed ? '✓' : ''}</span></button>
          <div className="task-content">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <span className={`status ${task.completed ? 'done' : ''}`}>{task.completed ? 'Tamamlandı' : 'Devam ediyor'}</span>
          </div>
          <div className="task-actions">
            <button className="icon-button" type="button" aria-label={`${task.title} görevini düzenle`} title="Düzenle" onClick={() => setEditing(true)}>✎</button>
            <button className="icon-button danger" type="button" aria-label={`${task.title} görevini sil`} title="Sil" onClick={remove}>×</button>
          </div>
        </>
      )}
    </li>
  );
}
