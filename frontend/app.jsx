import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Simulate API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است.');
      }
    } catch (error) {
      setError('خطایی رخ داده است.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir='rtl'>
      <h1>سامانه مدیریت تسهیلات بانکی</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor='username'>نام کاربری:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>رمز عبور:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='button' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'مخفی کردن' : 'نمایش'}
          </button>
        </div>
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <button type='submit' onClick={handleLogin} disabled={loading}>
          {loading ? 'در حال بارگذاری...' : 'ورود'}
        </button>
      </form>
    </div>
  );
}

export default App;