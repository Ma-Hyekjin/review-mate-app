import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/quick-pick');
  return null;
}