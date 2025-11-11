
// Custom Hook for  Dynamically change the Webpage Titles


import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDocumentTitle;
