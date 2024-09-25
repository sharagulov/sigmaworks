import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import {
  DialogClose,
} from "@/components/ui/dialog"
import { Loader2Icon } from 'lucide-react';

function Traceless({ cmessage, cindex, newowner }) {

  //------------------------------------//
  //SERVER ACTIONS//

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const [loaderOpacity, setLoaderOpacity] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = newowner;
    const response = await axios.post('/api/authResponse', { name });
    setMessage(response.data.message);
    console.log(response.data.message);
    if (JSON.stringify(response.data.message).slice(1, -3) === "nosuchuser") {
      setMessage("Такого пользователя не существует");
    }
    else {
      const cname = cmessage[cindex]?.Filename;
      try {
        const response = await axios.post('/api/filestransition', { cname, newowner });
        setMessage(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        setMessage('Произошла ошибка при отправке данных');
      }
    }
  };

  return (
    <div className='flex justify-between mt-3'>
      <div className='text-xs text-destructive content-center'>{JSON.stringify(message).slice(1, -1) === "Такого пользователя не существует" ? message : ""}</div>
      <DialogClose>
        <Button onClick={handleSubmit} className='h-full w-[100px]' >Передача</Button>
      </DialogClose>
    </div>
  );
}
export default Traceless;