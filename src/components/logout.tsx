import React from 'react';

export default function LogoutButton(): JSX.Element {
  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  return <button onClick={handleLogout}>Logout</button>;
}
