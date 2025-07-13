import { BookMarkedIcon, HomeIcon, LucideLayoutDashboard } from "lucide-react";

export const profileMenuLinks = [
  {
    href: "/",
    icon: HomeIcon,
    children: "Home",
  },
  {
    href: "/dashboard",
    icon: LucideLayoutDashboard,
    children: "Dashboard",
  },
  {
    children: "Courses",
    href: "/dashboard/courses",
    icon: BookMarkedIcon,
  },
  // {
  //   href: "/dashboard/profile",
  //   icon: UserCheck2Icon,
  //   children: "Profile",
  // },
  // {
  //   href: "/dashboard/settings",
  //   icon: SettingsIcon,
  //   children: "Settings",
  // },
];

type TRefundPolicy = {
  title: string;
  description?: string;
  data?: Array<{
    id: string;
    bold?: string;
    normal?: string;
    points?: string[];
  }>;
};

export const termsOfServices: TRefundPolicy[] = [
  {
    title: "Acceptance of Terms",
    data: [
      {
        id: "1",
        bold: "Agreement",
        normal:
          "By using Simplify, you confirm that you have read, understood, and agree to these Terms and our Privacy Policy.",
      },
      {
        id: "2",
        bold: "Modifications",
        normal:
          "We reserve the right to update or modify these Terms at any time. Your continued use of the Service after such changes constitutes your acceptance of the updated Terms.",
      },
    ],
  },
  {
    title: "Eligibility",
    data: [
      {
        id: "1",
        bold: "Minimum Age",
        normal:
          "You must be at least 18 years old to use Simpilify. If you are under 18, please obtain permission from a parent or guardian.",
      },
      {
        id: "2",
        bold: "Legal Capacity",
        normal:
          "You must have the legal capacity to enter into a contract to use this Service.",
      },
    ],
  },
  {
    title: "Use of the Service",
    data: [
      {
        id: "1",
        bold: "Account Registration",
        normal:
          "In order to access certain features, you may be required to register for an account. You agree to provide accurate and complete information and to update this information as necessary.",
      },
      {
        id: "2",
        bold: "User Responsibilities",
        normal:
          "You are responsible for all activities that occur under your account. Keep your account password secure and notify us immediately if you suspect any unauthorized use.",
      },
      {
        id: "3",
        bold: "Acceptable Use",
        normal: "You agree not to",
        points: [
          "Use the Service for any unlawful purpose.",
          "Upload, share, or distribute any content that is harmful, offensive, or infringing on any rights.",
          "Attempt to disrupt or interfere with the operation of the Service.",
        ],
      },
    ],
  },
  {
    title: "User Content",
    data: [
      {
        id: "1",
        bold: "Ownership",
        normal:
          "You retain ownership of any videos, playlists, course structures, or other content ('User Content') that you create or upload.",
      },
      {
        id: "2",
        bold: "License",
        normal:
          "By uploading User Content, you grant Simplify a worldwide, non-exclusive, royalty-free license to use, display, reproduce, and distribute your content for the purpose of providing and promoting the Service.",
      },
      {
        id: "3",
        bold: "Responsibility",
        normal:
          "You are solely responsible for the content you post and agree that Simplify is not responsible for any User Content.",
      },
    ],
  },
  {
    title: "Intellectual Property",
    data: [
      {
        id: "1",
        bold: "Our Content",
        normal:
          "All content provided by Simplify, including design, graphics, text, and software, is the intellectual property of Simplify or its licensors. You may not use any of our content without our prior written permission.",
      },
      {
        id: "2",
        bold: "User Content",
        normal:
          "While you retain ownership of your User Content, you grant us the rights to display and share that content on the Service.",
      },
    ],
  },
  {
    title: "Payment and Pricing",
    data: [
      {
        id: "1",
        bold: "Free and Paid Features",
        normal:
          "Some parts of the Service may be available for free while others require payment. All pricing details will be clearly stated on our website.",
      },
      {
        id: "2",
        bold: "Billing",
        normal:
          "By subscribing to any paid services, you agree to the payment terms, including recurring billing, if applicable.",
      },
      {
        id: "3",
        bold: "Refunds",
        normal:
          "Refund policies, if available, are described separately on our Pricing page.",
      },
    ],
  },
  {
    title: "Disclaimers and Limitation of Liability",
    data: [
      {
        id: "1",
        bold: "'As Is' Basis",
        normal:
          "The Service is provided 'as is' without any warranties, express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or secure.",
      },
      {
        id: "2",
        bold: "Limitation of Liability",
        normal:
          "To the maximum extent permitted by law, Simplify will not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.",
      },
      {
        id: "3",
        bold: "No Endorsements",
        normal:
          "Any references to third-party products or services do not imply endorsement by Simplify.",
      },
    ],
  },
  {
    title: "Indemnification",
    description:
      "You agree to indemnify, defend, and hold harmless Simplify, its affiliates, and its employees from any claims, losses, liabilities, damages, or expenses (including legal fees) arising out of your use of the Service, your violation of these Terms, or your infringement of any third-party rights.",
  },
  {
    title: "Termination",
    data: [
      {
        id: "1",
        bold: "Right to Terminate",
        normal:
          "We reserve the right to suspend or terminate your account at any time if you breach these Terms or if we decide to discontinue the Service.",
      },
      {
        id: "2",
        bold: "Effect of Termination",
        normal:
          "Upon termination, all rights granted to you will immediately cease, and you must stop using the Service.",
      },
    ],
  },
  {
    title: "Governing Law",
    description:
      "These Terms are governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in India.",
  },
];

export const privacyPolicy: TRefundPolicy[] = [
  {
    title: "Introduction",
    description:
      // eslint-disable-next-line quotes
      'Simplify ("we," "us," or "our") provides a service that transforms YouTube playlists into organized, structured courses. This Privacy Policy describes how we collect, use, and share your personal information when you access our website, mobile application, or other services (collectively, the "Service"). By using our Service, you agree to the practices described in this Privacy Policy.',
  },
  {
    title: "Information We Collect",
    data: [
      {
        id: "1",
        bold: "Personal Information You Provide",
        points: [
          "Account Details: When you register, we may collect your name, email address, and password.",
          "Profile Information: You may also choose to provide additional details such as your location, profile photo, or other contact information.",
          "Content Data: If you create courses or playlists, the videos and course structure you input become part of your content.",
        ],
      },
      {
        id: "2",
        bold: "Automatically Collected Information",
        points: [
          "Usage Data: We log information about how you use the Service, such as pages visited, time spent, and features used.",
          "Device Information: This includes details about your device (e.g., type, operating system, browser) and IP address.",
          "Cookies and Similar Technologies: We use cookies to improve your experience, remember your preferences, and analyze site traffic. You can adjust your browser settings to refuse cookies, though this may limit functionality.",
        ],
      },
    ],
  },
  {
    title: "How We Use Your Information",
    data: [
      {
        id: "1",
        normal: "We use your information for several purposes:",
        points: [
          "Providing and Improving the Service: To deliver our platform and enhance its performance, security, and functionality.",
          "Personalization: To tailor the content and course recommendations to your interests.",
          "Communication: To send you updates, newsletters, and important notifications about your account or changes to our policies.",
          "Customer Support: To respond to your queries and provide technical assistance.",
          "Analytics and Research: To understand how users interact with our Service, helping us improve user experience.",
        ],
      },
    ],
  },
  {
    title: "Sharing Your Information",
    description:
      "We do not sell your personal information. We may share your data in the following cases:",
    data: [
      {
        id: "1",
        points: [
          "Service Providers: With trusted third parties who perform services on our behalf (e.g., hosting, analytics, customer support). These providers are obligated to keep your information confidential.",
          "Legal Requirements: If required by law or in response to a legal request (such as a subpoena), we may disclose your information.",
          "Business Transfers: In the event of a merger, acquisition, or sale of all or part of our business, your information may be transferred as part of that transaction.",
        ],
      },
    ],
  },
  {
    title: "Data Security",
    description:
      "We take reasonable measures to protect your personal information from loss, misuse, and unauthorized access. These measures include encryption, access controls, and regular security assessments. However, no system is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Data Retention",
    description:
      "We retain your personal information for as long as your account is active or as needed to provide you the Service. When your information is no longer required, we will take reasonable steps to delete or anonymize it.",
  },
  {
    title: "Your Rights",
    description:
      "Depending on your location, you may have certain rights regarding your personal data, such as:",
    data: [
      {
        id: "1",
        points: [
          "Access: Request a copy of the personal data we hold about you.",
          "Correction: Ask us to update or correct inaccurate information.",
          "Deletion: Request that we delete your personal data, subject to legal obligations.",
          "Objection: Object to our processing of your personal data in certain circumstances.",
        ],
      },
    ],
  },
  {
    title: "Children's Privacy",
    description:
      "Our Service is not intended for children under 18. We do not knowingly collect personal information from minors. If we become aware that we have collected information from a minor, we will take steps to delete it promptly.",
  },
  {
    title: "Changes to This Privacy Policy",
    description:
      // eslint-disable-next-line quotes
      'We may update this Privacy Policy from time to time. We will post the updated version on our website and update the "Last Updated" date. We encourage you to review this page periodically for any changes.',
  },
];
