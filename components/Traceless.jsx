import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import {
  DialogClose,
} from "@/components/ui/dialog"
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Traceless({ cmessage, cindex, newowner }) {

  //------------------------------------//
  //SERVER ACTIONS//

  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaderOpacity, setLoaderOpacity] = useState(0);

  useEffect(() => {
    let timer;
    if (loading) {
      setLoaderOpacity(1);
      timer = setTimeout(() => {
        setLoading(false);
      }, 10000);
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
      }, 8000);
    } 
    return () => clearTimeout(timer);
  }, [loading]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = newowner;
    const response = await axios.post('https://safethrow-server.ru/api/authResponse', { name });
    setMessage(response.data.message);
    //console.log(response.data.message);
    if (JSON.stringify(response.data.message).slice(1, -3) === "nosuchuser") {
      setMessage("Такого пользователя не существует");
    }
    else {
      const cname = cmessage[cindex]?.Filename;
      try {
        
        const response = await axios.post('https://safethrow-server.ru/api/filestransition', { cname, newowner });
        setMessage(response.data.message);

        setTimeout(() => {
          window.location.reload();
        }, 100);

        //console.log(response.data.message);
      } catch (error) {
        setMessage('Произошла ошибка при отправке данных');
      }
    }
  };

  return (
    <div className='flex justify-between mt-3'>
      <div className='text-xs text-destructive content-center'>{JSON.stringify(message).slice(1, -1) === "Такого пользователя не существует" ? message : ""}</div>
      <DialogClose>
        <div className='flex flex-row relative'>
          {loading ? <div style={{ opacity: loaderOpacity, transition: 'opacity 0.3s ease-in-out' }} className='animate-spin h-full content-center transition-all absolute text-accent ml-[-40px]'><Loader2Icon /></div> : null}
          <Button onClick={handleSubmit} className='h-full w-[100px]' >Передача</Button>
        </div>
      </DialogClose>
    </div>
  );
}
export default Traceless;