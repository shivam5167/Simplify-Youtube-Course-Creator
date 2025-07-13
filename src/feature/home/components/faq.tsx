import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section className={"container pb-20 pt-10"}>
      <h2 className="text-center text-2xl font-bold md:text-4xl">
        Frequently asked question
      </h2>
      <p className="mt-5 text-center text-sm text-secondary-foreground md:text-lg">
        Here are some of the frequently asked questions. If you have any other
        question, feel free to contact us.
      </p>

      <Accordion type="multiple" className="mt-10 space-y-3 border-none">
        {faqs.map(({ question, answer }, idx) => (
          <AccordionItem
            key={`${idx}-faq`}
            value={question}
            className="mx-auto w-full max-w-screen-lg rounded-sm border-none bg-secondary px-5 text-secondary-foreground"
          >
            <AccordionTrigger className="text-base">
              {question}
            </AccordionTrigger>
            <AccordionContent className="w-full max-w-screen-lg">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export const FAQSectionSkeleton = () => {
  return (
    <section className={"container pb-20 pt-10"}>
      {/* Title skeleton */}
      <div className="mx-auto h-8 w-64 animate-pulse rounded-md bg-gray-300/20 md:h-10 md:w-96" />

      {/* Subtitle skeleton */}
      <div className="mx-auto mt-5 h-16 w-full max-w-lg animate-pulse rounded-md bg-gray-300/20" />

      {/* FAQ items skeleton */}
      <div className="mt-10 space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="mx-auto w-full max-w-screen-lg rounded-sm bg-secondary p-5"
          >
            {/* Question skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-6 w-3/4 animate-pulse rounded-md bg-gray-300/20" />
              <div className="size-4 animate-pulse rounded-full bg-gray-300/20" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const faqs = [
  {
    question: "What is Simplify?",
    answer:
      "Simplify is a platform where you can learn and teach courses. You can create your own course and share your knowledge with the world.",
  },

  {
    question: "How does Simplify work?",
    answer:
      "Simplify works by allowing users to create and enroll in various courses. The platform provides tools for instructors to manage their courses effectively.",
  },
  {
    question: "Does Simplify own these courses?",
    answer:
      "No, Simplify does not own any of the courses. The courses are created by the instructors.",
  },
  {
    question: "How can I create a course?",
    answer:
      "To create a course, First you have to register yourself to our platform. After that, you can create a course by clicking on the create course button and past your youtube playlist link which you are following.",
  },
  {
    question: "How can I enroll in a course?",
    answer:
      "To enroll in a course, you have to first register yourself to our platform. After that, you can enroll in a course by clicking on the enroll button.",
  },
  {
    question: "How can I contact the instructor?",
    answer:
      "You can visit the youtube channel of the instructor by clicking on the subscribe button and we highly recommend you to subscribe to the instructor's channel.",
  },
  {
    question: "Do simplify charge any fee for the courses?",
    answer:
      "No, Simplify does not charge any fee for the courses. The courses are free to enroll as we do not own any of the courses and the courses are created by the instructors.",
  },
  {
    question: "How can I take down my channel's playlist from Simplify?",
    answer:
      "You can take down your channel's playlist from Simplify by contacting us through the contact form or by sending us an email (shivam516787@gmail.com).",
  },
];

export default FAQSection;
