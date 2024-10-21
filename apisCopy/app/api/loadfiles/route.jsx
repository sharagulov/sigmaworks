import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request) {
  const body = await request.json();
  const { owner } = body;

  const directory = path.resolve(process.cwd(), "../../../common/docker/_blockchain/asset-transfer-basic/files/application-gateway-typescript");
  const command = `node dist/ownerFiles.js --owner ${owner}`;

  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: directory,
    });

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return NextResponse.json({ error: stderr }, { status: 500 });
    }
    
    return NextResponse.json({ message: JSON.parse(stdout) });

  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}