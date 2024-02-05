import { cookies } from "next/headers";

export async function GET(req: Request) {
  cookies().delete("jwt-token");

  return Response.json({ success: true }, { status: 200 });
}
