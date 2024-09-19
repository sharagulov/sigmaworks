
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { authConfig } from '@/configs/auth'
import { DialogClose } from './ui/dialog';

const FileEncryptor = () => {
  const [file, setFile] = useState(null);

  const [encryptedFile, setEncryptedFile] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState(null);
  const [encryptedBase64, setEncryptedBase64] = useState(null);

  // Генерация ключей при монтировании компонента
  useEffect(() => {
    const generateKeyPair = async () => {
      try {
        const keyPair = await window.crypto.subtle.generateKey(
          {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
          },
          true,
          ["encrypt", "decrypt"]
        );
        setPublicKey(keyPair.publicKey);
        setPrivateKey(keyPair.privateKey);
        console.log("Ключи успешно сгенерированы.");
      } catch (error) {
        console.error('Ошибка генерации ключей:', error);
      }
    };

    generateKeyPair();
  }, []);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = async () => {
      const fileContent = reader.result; // ArrayBuffer
      await encryptFile(fileContent);
    };
    reader.readAsArrayBuffer(file);
  };

  // Генерация симметричного ключа AES
  const generateSymmetricKey = async () => {
    try {
      const symmetricKey = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
      return symmetricKey;
    } catch (error) {
      console.error('Ошибка генерации симметричного ключа:', error);
    }
  };

  // Шифрование симметричного ключа с помощью RSA
  const encryptSymmetricKey = async (symmetricKey) => {
    try {
      const symmetricKeyData = await window.crypto.subtle.exportKey('raw', symmetricKey);
      const encryptedKey = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        publicKey,
        symmetricKeyData
      );
      setEncryptedSymmetricKey(encryptedKey);
      return encryptedKey;
    } catch (error) {
      console.error('Ошибка шифрования симметричного ключа:', error);
    }
  };

  // Шифрование файла с использованием AES
  const encryptFile = async (fileContent) => {
    if (!publicKey) {
      console.error('Публичный ключ не доступен.');
      return;
    }

    try {
      // Генерация симметричного ключа
      const symmetricKey = await generateSymmetricKey();
      console.log('Симметричный ключ сгенерирован.');

      // Шифрование файла с симметричным ключом (AES)
      const encryptedFile = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: new Uint8Array(12), // случайный вектор инициализации (IV)
        },
        symmetricKey,
        fileContent
      );

      setEncryptedFile(encryptedFile);

      // Шифрование симметричного ключа с RSA
      const encryptedSymmetricKey = await encryptSymmetricKey(symmetricKey);
      console.log('Симметричный ключ зашифрован.');

      const base64String = arrayBufferToBase64(encryptedFile);
      setEncryptedBase64(base64String);
    } catch (error) {
      console.error('Ошибка шифрования:', error);
    }
  };

  const decryptFile = async () => {
    if (!encryptedFile || !privateKey || !encryptedSymmetricKey) {
      console.error('Приватный ключ, зашифрованные данные или зашифрованный симметричный ключ не найдены.');
      return;
    }

    try {
      // Расшифровка симметричного ключа
      const symmetricKeyData = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP",
        },
        privateKey,
        encryptedSymmetricKey
      );

      const symmetricKey = await window.crypto.subtle.importKey(
        'raw',
        symmetricKeyData,
        {
          name: 'AES-GCM',
        },
        true,
        ['decrypt']
      );

      console.log('Симметричный ключ расшифрован.');

      // Расшифровка файла
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: new Uint8Array(12), // тот же IV, который использовался при шифровании
        },
        symmetricKey,
        encryptedFile
      );
      setDecryptedFile(decrypted);
      console.log('Файл расшифрован.');
    } catch (error) {
      console.error('Ошибка расшифровки:', error);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const downloadDecryptedFile = (name, extension) => {
    const blob = new Blob([decryptedFile], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'decrypted_file.txt';
    link.click();
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

      const filename = (file.name).split('.')[0];
      const extension = (file.name).split('.')[1];
      const hash = encryptedBase64;
      console.log(filename, extension, hash, owner);
      const response = await axios.post('/api/addfiles', { filename, extension, hash, owner });
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
          <input id="file-upload" className='maga' type="file" onChange={(e) => onDrop(e.target.files)} />
          <label htmlFor="file-upload" className='text-sm lbl bg-accent-light p-2 rounded-2xl shadow hover:shadow-lg transition-all'>Загрузить файл</label>
          {file && <span className='ml-3 text-sm'>{file.name}</span>}

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
            {file && <Button type="submit">Добавить</Button>}
          </DialogClose>
        </form>
      </div>
    </div>
  );
};

export default FileEncryptor;
