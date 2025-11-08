'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log critical error
    console.error('Global error:', error);
    
    // TODO: Send to error tracking service (e.g., Sentry)
    // trackCriticalError(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '1rem'
            }}>
              Critical Error
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#a0a0a0',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              A critical error occurred. Please refresh the page or contact support if the issue persists.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#fff',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
            {process.env.NODE_ENV === 'development' && (
              <code style={{
                display: 'block',
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                color: '#e74c3c',
                fontFamily: '"Courier New", monospace',
                fontSize: '0.875rem',
                wordBreak: 'break-word'
              }}>
                {error.message}
              </code>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
