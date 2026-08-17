import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import DiagramPreview from "@/components/landing/DiagramPreview";
import Logo from "@/components/landing/Logo";

const FEATURES = [
  {
    title: "Plain English in, UML out",
    body: "Describe the system the way you'd explain it to a teammate. No modelling notation to learn first.",
    icon: "M4 6h16M4 12h10M4 18h7",
  },
  {
    title: "Structured, not guessed",
    body: "Every response is validated against a strict schema, so classes, attributes, methods and relationships always come back well-formed.",
    icon: "M9 12l2 2 4-4M12 3l7 4v5c0 4.4-3 8.3-7 9-4-0.7-7-4.6-7-9V7l7-4z",
  },
  {
    title: "Real Mermaid diagrams",
    body: "Output renders as a live Mermaid class diagram you can read, screenshot, or paste straight into your report.",
    icon: "M4 5h6v4H4zM14 15h6v4h-6zM4 15h6v4H4zM10 7h2a2 2 0 012 2v8",
  },
  {
    title: "Four relationship types",
    body: "Association, inheritance, aggregation and composition — drawn with the correct UML arrowheads, not generic lines.",
    icon: "M7 7h10v10M7 17L17 7",
  },
  {
    title: "Saved to your workspace",
    body: "Every diagram is stored against your account, so you can come back, compare iterations and pick up where you left off.",
    icon: "M4 7v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H6a2 2 0 00-2 2z",
  },
  {
    title: "JSON you can build on",
    body: "The raw model sits next to the diagram, ready to feed into code generation, docs or your own tooling.",
    icon: "M8 4H6a2 2 0 00-2 2v3a2 2 0 01-2 2 2 2 0 012 2v3a2 2 0 002 2h2M16 4h2a2 2 0 012 2v3a2 2 0 002 2 2 2 0 00-2 2v3a2 2 0 01-2 2h-2",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Describe the system",
    body: "Write a few lines about what your project does and who uses it. Bullet points work just as well as prose.",
  },
  {
    step: "02",
    title: "Generate the model",
    body: "ArchiGen infers the classes, their attributes and methods, and how they relate to one another.",
  },
  {
    step: "03",
    title: "Review and iterate",
    body: "Read the rendered diagram, tweak your description, and regenerate until the model matches your design.",
  },
];

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline/80 bg-canvas/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="ArchiGen AI home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-white">
            How it works
          </a>
          <a href="#example" className="transition-colors hover:text-white">
            Example
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Show
            when="signed-in"
            fallback={
              <>
                <SignInButton mode="modal">
                  <button className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:text-white">
                    Sign in
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-canvas transition-colors hover:bg-zinc-200">
                    Get started
                  </button>
                </SignUpButton>
              </>
            }
          >
            <Link
              href="/dashboard"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-canvas transition-colors hover:bg-zinc-200"
            >
              Dashboard
            </Link>

            <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
          </Show>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-blueprint relative overflow-hidden border-b border-hairline">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-20 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/80 px-3 py-1 text-xs text-zinc-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Schema-validated output, every time
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            Turn a paragraph into a{" "}
            <span className="text-accent-soft">UML class diagram</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400">
            ArchiGen AI reads your project description and designs the class
            model for you — classes, attributes, methods and the relationships
            between them — rendered as a diagram in seconds.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Show
              when="signed-in"
              fallback={
                <SignUpButton mode="modal">
                  <button className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 sm:w-auto">
                    Generate your first diagram
                  </button>
                </SignUpButton>
              }
            >
              <Link
                href="/dashboard"
                className="w-full rounded-lg bg-accent px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-500 sm:w-auto"
              >
                Open your dashboard
              </Link>
            </Show>

            <a
              href="#example"
              className="w-full rounded-lg border border-hairline bg-surface px-6 py-3 text-center text-sm font-semibold text-zinc-200 transition-colors hover:bg-surface-2 sm:w-auto"
            >
              See an example
            </a>
          </div>

          <p className="mt-4 text-xs text-zinc-600">
            Free to use · No credit card required
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <DiagramPreview />
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="border-b border-hairline scroll-mt-16">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent-soft">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to get from idea to design
          </h2>
          <p className="mt-4 text-zinc-400">
            Built for the part of a project where you know what you want to
            build but haven&apos;t worked out the object model yet.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="card p-6 transition-colors hover:border-accent/40"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-accent/10 ring-1 ring-accent/25">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-5 text-accent-soft"
                  aria-hidden="true"
                >
                  <path
                    d={feature.icon}
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-hairline scroll-mt-16">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent-soft">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps, about a minute
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((item) => (
            <div key={item.step} className="card p-6">
              <span className="font-mono text-sm text-accent-soft">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Example() {
  return (
    <section id="example" className="border-b border-hairline scroll-mt-16">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium text-accent-soft">Example</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              From a four-line brief to a working class model
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              You don&apos;t need to name every field. ArchiGen infers sensible
              attributes and methods from the domain, then wires the classes
              together with the relationship type that actually fits — a bill
              that can&apos;t exist without its patient becomes a composition,
              not a plain association.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Association — one class uses another",
                "Inheritance — a class specialises another",
                "Aggregation — a whole made of parts that outlive it",
                "Composition — parts that die with the whole",
              ].map((line) => (
                <div key={line} className="flex items-start gap-3 text-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 size-4 shrink-0 text-accent-soft"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5l4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-zinc-400">{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="border-b border-hairline bg-surface-2 px-4 py-2.5 font-mono text-[11px] text-zinc-500">
              generated model · JSON
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-zinc-400">
              {`{
  "title": "Hospital Management System",
  "classes": [
    {
      "name": "Patient",
      "attributes": ["id: UUID", "name: String"],
      "methods": ["bookAppointment()"]
    },
    {
      "name": "Bill",
      "attributes": ["amount: Decimal", "paid: Boolean"],
      "methods": ["markPaid()"]
    }
  ],
  "relationships": [
    {
      "from": "Patient",
      "to": "Bill",
      "type": "composition"
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-24">
        <div className="card bg-blueprint relative overflow-hidden px-6 py-14 text-center sm:px-14">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop drawing boxes by hand
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Sign up and turn your next project brief into a class diagram before
            you write a line of code.
          </p>

          <div className="mt-8 flex justify-center">
            <Show
              when="signed-in"
              fallback={
                <SignUpButton mode="modal">
                  <button className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
                    Get started — it&apos;s free
                  </button>
                </SignUpButton>
              }
            >
              <Link
                href="/dashboard"
                className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                Go to dashboard
              </Link>
            </Show>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-zinc-600 sm:flex-row">
      <Logo className="opacity-70" />
      <p>© {new Date().getFullYear()} ArchiGen AI</p>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <>
      <NavBar />

      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Example />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
