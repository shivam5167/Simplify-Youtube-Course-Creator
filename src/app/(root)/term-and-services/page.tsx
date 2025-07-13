import { Metadata } from "next";
import Link from "next/link";

import ListView from "@/components/shared/list-view";
import { DotPattern } from "@/components/ui/dot-pattern";
import { termsOfServices } from "@/constants";
import { clientEnv } from "@/env/client";

export const metadata: Metadata = {
  title: "Terms of Service - Simplify",
  description:
    "Read our terms of service to understand the rules, guidelines, and policies governing your use of Simplify's YouTube course creation platform.",
  keywords:
    "terms of service, user agreement, platform rules, youtube course creation, content guidelines, online education policy, video course terms, content creator agreement, course transformation platform, educational content policy, youtube content monetization, course creation guidelines",
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
    canonical: "/term-and-services",
  },
  openGraph: {
    title: "Terms of Service - Simplify",
    description:
      "Understand the rules and policies for creating and sharing YouTube-based courses on Simplify",
    type: "website",
    siteName: "Simplify",
    images: ["/images/hero-thumbnail.png"],
  },
  twitter: {
    card: "summary",
    title: "Terms of Service - Simplify",
    description:
      "Understand the rules and policies for creating and sharing YouTube-based courses on Simplify",
    images: ["/images/hero-thumbnail.png"],
  },
};

const TermsAndService = () => {
  return (
    <div className="relative py-10">
      <DotPattern />
      <div>
        <div className="container">
          <section className="relative flex w-full flex-col items-center justify-center space-y-2 overflow-visible py-14">
            <h1 className="text-2xl font-semibold md:text-4xl">
              Terms of Service
            </h1>
            <p className="w-full text-center text-sm md:w-4/5 md:text-base">
              Welcome to Simplify! These Terms of Service (“Terms”) govern your
              use of our website, mobile application, and any related services
              (collectively, the “Service”). By accessing or using Simplify, you
              agree to be bound by these Terms. If you do not agree with any
              part of these Terms, please do not use our Service.
            </p>
          </section>
          <div className="relative space-y-8 pb-20">
            {/* <RadialGradient className="!-left-full !-top-1/2" /> */}
            {termsOfServices.map((policy, idx) => (
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

export default TermsAndService;
