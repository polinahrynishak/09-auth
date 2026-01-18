import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import css from "./ProfilePage.module.css";
import { getMeServer } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "User Profile | NoteHub",
  description: "View and manage your personal information.",
  openGraph: {
    title: "User Profile | NoteHub",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};

export default async function ProfilePage() {
  const user = await getMeServer();

  const avatarUrl =
    user.avatar ||
    "https://ac.goit.global/fullstack/react/avatar-placeholder.jpg";

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={avatarUrl}
            alt={`${user.username}'s avatar`}
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>
            <strong>Username:</strong> {user.username || "Not set"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}
