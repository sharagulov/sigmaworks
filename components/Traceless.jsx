import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import {
  DialogClose,
} from "@/components/ui/dialog"

function Traceless({ cmessage, cindex, newowner }) {

  //------------------------------------//
  //SERVER ACTIONS//

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
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
    <div className='flex justify-end mt-3'>
      <DialogClose>
        <Button onClick={handleSubmit} className='h-full w-[100px]' >Передача</Button>
      </DialogClose>
    </div>
  );
}
export default Traceless;