import React from 'react';

interface Props {
  className?: string;
  size?: number;
  color?: string;
}

function EthereumLogo({className, color, size}: Props) {
  return (
    <svg className={className} width={size} viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.49975 1L1.00391 9.02284L6.49975 11.8866L11.9956 9.02284L6.49975 1Z" fill="none" stroke={color}
            strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M6.5 14.1091L1 11.2637L6.5 18.0582L12 11.2637L6.5 14.1091Z" fill="none" stroke={color}
            strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}

EthereumLogo.defaultProps = {
  color: '#000000'
}

export default EthereumLogo;
