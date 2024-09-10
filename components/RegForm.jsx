'use client';

import { useRouter } from "next/navigation";
import { useState } from 'react';

import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Button } from './ui/button';
import Image from 'next/image';
import { ArrowLeft } from "lucide-react";
import { CaretLeftIcon } from "@radix-ui/react-icons";


export default function FormComponent() {

  const router = useRouter()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post('/api/submit', { name, email, pass });
      setMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setMessage('Произошла ошибка при отправке данных');
    }
  };
  
  return (
    <div className=" w-screen">
      <div className="flex h-screen justify-center">
        <div className="content-center">
          <Card className="w-[350px]">
            <CardHeader>
              <div className="content-center mb-5 justify-center flex bg-primary text-primary-foreground transition-colors p-[10px] shadow rounded-md hover:bg-primary-hover">

                <Image
                  src="/img/safethrow.png"
                  width={150}
                  height={13.5}
                  alt="LOGO"
                />
              </div>
              <div className="text-center">
                <CardTitle>Регистрация</CardTitle>
                <CardDescription>Создайте новый аккаунт</CardDescription>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-full text-right transition-all items-center gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => [setName(e.target.value)]}
                      placeholder="Имя пользователя"
                      required
                    />
                    <Label className="text-destructive text-[10px]" htmlFor="name">{(message.includes("name")) ? "Имя занято" : ""}</Label>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="email"
                      name="email"
                      type="email" // Указываем тип поля email
                      placeholder="Почта"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Label className="text-destructive text-[10px]" htmlFor="name">{(message.includes("email")) ? "Такой адрес уже используется" : ""}</Label>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="pass"
                      name="pass"
                      type="password"
                      placeholder="Пароль"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Input id="repass" type="password" placeholder="Повторите пароль" />
                  </div>

                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <Checkbox className="" id="terms" />
                    <Label htmlFor="terms">Я соглашаюсь на всё</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="mr-[270px] mt-[3px] absolute ">
                  <button type="button" className="" onClick={() => router.push('/new')} variant="outline">
                    <CaretLeftIcon className="w-[40px] transition-colors  text-black/50 hover:text-black/80 h-[40px]"></CaretLeftIcon>
                  </button>
                </div>
                <Button type='submit'>Регистрация</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div >
  );
}