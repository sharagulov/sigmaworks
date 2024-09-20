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

function FileEncryptor() {
  const [encryptedData, setEncryptedData] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [inputCipher, setInputCipher] = useState('');
  const secretKey = 'mySecretKey123';

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setFileType(file.type);

    const arrayBuffer = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
    const encrypted = CryptoJS.AES.encrypt(wordArray, secretKey).toString();
    setEncryptedData(encrypted);
  };

  const handleDecrypt = () => {
    try {
      const decrypted = CryptoJS.AES.decrypt(inputCipher, secretKey);
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
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Ошибка при расшифровке:', error);
      alert('Ошибка при расшифровке файла. Проверьте правильность шифра.');
    }
  };

  //------------------------------------//
  //SERVER ACTIONS//

  const session = useSession(authConfig);
  const [owner, setOwner] = useState('');
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.data?.user.name) {
      setOwner(session?.data?.user.name);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const filename = fileName.split('.')[0];
      const extension = fileName.split('.')[1];
      const hash = encryptedData;
      console.log(extension);
      const response = await axios.post('/api/addfiles', { filename, extension, owner, hash });
      setMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setMessage('Произошла ошибка при отправке данных');
    }
  };

  return (
    <div>

      <div className='flex flex-row justify-between'>
        <div className="file-encryptor-container content-center text-center">
          <input id="file-upload" accept='.docx, .doc, .pdf, .txt' className='maga' type="file" onChange={handleFileUpload} />
          <label htmlFor="file-upload" className='text-sm lbl bg-accent-light p-2 rounded-2xl shadow hover:shadow-lg transition-all'>Загрузить файл</label>
          {fileName && <span className='ml-3 text-sm'>{fileName}</span>}

          {/* {encryptedBase64 && (
        <>
        <h3>Зашифрованные данные (Base64):</h3>
        <textarea value={encryptedBase64} readOnly rows="10" cols="50" />
        </>
        )}
        
        {encryptedFile && 0 && (
          <button onClick={decryptFile}>
          Расшифровать файл
          </button>
          )}
          
          {decryptedFile && 0 && (
            <button onClick={downloadDecryptedFile()}>
            Скачать расшифрованный файл
            </button>
            )} */}
        </div>
        <form onSubmit={handleDecrypt}>
          {fileName && <Button type="submit">Добавить</Button>}
        </form>
      </div>
    </div>
  );
}

export default FileEncryptor;