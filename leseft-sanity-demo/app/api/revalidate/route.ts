import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export const runtime = 'nodejs';

type WebhookPayload = {
  _type?: string;
  _id?: string;
};

const publicPaths = [
  '/',
  '/about',
  '/commodities',
  '/equipment',
  '/projects',
  '/partners',
  '/contact',
] as const;

const revalidationMap: Record<string, { tags: string[]; paths: string[] }> = {
  homepage: { tags: ['homepage'], paths: ['/'] },
  about: { tags: ['about'], paths: ['/about'] },
  commodity: { tags: ['commodities'], paths: ['/', '/commodities'] },
  equipment: { tags: ['equipment'], paths: ['/', '/equipment'] },
  project: { tags: ['projects'], paths: ['/', '/projects'] },
  partners: { tags: ['partners'], paths: ['/partners'] },
  contactInfo: { tags: ['contact'], paths: [...publicPaths] },
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();
  const expectedProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const expectedDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

  if (!secret || !expectedProjectId || !expectedDataset) {
    return NextResponse.json({ message: 'Revalidation is not configured on this deployment.' }, { status: 503 });
  }

  const projectId = request.headers.get('sanity-project-id');
  const dataset = request.headers.get('sanity-dataset');

  if (projectId !== expectedProjectId || dataset !== expectedDataset) {
    return NextResponse.json({ message: 'Unauthorized source.' }, { status: 403 });
  }

  const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret, true);

  if (!isValidSignature) {
    return NextResponse.json({ message: 'Invalid signature.' }, { status: 401 });
  }

  const documentType = body?._type;

  if (!documentType || !revalidationMap[documentType]) {
    return NextResponse.json({ message: 'Unsupported document type.' }, { status: 400 });
  }

  const { tags, paths } = revalidationMap[documentType];

  for (const tag of tags) {
    revalidateTag(tag);
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    type: documentType,
    tags,
    paths,
    at: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to trigger revalidation.' }, { status: 405 });
}
