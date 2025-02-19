'use client';

import StudentList from '@/components/features/student/StudentList';
import React from 'react';
import { useParams } from 'next/navigation';

const Student = () => {
  const { id } = useParams();
  return <StudentList schoolId={id as string} />;
};

export default Student;
