import { Metadata } from "next";
import Link from "next/link";

import ListView from "@/components/shared/list-view";
import { DotPattern } from "@/components/ui/dot-pattern";
import { privacyPolicy } from "@/constants";
import { clientEnv } from "@/env/client";

export const metadata: Metadata = {
  title: "Privacy Policy - Simplify",
  description:
    "Learn about how Simplify handles and protects your personal information. Our privacy policy outlines our data collection, usage, and protection practices.",
  keywords:
    "privacy policy, data protection, user privacy, personal information, data security",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL),
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - Simplify",
    description:
      "Learn about how Simplify handles and protects your personal information",
    type: "website",
    siteName: "Simplify",
    images: ["/images/hero-thumbnail.png"],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - Simplify",
    description:
      "Learn about how Simplify handles and protects your personal information",
    images: ["/images/hero-thumbnail.png"],
  },
};

const PrivacyPolicy = () => {
  return (
    <div className="relative py-10">
      <DotPattern />
      <div>
        <div className="container">
          <section className="relative flex w-full flex-col items-center justify-center space-y-2 overflow-visible py-14">
            <h1 className="text-2xl font-semibold md:text-4xl">
              Privacy Policy
            </h1>
            <p className="w-full text-center text-sm md:w-4/5 md:text-base">
              Welcome to Simplify. We value your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              what information we collect, how we use it, and the steps we take
              to keep it safe.
            </p>
          </section>
          <div className="relative space-y-8 pb-20">
            {privacyPolicy.map((policy, idx) => (
              <ListView
                key={idx}
                title={policy.title}
                description={policy.description}
                data={policy.data}
              />
            ))}
            <article className="mx-auto mt-10 max-w-5xl">
              <h5 className="text-2xl font-semibold">Contact us</h5>
              <p className="mt-2 font-medium">
                If you have any questions or concerns about this Privacy Policy
                or our practices regarding your information, please contact us
                at&nbsp;
                <Link
                  href={"mailto:shivam516787@gmail.com"}
                  target="_blank"
                  className="hover:underline"
                >
                  <strong>shivam516787@gmail.com</strong>
                </Link>
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
