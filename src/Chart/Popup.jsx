export const Popup = ({ data, setAnnotations, setShowPopupPopup }) => {
  return (
    <div
      style={{
        width: 150,
        left: 0,
        top: 0,
        padding: '0.25rem',
        position: 'fixed',
        border: '1px solid grey',
        color: 'white',
        background: 'darkgrey',
        borderRadius: 5,
        transform: `translate(${data.positionX - 50}px, ${
          data.positionY - 15
        }px)`,
      }}
    >
      <button
        style={{ fontSize: 8, position: 'absolute', right: 0, top: 0 }}
        onClick={() => setShowPopupPopup(null)}
      >
        X
      </button>
      <button
        onClick={() => {
          setAnnotations(prev => [...prev, { ...data, alert: true }]);
          setShowPopupPopup(null);
        }}
      >
        Alert
      </button>
      <button
        onClick={() => {
          setAnnotations(prev => [...prev, { ...data, text: '' }]);
          setShowPopupPopup(null);
        }}
      >
        Comment
      </button>
    </div>
  );
};
