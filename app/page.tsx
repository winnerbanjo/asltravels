"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AslLogo } from "@/components/asl-logo";
import heroPortrait from "@/assets/images/african-american-business-woman-with-phone.jpg";
import travelerPortrait from "@/assets/images/businesswoman-serious-meeting.jpg";
import teamPortrait from "@/assets/images/black-men-cafe-have-business.jpg";

const audiences = [
  "Travel agencies",
  "Church groups",
  "Diaspora agents",
  "Freelancers",
  "Micro businesses",
];

const heroFrames = [
  {
    word: "agency",
    image: heroPortrait,
    alt: "Travel entrepreneur using a phone",
  },
  {
    word: "business",
    image: travelerPortrait,
    alt: "Traveler with luggage and camera",
  },
  {
    word: "brand",
    image: teamPortrait,
    alt: "Travel operators collaborating",
  },
];

const steps = [
  {
    number: "01",
    title: "Start free",
    description: "Try the platform for 1 day. No card required.",
  },
  {
    number: "02",
    title: "Launch branded",
    description: "Go live with your own booking website and payment flow.",
  },
  {
    number: "03",
    title: "Grow revenue",
    description: "Move up plans as volume grows and economics improve.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "₦25,000",
    caption: "For new travel sellers",
    commission: "5% platform commission",
    websites: "1 website",
    support: "Standard support",
    featured: false,
  },
  {
    name: "Growth",
    price: "₦35,000",
    caption: "For growing agents",
    commission: "Platform commission applies",
    websites: "Custom domain support",
    support: "Priority support",
    featured: true,
  },
  {
    name: "Pro Agency",
    price: "₦75,000",
    caption: "For professional agencies",
    commission: "1% platform commission",
    websites: "Up to 3 websites",
    support: "Advanced operations",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "₦150,000",
    caption: "For large agencies",
    commission: "0% platform commission",
    websites: "Unlimited websites",
    support: "Dedicated account manager",
    featured: false,
  },
];

const comparisonRows = [
  ["Free trial", "1 day", "1 day", "1 day", "1 day"],
  ["Default markup", "Yes", "Yes", "Yes", "Yes"],
  ["Branded booking website", "Yes", "Yes", "Yes", "Yes"],
  ["Flight search engine", "Yes", "Yes", "Yes", "Yes"],
  ["Customer payment processing", "Yes", "Yes", "Yes", "Yes"],
  ["Platform commission", "5%", "Applies", "1%", "0%"],
  ["Custom domain support", "No", "Yes", "Yes", "Yes"],
  ["WhatsApp booking integration", "No", "Yes", "Yes", "Yes"],
  ["Landing page builder", "No", "Yes", "Yes", "Yes"],
  ["Marketing toolkit", "No", "Yes", "Yes", "Yes"],
  ["Customer email automation", "No", "Yes", "Yes", "Yes"],
  ["White label branding", "No", "No", "Yes", "Yes"],
  ["Multiple staff accounts", "No", "No", "Yes", "Unlimited"],
  ["Advanced reporting", "Basic analytics", "Improved", "Yes", "Yes"],
  ["Bulk booking management", "No", "No", "Yes", "Yes"],
  ["API access", "No", "No", "No", "Yes"],
];

const revenueStreams = [
  "Subscription revenue from monthly merchant payments",
  "Booking commission that scales with ticket sales",
  "Platform add-ons for domains, design, campaigns, leads, and branding",
];

const footerLinks = {
  Product: [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#platform", label: "Platform" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#revenue", label: "Revenue model" },
  ],
  Company: [
    { href: "#", label: "About" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Contact" },
  ],
  Legal: [
    { href: "#", label: "Terms" },
    { href: "#", label: "Privacy" },
    { href: "#", label: "Disclaimer" },
  ],
};

const reveal = {
  duration: 0.5,
  ease: "easeOut" as const,
};

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...reveal, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroFrames.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="overflow-hidden bg-[#F8FAFD]">
      <section className="relative overflow-hidden border-b border-[#E3E8F2] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)]">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_right,_rgba(23,54,182,0.10),_transparent_26%),radial-gradient(circle_at_top_left,_rgba(11,28,90,0.06),_transparent_28%)]" />
        <motion.div
          className="absolute right-0 top-20 h-64 w-64 rounded-full bg-[#1736B6]/8 blur-3xl"
          animate={{ y: [0, 14, 0], x: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="page-shell relative py-14 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <FadeIn className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#1736B6]">
                Travel agency infrastructure for Africa
              </p>
              <h1 className="mt-6 max-w-xl text-5xl font-semibold tracking-[-0.06em] text-[#0B1C5A] md:text-6xl lg:text-7xl">
                Launch your travel{" "}
                <span className="relative inline-flex min-w-[2.7ch] text-[#3E5BD8]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={heroFrames[heroIndex].word}
                      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {heroFrames[heroIndex].word}
                    </motion.span>
                  </AnimatePresence>
                </span>
                .
                <span className="block text-[#0B1C5A]">Not just a booking page.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#667085] md:text-xl">
                Flights, payments, branded websites, and merchant infrastructure are already
                handled. You focus on customers, growth, and margin.
              </p>
              <p className="mt-4 text-base text-[#667085]">1 day free trial. No card required.</p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-[#1736B6] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#0F2D9C]"
                >
                  Start your agency
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center rounded-full border border-[#D7DFF2] bg-white px-6 py-3.5 text-sm font-medium text-[#0B1C5A] transition hover:bg-[#F5F8FF]"
                >
                  View pricing
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {["Affordable for beginners", "Profitable for ASL", "Scalable with growth"].map(
                  (item, index) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#DCE3F7] bg-white px-4 py-2 text-sm font-medium text-[#0B1C5A]"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2.25rem] border border-[#E3E8F2] bg-white p-4 shadow-[0_24px_70px_rgba(12,30,84,0.08)]">
                  <div className="relative h-[32rem] overflow-hidden rounded-[1.75rem] bg-[#EFF4FF]">
                    <motion.div
                      className="absolute inset-0"
                      animate={{ y: `${-heroIndex * 100}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {heroFrames.map((frame, index) => (
                        <div key={`${frame.word}-${index}`} className="relative h-[32rem]">
                          <Image
                            src={frame.image}
                            alt={frame.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 560px"
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,90,0.04)_0%,rgba(11,28,90,0.22)_100%)]" />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  className="absolute -bottom-8 right-6 hidden max-w-xs rounded-[1.5rem] border border-[#E3E8F2] bg-white p-4 shadow-[0_18px_50px_rgba(12,30,84,0.10)] lg:block"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...reveal, delay: 0.2 }}
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#7A8499]">Free trial</p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0B1C5A]">1 day</p>
                  <p className="mt-2 text-sm leading-6 text-[#667085]">
                    Website builder, booking flow, and dashboard access included.
                  </p>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="page-shell py-10 md:py-12">
        <FadeIn className="rounded-[2rem] border border-[#DCE3F7] bg-white px-6 py-8 text-center shadow-[0_12px_40px_rgba(13,32,93,0.05)] md:px-10">
          <p className="text-2xl font-semibold tracking-[-0.04em] text-[#0B1C5A] md:text-3xl">
            Affordable for beginners.
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#0B1C5A] md:text-3xl">
            Profitable for ASL.
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#0B1C5A] md:text-3xl">
            Scalable with merchant growth.
          </p>
        </FadeIn>
      </section>

      <section id="partners" className="page-shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <FadeIn className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#1736B6]">Who it&apos;s for</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#0B1C5A] md:text-5xl">
                Built for people already selling travel and those ready to start.
              </h2>
            </FadeIn>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map((item, index) => (
                <FadeIn key={item} delay={index * 0.05}>
                  <motion.div
                    className="rounded-[1.5rem] border border-[#DCE3F7] bg-white px-5 py-6 text-lg font-medium text-[#0B1C5A]"
                    whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(13,32,93,0.06)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.12}>
            <div className="overflow-hidden rounded-[2rem] border border-[#DCE3F7] bg-white p-4 shadow-[0_16px_48px_rgba(13,32,93,0.06)]">
              <div className="relative h-80 overflow-hidden rounded-[1.5rem]">
                <Image
                  src={teamPortrait}
                  alt="Travel operators collaborating"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,90,0.02)_0%,rgba(11,28,90,0.58)_100%)]" />
              </div>
              <div className="pt-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[#1736B6]">Built for operators</p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#0B1C5A]">
                  Human-led distribution with infrastructure already in place.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="how-it-works" className="page-shell py-16 md:py-24">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#1736B6]">How it works</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#0B1C5A] md:text-5xl">
            From trial to live agency in one clean path.
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.08}>
              <motion.div
                className="rounded-[1.75rem] border border-[#DCE3F7] bg-white p-6 shadow-[0_12px_40px_rgba(13,32,93,0.05)]"
                whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(13,32,93,0.06)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8EEFF] text-sm font-semibold text-[#1736B6]">
                  {step.number}
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[#0B1C5A]">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#667085]">{step.description}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="pricing" className="page-shell py-16 md:py-24">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#1736B6]">Pricing</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0B1C5A] md:text-6xl">
            Cleaner pricing.
            <span className="block text-[#3E5BD8]">Clearer ladder.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#667085]">
            Start low. Upgrade when you need more reach, control, and margin efficiency.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 0.05}>
              <motion.div
                className={`h-full rounded-[2rem] border p-6 ${
                  plan.featured
                    ? "border-[#B9C8FF] bg-[#1736B6] text-white shadow-[0_20px_60px_rgba(23,54,182,0.18)]"
                    : "border-[#DCE3F7] bg-white text-[#0B1C5A]"
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold tracking-[-0.03em]">{plan.name}</p>
                    <p className={`mt-2 text-sm ${plan.featured ? "text-white/72" : "text-[#667085]"}`}>
                      {plan.caption}
                    </p>
                  </div>
                  {plan.featured ? (
                    <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-medium text-white">
                      Recommended
                    </span>
                  ) : null}
                </div>
                <p className="mt-8 text-4xl font-semibold tracking-[-0.05em]">{plan.price}</p>
                <p className={`mt-1 text-sm ${plan.featured ? "text-white/72" : "text-[#667085]"}`}>per month</p>
                <div className={`mt-6 space-y-3 text-sm ${plan.featured ? "text-white/84" : "text-[#667085]"}`}>
                  <p>{plan.commission}</p>
                  <p>{plan.websites}</p>
                  <p>{plan.support}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1} className="mt-10 overflow-hidden rounded-[2rem] border border-[#DCE3F7] bg-white shadow-[0_16px_48px_rgba(13,32,93,0.06)]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-[#E7ECF6] bg-[#F8FAFD]">
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-[0.16em] text-[#1736B6]">
                    Features
                  </th>
                  <th className="px-4 py-5 text-left text-sm font-semibold text-[#0B1C5A]">Starter</th>
                  <th className="bg-[#EEF3FF] px-4 py-5 text-left text-sm font-semibold text-[#1736B6]">
                    Growth
                  </th>
                  <th className="px-4 py-5 text-left text-sm font-semibold text-[#0B1C5A]">Pro Agency</th>
                  <th className="px-4 py-5 text-left text-sm font-semibold text-[#0B1C5A]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row[0]} className={index % 2 === 0 ? "bg-white" : "bg-[#FBFCFF]"}>
                    <td className="px-6 py-4 text-sm font-medium text-[#0B1C5A]">{row[0]}</td>
                    <td className="px-4 py-4 text-sm text-[#667085]">{row[1]}</td>
                    <td className="bg-[#F6F8FF] px-4 py-4 text-sm font-medium text-[#1736B6]">{row[2]}</td>
                    <td className="px-4 py-4 text-sm text-[#667085]">{row[3]}</td>
                    <td className="px-4 py-4 text-sm text-[#667085]">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn delay={0.14} className="mt-10 rounded-[2rem] border border-[#DCE3F7] bg-white p-8 shadow-[0_16px_48px_rgba(13,32,93,0.05)]">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#1736B6]">Revenue projection</p>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0B1C5A] md:text-4xl">
                1,000 merchants × ₦35,000 average plan = ₦35 million monthly
              </p>
              <p className="mt-3 text-base text-[#667085]">
                Plus booking commissions and platform add-ons.
              </p>
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-[#1736B6] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#0F2D9C]"
            >
              Start with the free trial
            </Link>
          </div>
        </FadeIn>
      </section>

      <section id="revenue" className="page-shell py-16 md:py-24">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
          <FadeIn>
            <div className="relative h-80 overflow-hidden rounded-[2rem] border border-[#DCE3F7] bg-white shadow-[0_16px_48px_rgba(13,32,93,0.06)]">
              <Image
                src={travelerPortrait}
                alt="Traveler with luggage and camera"
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="rounded-[2rem] border border-[#DCE3F7] bg-white p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[#1736B6]">Revenue model</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#0B1C5A] md:text-5xl">
                Three revenue streams.
              </h2>
              <div className="mt-8 grid gap-3">
                {revenueStreams.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-[#F4F7FF] px-4 py-4 text-base font-medium text-[#0B1C5A]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="page-shell py-16 md:py-24">
        <FadeIn className="rounded-[2.5rem] bg-[#1736B6] px-6 py-16 text-center text-white shadow-[0_22px_60px_rgba(23,54,182,0.18)] md:px-10">
          <p className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
            The fastest way to start a travel business.
          </p>
          <p className="mt-4 text-lg text-white/76">
            Start with the trial. Move up when your sales and team grow.
          </p>
          <Link
            href="/signup"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#1736B6] transition hover:bg-[#E8EEFF]"
          >
            Start your agency
          </Link>
        </FadeIn>
      </section>

      <footer className="border-t border-[#DCE3F7] bg-white">
        <div className="page-shell py-12">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              <AslLogo compact />
              <p className="mt-4 text-sm leading-7 text-[#667085]">
                Infrastructure for modern travel businesses.
              </p>
            </div>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0B1C5A]">
                  {title}
                </p>
                <div className="mt-4 space-y-3">
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-[#667085] transition hover:text-[#0B1C5A]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-[#DCE3F7] pt-6 text-sm text-[#667085]">
            © 2026 ASL Travels
          </div>
        </div>
      </footer>
    </main>
  );
}
