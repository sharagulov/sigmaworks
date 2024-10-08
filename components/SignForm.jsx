'use client';
import { useRouter } from "next/navigation";
import AuthBlock from '../components/AuthBlock'

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
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";


export default function FormComponent() {

  const [loading, setLoading] = useState(false)
  const [loaderOpacity, setLoaderOpacity] = useState(0)
  const [error, setError] = useState('');

  const router = useRouter()

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 10000);
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
    const formData = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      userid: formData.get('name'),
      password: formData.get('pass'),
      redirect: false,
    });

    if (res && !res.error) {
      router.push('/profile')
    }
    else {
      setError("Неверный логин или пароль")
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
                <div className="grid w-full transition-all text-center items-center gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="name"
                      name="name"
                      placeholder="Имя пользователя"
                      required
                    />
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

                  <div>
                    <Label className="text-destructive text-[10px]">{error}</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="mr-[270px] mt-[3px] absolute ">
                  <button type="button" className="" onClick={() => router.back()} variant="outline">
                    <CaretLeftIcon className="w-[40px] transition-colors  text-black/50 hover:text-black/80 h-[40px]"></CaretLeftIcon>
                  </button>
                </div>
                <Button onClick={() => setLoading(true)} type='submit'>Войти</Button>
                {loading && <div style={{ opacity: loaderOpacity, transition: 'opacity 0.3s ease-in-out' }} className="animate-spin transition-all duration-[2s] absolute text-accent ml-[120px]"><Loader2Icon /></div>}
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
    </div >
  );
}