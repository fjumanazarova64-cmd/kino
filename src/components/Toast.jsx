import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#1c1c22',
        color: '#ffffff',
        padding: '14px 20px',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 3000,
        animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <CheckCircle size={20} color="#2bb673" />
      <span style={{ fontSize: '14px', fontWeight: 600 }}>{toast.message}</span>
    </div>
  );
}
