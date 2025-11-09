import React from 'react';
import Image from 'next/image';

interface LogoSpinnerProps {
  size?: number;
  className?: string;
  spinning?: boolean;
}

const LogoSpinner: React.FC<LogoSpinnerProps> = ({ size = 80, className = '', spinning = true }) => {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        transition: 'filter 0.2s',
        filter: spinning ? undefined : 'grayscale(60%)',
      }}
      tabIndex={0}
      aria-label="Sweet Psilocybe Logo Spinner"
      onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
      onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      onFocus={e => (e.currentTarget.style.animationPlayState = 'paused')}
      onBlur={e => (e.currentTarget.style.animationPlayState = 'running')}
    >
      <style jsx>{`
        div {
          animation: ${spinning ? 'spin 2s linear infinite' : 'none'};
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <Image
        src={require('../../../public/images/publicimageslogo-spinner.svg.png')}
        alt="Sweet Psilocybe Logo Spinner"
        width={size}
        height={size}
        priority
        draggable={false}
      />
    </div>
  );
};

export default LogoSpinner;
