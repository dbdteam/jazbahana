import Head from "next/head";
import { ReactNode } from "react";

export default function Page({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className: string;
  title: string;
}) {
  const t = `${title} | Jazbahana`;
  return (
    <article className={className}>
      {title && (
        <Head>
          <title>{t}</title>
          <meta name="twitter:title" content={t} />
          <meta name="og:title" content={t} />
        </Head>
      )}
      {children}
    </article>
  );
}
