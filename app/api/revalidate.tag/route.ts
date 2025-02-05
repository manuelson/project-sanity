import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_REVALIDATE_SECRET) {
      return new Response(
        "Missing environment variable NEXT_PUBLIC_SANITY_REVALIDATE_SECRET",
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.NEXT_PUBLIC_SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    } else if (!body?._type) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    // If the `_type` is `post`, then all `client.fetch` calls with
    // `{next: {tags: ['post']}}` will be revalidated
    revalidateTag(body._type);

    return NextResponse.json({ body });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    return NextResponse.json(
      { message: "Error revalidating", error: message },
      { status: 500 }
    );
  }
}
