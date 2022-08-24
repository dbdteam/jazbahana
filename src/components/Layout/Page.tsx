import Head from "next/head";

export default function Page({
  children,
  className = "",
  title,
}: {
  children: React.ReactNode;
  className?: string;
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
