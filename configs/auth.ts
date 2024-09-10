

import axios from "axios";
import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { useState } from "react";
import * as crypto from 'crypto';

export async function handleSubmit(name) {
  try {
    const response = await axios.post('http://localhost:3000/api/authResponse', { name });
    if (!response.data.message) {
      throw new Error('Неверный формат ответа: отсутствует поле message');
    }

    const data = JSON.parse(response.data.message);

    if (!(data.Userid && data.Password)) {
      throw new Error('Неверный формат ответа: отсутствуют необходимые поля');
    }

    return {
      success: true,
      jsonname: data.Userid,
      jsonpass: data.Password,
      message: response.data.message
    };
  } catch (error) {
    console.error(`Ошибка в handleSubmit: ${error.message}`);
    return {
      success: false,
      message: `Произошла ошибка при отправке данных: ${error.message}`
    };
  }
}

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        userid: { label: 'userid', type: 'userid', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.userid || !credentials.password) return null;
        const { jsonname, jsonpass, message } = await handleSubmit(credentials.userid);

        const currentUser = credentials.userid === jsonname;
        if (currentUser && crypto.createHash('sha256').update(credentials.password).digest('hex') === jsonpass) {
          const user: { id: string, email: string, name: string, role: string } = { id: "", email: "", name: jsonname, role: "" }
          return user as User;
        }
        // при таком написании обработки информации о юзере в next-auth, поле data ничего не возвращает, хотя статус authenticated. как можно исправить?
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
}