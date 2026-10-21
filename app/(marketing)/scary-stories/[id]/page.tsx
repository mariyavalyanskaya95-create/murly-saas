import { redirect } from 'next/navigation';

export default function ScaryStoryRedirect({ params }: { params: { id: string } }) { redirect(`/stories/${params.id}`); }
