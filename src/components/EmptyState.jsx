function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🎬</div>

      <h2>{title}</h2>

      <p>{message}</p>
    </div>
  );
}

export default EmptyState;