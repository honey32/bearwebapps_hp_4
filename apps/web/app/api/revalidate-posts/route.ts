import crypto from "node:crypto";
import { revalidateTag } from "next/cache";

import { TAG_MICROCMS_POSTS } from "@/app/_repositories/posts/microCmsClient";

export const POST = async (request: Request) => {
  const { MICROCMS_WEBHOOK_SECRET } = process.env;
  if (!MICROCMS_WEBHOOK_SECRET) {
    return new Response("Internal Server Error", { status: 500 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", MICROCMS_WEBHOOK_SECRET)
    .update(await request.text())
    .digest("hex");
  const signature = request.headers.get("X-MICROCMS-Signature");

  if (
    !signature ||
    !crypto.timingSafeEqual(
      new Uint8Array(Buffer.from(signature)),
      new Uint8Array(Buffer.from(expectedSignature)),
    )
  ) {
    return new Response("Invalid Signature", { status: 400 });
  }

  revalidateTag(TAG_MICROCMS_POSTS);
  return new Response("Success!", { status: 200 });
};
