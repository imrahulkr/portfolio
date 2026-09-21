import Link from "next/link";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <main id="main-content">
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-24 text-center">
          <p className="font-heading text-sm font-medium text-accent mb-3">404</p>
          <h1 className="font-heading font-semibold text-2xl text-text mb-3">Page not found</h1>
          <p className="text-base text-text-soft max-w-[50ch] mx-auto mb-8">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 text-sm font-medium rounded bg-text text-bg hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Back to home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
