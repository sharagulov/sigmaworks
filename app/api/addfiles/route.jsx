import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  const body = await request.json();
  const { filename, extension, owner, hash } = body;

  const tempFilePath = path.join('F:/study/sigma/nextjs/sth/safethrow/temp', `${filename}_hash.txt`);
  await fs.writeFile(tempFilePath, hash);

  const directory = "../_blockchain/asset-transfer-basic/files/application-gateway-typescript";
  const command = 'node';
  const args = [
    'dist/createAsset.js',
    '--owner', owner,
    '--filename', filename,
    '--extension', extension,
    '--hashfile', tempFilePath
  ];

  return new Promise((resolve) => {
    const process = spawn(command, args, { cwd: directory });

    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    process.on('close', async (code) => {
      await fs.unlink(tempFilePath);

      if (code !== 0) {
        console.error(`stderr: ${stderr}`);
        resolve(NextResponse.json({ error: stderr }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ message: stdout }));
      }
    });

    process.on('error', (error) => {
      console.error(`Ошибка: ${error.message}`);
      resolve(NextResponse.json({ error: error.message }, { status: 500 }));
    });
  });
}