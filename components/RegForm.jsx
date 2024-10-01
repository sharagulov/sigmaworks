'use client';

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from 'react';
import AuthBlock from '../components/AuthBlock'
import { toast } from "sonner"

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
import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Loader, Loader2, Loader2Icon, LoaderCircle, LoaderCircleIcon, LoaderIcon, LoaderPinwheel } from "lucide-react";


export default function FormComponent() {

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [loaderOpacity, setLoaderOpacity] = useState(0)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [repass, setRepass] = useState('');
  const [passerror, setPasserror] = useState(false);
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://147.45.157.124:22/api/submit', { name, email, pass, passerror });
      setMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setMessage('Произошла ошибка при отправке данных');
    }
  };

  const messageRef = useRef('');
  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  const handleRegistrationClick = async () => {

    setLoading(true);
    setLoaderOpacity(1);
    const timer = setTimeout(() => {
      setLoaderOpacity(0);
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Время анимации исчезновения
    }, 30000);

    await new Promise(resolve => {
      const checkMessage = () => {
        if ((JSON.stringify(messageRef.current)).slice(1, -3) === "success") {
          resolve();
        } else {
          setTimeout(checkMessage, 100);
        }
      };
      checkMessage();
      return () => clearTimeout(timer);
    });

    if ((JSON.stringify(messageRef.current)).slice(1, -3) === "success") {
      router.push('/registration/success');
    }
  };

  return (
    <div className="w-screen h-screen content-center">
      <div className="flex justify-center">
        <div className="content-center">
          <Card className="w-[350px]">
            <CardHeader>
              <div className="text-center p-[10px] shadow rounded-xl">
                <CardTitle>Регистрация</CardTitle>
                <CardDescription className="mt-1">Создайте новый аккаунт</CardDescription>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-full text-right transition-all items-center gap-3">
                  <div className="flex flex-col space-y-1">
                    <Input
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => [setName(e.target.value)]}
                      placeholder="Имя пользователя"
                      required
                    />
                    <Label className="text-destructive text-[10px]" htmlFor="name">{(message.includes("name")) ? "Имя занято" : ""}</Label>
                    <Label className="text-destructive text-[10px]" htmlFor="name">{((name.length > 3 && name.length <= 20) || name.length == 0) ? "" : "Длина имени -- от 4 до 20 символов"}</Label>
                  </div>

                  <div className="flex flex-col space-y-1">
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

                  <div className="flex flex-col space-y-1">
                    <Input
                      id="pass"
                      name="pass"
                      type="password"
                      placeholder="Пароль"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      required
                    />
                    <Label className="text-destructive text-[10px]" htmlFor="repass">{((pass.length >= 6 && pass.length <= 25) || pass.length == 0) ? "" : "Длина пароля -- от 6 до 25 символов"}</Label>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <Input
                      id="repass"
                      name="repass"
                      type="password"
                      value={repass}
                      onChange={(e) => setRepass(e.target.value)}
                      placeholder="Повторите пароль"
                      required />
                    <Label className="text-destructive text-[10px]" htmlFor="repass">{(passerror) ? "Пароли не совпадают" : ""}</Label>
                  </div>

                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <Checkbox className="" id="terms" />
                    <Label htmlFor="terms">Я соглашаюсь на всё</Label>
                  </div>

                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="mr-[270px] mt-[3px] absolute ">
                  <button type="button" className="" onClick={() => router.back()} variant="outline">
                    <CaretLeftIcon className="w-[40px] transition-colors  text-black/50 hover:text-black/80 h-[40px]"></CaretLeftIcon>
                  </button>
                </div>
                <Button onClick={() => { handleRegistrationClick(); setPasserror(pass !== repass) }} type='submit'>Регистрация</Button>
                {loading && <div style={{ opacity: loaderOpacity }} className="animate-spin transition-all duration-[2s] absolute text-accent ml-[170px]"><Loader2Icon /></div>}
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[350px] ">
          <AuthBlock />
        </div>
      </div>
      <div className='mt-7 flex justify-center'>
        <span className='text-sm font-medium'>Уже есть аккаунт?
          <Link className="text-accent hover:text-accent-hover" href="/api/auth/signin"> Войти</Link>
        </span>

      </div>
    </div >
  );
}