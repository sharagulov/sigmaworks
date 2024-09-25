'use client'
import YandexButton from "./YandexButton";
import GitButton from './GitButton'
import { Suspense } from "react";

const AuthBlock = () => {

  return (
    <div className='flex justify-center'>
      <div className="mt-2 w-full  text-center">
        <span className="text-black/50 text-sm ">другие способы входа</span>
        <div className="flex mt-2 gap-3 p-[20px] shadow-xl  rounded-xl">
          <Suspense>
            <GitButton />
            <YandexButton />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default AuthBlock;