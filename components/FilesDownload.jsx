import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '@/configs/auth'

import {
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from './ui/button';

function FilesDownload({ cmessage, cindex }) {
  const [encryptedData, setEncryptedData] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [inputCipher, setInputCipher] = useState('');
  const secretKey = 'mySecretKey123';

  const handleDecrypt = () => {
    try {
      const decrypted = CryptoJS.AES.decrypt(message.Hash, secretKey);
      const typedArray = new Uint8Array(decrypted.words.length * 4);
      for (let i = 0; i < decrypted.words.length; i++) {
        const word = decrypted.words[i];
        typedArray[i * 4] = (word >> 24) & 0xff;
        typedArray[i * 4 + 1] = (word >> 16) & 0xff;
        typedArray[i * 4 + 2] = (word >> 8) & 0xff;
        typedArray[i * 4 + 3] = word & 0xff;
      }
      const blob = new Blob([typedArray], { type: fileType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${message.Filename?.split("_")[0]}.${message.Extension}`;
      link.click();
    } catch (error) {
      console.error('Ошибка при расшифровке:', error);
      alert('Ошибка при расшифровке файла. Проверьте правильность шифра.');
    }
  };

  //------------------------------------//
  //SERVER ACTIONS//

  const session = useSession(authConfig);
  const [filename, setFilename] = useState('');
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentFilename = cmessage[cindex]?.Filename;
        setFilename(currentFilename);
        const response = await axios.post('http://147.45.157.124:2525/api/getfileshash', { currentFilename });
        setMessage(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        setMessage('Произошла ошибка при отправке данных');
        console.error('Ошибка:', error);
      }
    };

    fetchData();
  });

  return (
    <div className='h-full w-full' onClick={handleDecrypt} >Скачать</div>
  );
}

export default FilesDownload;