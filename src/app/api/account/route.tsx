import ethers from 'ethers';
import * as process from "process";

const INFURA_ID= process.env.INFURA_ID;
const INFURA_URL= "https://mainnet.infura.io/v3/" + INFURA_ID;
//@ts-ignore
const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}