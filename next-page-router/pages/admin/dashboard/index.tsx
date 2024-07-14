import DefaultLayout from '@/commons/component/DefaultLayout';
import TitlePage from '@/commons/component/Title/Title';
import { getAuthLocalData } from '@/hook/token';
import { useSevices } from '@/hook/useSevices';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const authData = getAuthLocalData();
  const { getCaller } = useSevices();

  return (
    <DefaultLayout>
      <div className="w-full px-10 lg:pr-28">
        {/* <!-- Page content here --> */}
        <h2 className="text-4xl font-bold text-center my-10">Welcome to your Dashboard</h2>
      </div>

      <div className="grid grid-cols-3"></div>
    </DefaultLayout>
  );
}
