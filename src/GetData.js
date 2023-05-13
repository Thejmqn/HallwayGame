import { useState, useEffect } from 'react';

function GetData(file) {
  const [fileData, setFileData] = useState('');

  useEffect(() => {
    fetch(file)
      .then(response => response.text())
      .then(data => setFileData(data))
      .catch(error => console.error(error));
  }, []);

  return fileData;
}

export default GetData;