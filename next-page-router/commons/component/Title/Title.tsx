import { Button } from 'antd';
import React from 'react';
interface Props {
  title: string;
  isAdd: boolean;
  hanldeAdd: () => void;
}

export default function TitlePage({ title, isAdd, hanldeAdd }: Props) {
  return (
    <header className="flex items-center justify-between mb-4 px-3">
      <h2 className="text-2xl flex-1">{title}</h2>
      {isAdd && (
        <div>
          <Button onClick={hanldeAdd}>Add News</Button>
        </div>
      )}
    </header>
  );
}
