'use client';
import { logout } from '@/actions/authentication/auth';
import React from 'react';

const Logout = () => {
  return (
    <div onClick={() => logout()}>
      <div className="bg-gray-600 text-white text-sm px-4 py-2 rounded-md cursor-pointer">
        logout
      </div>
    </div>
  );
};

export default Logout;
