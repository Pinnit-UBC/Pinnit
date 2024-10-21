import React from 'react';

function FeedbackForm() {
  return (
    <div style={{ padding: '20px' }}>
      <iframe
        title="Feedback Form"
        src="https://form.jotform.com/242572996415265"
        frameBorder="0"
        style={{ width: '100%', height: '1200px', border: 'none', overflow: 'hidden' }}
        scrolling="no"  // Disable scrolling
        allowFullScreen
      />
    </div>
  );
}

export default FeedbackForm;
