'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Header from '../components/Header'
import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ChevronDown } from "lucide-react";


export default function New() {

  return (
    <div className="" >
      <div className="w-screen dark:text-white dark:bg-background h-screen" >
        <Header />
        <div className="dark">
          <div className="absolute bg-background h-screen w-screen"></div>
          <div className="flex select-none justify-center dark:text-white text-center">
            <div className="mt-[45vh] lg:text-5xl md:text-3xl landing sm:text-xl flex flex-row justify-between w-fit gap-3 mx-[100px]">
              <span className="biglanding">Safethrow</span>
              <span className="content-end lg:text-lg md:text-base sm:text-sm landing2">инновационный облачный сервис</span>
            </div>
          </div>

          <div className="flex landing3 select-none dark:text-white justify-center text-center">
            <div className="mt-[40vh] text-xs">
              Давайте знакомиться!
            </div>
          </div>

          <div className="flex mt-[1vh] select-none  dark:text-white animate-bounce justify-center text-center">
            <div className=" lg:text-lg md:text-base sm:text-sm w-fit">
              <ArrowDownIcon />
            </div>
          </div>
        </div>

        <div className="flex mt-[20vh] animalong flex-col gap-[200px] w-full">

          <div className="mx-[100px] relative h-[400px] inner-border-4 inner-border-black  rounded-xl bg-indigo-500/10 duration-1000 transition-all">
            {/* <div className="absolute"></div> */}
            <div className="flex justify-center content-center">
              <div className="absolute h-[400px] transition-all hover:bg-indigo-500/10  duration-1000 bg-background w-[60%] md:w-[80%] lg:w-[90%] sm:w-[70%]"></div>
            </div>
            <div className="flex relative justify-center content-center">
              <div className="absolute w-full bg-background duration-1000 transition-all hover:bg-indigo-500/10  mt-[30px] h-[340px]"></div>
            </div>
            <div className="content-center h-full">
              <div className="flex justify-center text-center">
                <div className=" lg:text-5xl md:text-3xl sm:text-xl flex flex-col w-full gap-4">
                  <span className="biglanding z-10">Приватность</span>
                  <div className="flex justify-center">
                    <span className="content-center z-10 w-[50%] text-center lg:text-lg md:text-base sm:text-sm">в сервис Safethrow интегрирована система хранения данных с помощью блокчейн-технологий, обеспечивающая безопасность ваших файлов. </span>
                  </div>
                  <div className="z-10 mt-2 select-none flex justify-center">
                    <div className=" w-[10%] flex gap-5 h-[35px] flex-row">
                      <div className="w-full flex justify-center rounded-lg text-black/80 hover:bg-indigo-400/20 transition-all bg-indigo-500/10"><div className="content-center text-sm">Hyperledger</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="mx-[100px] relative h-[400px] inner-border-4 inner-border-black rounded-xl bg-blue-500/10 duration-1000 transition-all">
            {/* <div className="absolute"></div> */}
            <div className="flex justify-center content-center">
              <div className="absolute h-[400px] transition-all hover:bg-blue-500/10 duration-1000 bg-background w-[60%] md:w-[80%] lg:w-[90%] sm:w-[70%]"></div>
            </div>
            <div className="flex relative justify-center content-center">
              <div className="absolute w-full bg-background duration-1000 transition-all hover:bg-blue-500/10 mt-[30px] h-[340px]"></div>
            </div>
            <div className="content-center h-full">
              <div className="flex justify-center text-center">
                <div className=" lg:text-5xl md:text-3xl sm:text-xl flex flex-col w-full gap-4">
                  <span className="biglanding z-10">Современность</span>
                  <div className="flex justify-center">
                    <span className="content-center z-10 w-[50%] text-center lg:text-lg md:text-base sm:text-sm">технологии, используемые при разработке сервиса, отвечают современным стандартам шифрования и безопасноти. </span>
                  </div>
                  <div className="z-10 mt-2 flex select-none justify-center">
                    <div className=" w-[20%] flex gap-5 h-[35px] flex-row">
                      <div className="w-full flex justify-center rounded-lg text-black/80 hover:bg-blue-400/20 transition-all bg-blue-500/10"><div className="content-center text-sm">AES</div></div>
                      <div className="w-full flex justify-center rounded-lg text-black/80 hover:bg-blue-400/20 transition-all bg-blue-500/10"><div className="content-center text-sm">env.local</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="mx-[100px] relative h-[400px] inner-border-4 inner-border-black  rounded-xl bg-green-500/10 duration-1000 transition-all">
            {/* <div className="absolute"></div> */}
            <div className="flex justify-center content-center">
              <div className="absolute h-[400px] transition-all hover:bg-green-500/10 duration-1000 bg-background w-[60%] md:w-[80%] lg:w-[90%] sm:w-[70%]"></div>
            </div>
            <div className="flex relative justify-center content-center">
              <div className="absolute w-full bg-background duration-1000 transition-all hover:bg-green-500/10 mt-[30px] h-[340px]"></div>
            </div>
            <div className="content-center h-full">
              <div className="flex justify-center text-center">
                <div className=" lg:text-5xl md:text-3xl sm:text-xl flex flex-col w-full gap-4">
                  <span className="biglanding z-10">Энтузиазм*</span>
                  <div className="flex justify-center">
                    <span className="content-center z-10 w-[50%] text-center lg:text-lg md:text-base sm:text-sm">мы, команда разработки, внимательно относимся к своему сервису, следим за его работоспособностью и стараемся сделать Safethrow лучше. </span>
                  </div>
                  <Link className="text-accent lg:text-base md:text-sm sm:text-xs z-10 hover:text-accent-hover" href="/about"> Узнать о нас побольше</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-[100px] text-black/50 w-[40%] text-xs">
            Safethrow все еще находится в стадии разработки, и мы не можем взять на себя ответственность за полную конфеденциальность. Сервис создан студенческой командой, поэтому не делитесь с ним сверхсекретными данными, не вводите пароли и личную информацию.
          </div>
          <div className="mx-[100px] text-black/50 w-[40%] text-xs">

          </div>

        </div>
      </div>
    </div>
  );
}
