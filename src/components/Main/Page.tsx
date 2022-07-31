import Head from "next/head";
import { ReactNode } from "react";

export default function Page({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const t = `${title} | Jazbahana`;
  return (
    <article>
      {title && (
        <Head>
          <title>{t}</title>
          <meta name="og:title" content={t} />
        </Head>
      )}
      {children}
    </article>
  );
}
