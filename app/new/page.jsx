'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Header from '../../components/Header'


export default function New() {
  const router = useRouter()

  return (
    <div className="w-screen bgnd h-screen" >
      <div className="absolute w-full h-full mwbackground"></div>
      <Header/>
      <div className="flex font-black text-black/80 justify-center text-center">
        <div className="mt-[15vh]">
          <div className="flex justify-center opacity-80 z-10 bg-white/10 p-[20px] backdrop-blur-lg rounded-xl shadow-xl">
            <Image
              src="/img/safethrowb.png"
              width={1000}
              height={90}
              alt="LOGO"
            />
          </div>
          <p className=" lg:text-5xl md:text-3xl sm:text-xl mt-6 leading-tight font-bold">инновационный облачный сервис</p>
        </div>
      </div>
      <div className="flex font-black justify-center ">
        <div className="w-[90%] min-h-[2000px] mt-[5%] mwsh rounded-[70px] z-10 p-[70px] text-2xl bg-background/80">
          <div className="flex flex-col items-center mt-[200px]">
            <div className="flex text-center flex-col max-w-[50%] gap-10 ">
              <p className="lg:text-5xl md:text-3xl sm:text-xl ">Кому подойдет эта платформа?</p>
              <p className="lg:text-2xl md:text-lg text-sm">SAFETHROW(c) создан для удобного и гибкого хранения файлов в обособленной системе. Мы предлагаем высшую степень защиты документов, обеспеченную сущностью блокчейна.<br></br>Поэтому, если вы нуждаетесь в безопасном содержании своих файлов — сервис создан для вас.</p>
            </div>
            <div className="absolute left-[12vw] top-[350px] z-[-1]">
              <Image
                src="/img/air.png"
                width={366}
                height={811}
                alt="LOGO"
              />
            </div>
            <div className="absolute left-[68vw] xxx top-[670px] z-[-1]">
              <Image
                src="/img/air.png"
                width={366}
                height={811}
                alt="LOGO"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
