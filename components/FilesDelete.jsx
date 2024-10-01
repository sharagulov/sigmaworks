import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import {
  DialogClose,
} from "@/components/ui/dialog"

function FilesDelete({ cname, cext }) {

  //------------------------------------//
  //SERVER ACTIONS//

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('https://safethrow-server.ru/api/filesdelete', { cname });
      setMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setMessage('Произошла ошибка при отправке данных');
    }
  };

  return (
    <div className='flex justify-between'>
      <div className='content-center'>{cname.substring(0, cname.lastIndexOf("_") + 1).slice(0, -1)}.{cext}</div>
      <DialogClose>
        <Button variant="destructive" onClick={handleSubmit} className='h-full w-[100px]' >Удалить</Button>
      </DialogClose>
    </div>
  );
}
export default FilesDelete;