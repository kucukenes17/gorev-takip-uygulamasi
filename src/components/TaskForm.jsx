import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      setError('Görev başlığı boş bırakılamaz.');
      return;
    }
    onAdd({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
    setError('');
  }

  return (
    <section className="composer panel" aria-labelledby="new-task-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">YENİ BİR BAŞLANGIÇ</span>
          <h2 id="new-task-heading">Aklındakini listeye ekle</h2>
        </div>
        <span className="composer-icon" aria-hidden="true">✳</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-title">Görev başlığı <span className="required">*</span></label>
        <input id="task-title" value={title} onChange={(event) => { setTitle(event.target.value); setError(''); }}
          maxLength={100} placeholder="Örn. Proje sunumunu hazırla" aria-invalid={Boolean(error)} aria-describedby={error ? 'title-error' : undefined} required />
        {error && <p className="field-error" id="title-error" role="alert">{error}</p>}
        <label htmlFor="task-description">Açıklama <span className="optional">(isteğe bağlı)</span></label>
        <textarea id="task-description" value={description} onChange={(event) => setDescription(event.target.value)}
          maxLength={300} rows="3" placeholder="Kendine küçük bir not bırak..." />
        <div className="form-footer">
          <span>Bir adım atmak, başlamanın en güzel yolu.</span>
          <button className="primary-button" type="submit"><span aria-hidden="true">＋</span> Görev ekle</button>
        </div>
      </form>
    </section>
  );
}
