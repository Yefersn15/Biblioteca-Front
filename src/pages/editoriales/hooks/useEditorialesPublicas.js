// src/pages/editoriales/hooks/useEditorialesPublicas.js
import { useState, useEffect } from 'react';
import { getAll } from '../services/editorialesService';

export const useEditorialesPublicas = () => {
  const [editoriales, setEditoriales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll({ limit: 200 }).then(({ items }) => {
      setEditoriales(items);
      setLoading(false);
    });
  }, []);

  return { editoriales, loading };
};
