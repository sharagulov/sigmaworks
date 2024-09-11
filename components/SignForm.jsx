'use client';

import { useRouter } from "next/navigation";
import { useState } from 'react';

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
import { signIn } from "next-auth/react";


export default function FormComponent() {

  const router = useRouter()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      userid:formData.get('name'),
      password:formData.get('pass'),
      redirect: false,
    });

    if(res && !res.error) {
      router.push('/profile')
    }
    else {
      console.log(res)
    }
  };

  return (
    <div className="w-screen h-screen content-center">
      <div className="flex justify-center">
        <div className="content-center">
          <Card className="w-[350px]">
            <CardHeader>
              <div className="text-center p-[10px] shadow rounded-xl">
                <CardTitle>Авторизация</CardTitle>
                <CardDescription className="mt-1">Введите данные аккаунта</CardDescription>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-full text-right transition-all items-center gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="name"
                      name="name"
                      placeholder="Имя пользователя"
                      required
                    />
                    <Label className="text-destructive text-[10px]" htmlFor="name">{(message.includes("name")) ? "Имя занято" : ""}</Label>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="pass"
                      name="pass"
                      type="password"
                      placeholder="Пароль"
                      required
                    />
                  </div>

                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="mr-[270px] mt-[3px] absolute ">
                  <button type="button" className="" onClick={() => router.push('/new')} variant="outline">
                    <CaretLeftIcon className="w-[40px] transition-colors  text-black/50 hover:text-black/80 h-[40px]"></CaretLeftIcon>
                  </button>
                </div>
                <Button type='submit'>Войти</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div >
  );
}