import { auth } from '@clerk/nextjs/server';
import { isOwnerTeacher } from '@/lib/ai-check';
import ShopAdmin from '@/components/shop/ShopAdmin';

export const dynamic = 'force-dynamic';

export default async function TeacherShopPage() {
  const { userId } = await auth();
  if (!userId || !(await isOwnerTeacher(userId))) return <p style={{ padding: 24 }}>Немає доступу.</p>;
  return <ShopAdmin mailOk={Boolean(process.env.RESEND_API_KEY)} />;
}
