"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { authConfig } from '@/configs/auth'
import axios from 'axios';
import Image from 'next/image';

import ContextCards from '@/components/ContextCards'

import { Input } from './ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

import AddDialog from '@/components/AddDialog'
import { Loader2Icon } from 'lucide-react';

export default function FilesBar() {

  const session = useSession(authConfig);

  const [owner, setOwner] = useState('');
  const [files, setFiles] = useState(1);
  const [searchPrompt, setSearchPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaderOpacity, setLoaderOpacity] = useState(0);

  useEffect(() => {
    let timer;
    if (loading) {
      setLoaderOpacity(1);
      timer = setTimeout(() => {
        setLoading(false);
      }, 6000);
    } else {
      setLoaderOpacity(0);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    let timer;
    if (loading) {
      setLoaderOpacity(1);
      timer = setTimeout(() => {
        setLoaderOpacity(0);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (session?.data?.user.name) {
      setOwner(session?.data?.user.name);
    }
  }, [session]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://safethrow-server.ru/api/loadfiles', { owner });
        setMessage(response.data.message);
        //console.log(response.data.message);
      } catch (error) {
        setMessage('Произошла ошибка при отправке данных');
        console.error('Ошибка:', error);
      }
    };

    // Вызываем функцию сразу при монтировании компонента
    fetchData();

    // Устанавливаем интервал для вызова функции каждую секунду
    const intervalId = setInterval(fetchData, 5000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [owner]);

  const messageRef = useRef('');
  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  process.env.FILENAME = message;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 500);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);

  const filedivs = Array.from({ length: message.length }, (_, index) => (
    ((message[index]?.Filename).substring(0, (message[index]?.Filename).lastIndexOf("_")).includes(searchPrompt)) && (<div key={index} className='relative'>
      <div className='opacity-70 hover:opacity-100 transition-all '>
        <div className='anima '>
          <ContextCards cmessage={message} cindex={index} cname={message[index]?.Filename} cext={message[index]?.Extension} />
          <div className='shadow-lg hover:shadow-xl transition-all duration-500 rounded-xl p-10 z-2 px-8 bg-accent-light'>
            <div className='flex justify-center h-full '>
              <div className='content-center  opacity-60'>
                <Image
                  src="/img/file.png"
                  width={50}
                  height={50}
                  alt="LOGO"
                />
              </div>
            </div>
          </div>
          <div className='text-center text-xs md:text-sm p-1 '>
            <span>{(message[index]?.Filename).length <= 17 ? ((message[index]?.Filename).substring(0, (message[index]?.Filename).lastIndexOf("_"))) : ((message[index]?.Filename).substring(0, (message[index]?.Filename).lastIndexOf("_")).substr(0, 3))}{(message[index]?.Filename).length <= 17 ? "" : `...${((message[index]?.Filename).substring(0, (message[index]?.Filename).lastIndexOf("_")).substr(-3))}`}</span>
            <span>.</span>
            <span className='opacity-50'>{(message[index]?.Extension)}</span>
          </div>
        </div>
      </div>
    </div>
    )));

  return (
    <div className="transition-all flex h-screen w-screen md:p-10 pt-[30px]  z-[-1]">
      <div className="w-full">
        <div className=" p-5 md:p-[50px] rounded-[30px] min-h-[600px] backdrop-blur-lg shadow-xl">
          <div className='flex justify-between text-center mb-5'>
            <div className='flex gap-5'>
              <div className='flex gap-2'>
                <div className='content-center'>
                  <MagnifyingGlassIcon />
                </div>
                <Input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Поиск"
                  value={searchPrompt}
                  onInput={(e) => [setSearchPrompt(e.target.value)]}
                />
              </div>
              <AddDialog />
              {loading ? <div style={{ opacity: loaderOpacity, transition: 'opacity 0.3s ease-in-out' }} className='animate-spin h-full content-center transition-all  text-accent'><Loader2Icon /></div> : null}
            </div>
            <div className='content-center hidden md:block'>
              <span className=''>Всего файлов: {message.length}</span>
            </div>
          </div>
          <div className='grid gap-5 grid-cols-2 lg:grid-cols-8 lg:grid-rows-3 sm:grid-cols-3 md:grid-cols-5'>
            {filedivs}
          </div>
        </div>
      </div>
    </div>
  )
}