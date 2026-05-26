import { getUserById } from '../../../lib/users';
import { getSubmissionsByUser } from '../../../lib/submissions';
import UserProfile from '../../../components/UserProfile';
import { notFound } from 'next/navigation';

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getUserById(id);

  if (!user) {
    notFound();
  }

  const submissions = getSubmissionsByUser(id).filter(s => s.status === 'approved');

  return (
    <div className="animate-fade-in">
      <UserProfile profileUser={user} submissions={submissions} />
    </div>
  );
}
