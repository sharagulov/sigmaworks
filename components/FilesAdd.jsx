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
      const filename = fileName.substring(0, fileName.lastIndexOf('.'));
      const extension = fileName.substr(-(fileName.length - (fileName.lastIndexOf('.'))) + 1);
      const hash = encryptedData;
      //console.log(filename, extension);
      const response = await axios.post('https://safethrow-server.ru/api/addfiles', { filename, extension, owner, hash });
      setMessage(response.data.message);
      //console.log(response.data.message);
    } catch (error) {
      setMessage('Произошла ошибка при отправке данных');
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between'>
        <div className="file-encryptor-container content-center text-center">
          <input id="file-upload" accept='.docx, .doc, .pdf, .txt' className='maga' type="file" onChange={handleFileUpload} />
          <div className='flex flex-row'>
            <Button className="w-0 px-0"></Button>
            <label htmlFor="file-upload" className='text-xs content-center md:text-sm lbl bg-accent-light p-2 rounded-2xl shadow hover:shadow-lg transition-all'>Загрузить файл</label>
            {fileName && <span className="ml-3 content-center text-xs md:text-sm">{fileName.substring(0, fileName.lastIndexOf('.')).substr(0, 2)}...{fileName.substring(0, fileName.lastIndexOf('.')).substr(-2)}.{fileName.split('.')[1]}</span>}
          </div>

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
        <form onSubmit={handleSubmit}>
          <DialogClose>
            {fileName && <Button>Добавить</Button>}
          </DialogClose>
        </form>
      </div>
    </div>
  );
}

export default FileEncryptor;