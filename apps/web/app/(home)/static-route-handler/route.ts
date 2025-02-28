import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    data: {
      thisJsonFile: "is genearted at build-time",
      caveat:
        "Route Handler needs 'force-static' to be defined as a dynamic export since next.js 15",
      at: new Date(),
    },
  });
};

export const dynamic = "force-static";
