import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className="bg-secondary py-10 text-secondary-foreground">
      <div className="container">
        <div className="flex flex-col justify-between gap-2 pb-3 md:flex-row">
          <p>
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Link className="hover:underline" href="/term-and-services">
              Terms of Service
            </Link>
            <Link className="hover:underline" href="/privacy-policy">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center border-t-2 border-border pt-3">
          Made with ❤️ by&nbsp;
          <a
            href="https://github.com/shivam5167"
            className="font-bold text-blue-500 hover:underline"
            target="_blank"
          >
            Shivam
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
