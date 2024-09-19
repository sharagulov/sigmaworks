import { NextResponse } from 'next/server';
const { exec } = require('child_process');
import { promisify } from 'util';


const execAsync = promisify(exec);

export async function POST(request) {
  const body = await request.json();
  const { filename, extension, hash, owner } = body;

  const directory = "_blockchain/asset-transfer-basic/files/application-gateway-typescript"
  const command = `node dist/createAsset.js --owner ${owner} --filename ${filename} --extension ${extension} --hash ${hash}`;

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