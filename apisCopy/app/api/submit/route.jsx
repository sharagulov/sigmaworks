import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import crypto from 'crypto';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request) {
  const body = await request.json();
  const { name, email, pass, passerror } = body;

  // Используем path.resolve для корректного формирования пути
  const directory = path.resolve(process.cwd(), "../../../common/docker/_blockchain/asset-transfer-basic/user/application-gateway-typescript");

  const command = `node dist/userCheck.js --userid "${name}" --email "${email}" --password "${crypto.createHash('sha256').update(pass).digest('hex')}" --passerror "${passerror}"`;

  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: directory,
    });

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return NextResponse.json({ error: stderr }, { status: 500 });
    }

    return NextResponse.json({ message: stdout });

  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}