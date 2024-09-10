import { NextResponse } from 'next/server';
const { exec } = require('child_process');
import { promisify } from 'util';

const directory = "F:/study/sigma/nextjs/sth/my/asset-transfer-basic/application-gateway-typescript"

const execAsync = promisify(exec);

export async function POST(request) {
  const body = await request.json();
  const { name } = body;

  const command = `node dist/assetExists.js --userid ${name}`;

  try {
    const { stdout, stderr } = await execAsync(command, { cwd: directory });

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