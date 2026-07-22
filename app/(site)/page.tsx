import { Hero } from "@/components/sections/Hero";
import { Brokers } from "@/components/sections/Brokers";
import { Stats } from "@/components/sections/Stats";
import { Expertise } from "@/components/sections/Expertise";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Media } from "@/components/sections/Media";
import { Gallery } from "@/components/sections/Gallery";
import { Markets } from "@/components/sections/Markets";
import { Feed } from "@/components/sections/Feed";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Newsletter } from "@/components/sections/Newsletter";
import { Contact } from "@/components/sections/Contact";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { SiteNavigationJsonLd } from "@/components/seo/SiteNavigationJsonLd";
import { getPerson, isSectionEnabled } from "@/lib/person";

export default function HomePage() {
  const { faq, newsletter } = getPerson();

  return (
    <>
      <PersonJsonLd />
      <SiteNavigationJsonLd />
      <Hero />
      {isSectionEnabled("brokers") && <Brokers moreHref="/araci-kurumlar" />}
      {isSectionEnabled("stats") && <Stats />}
      {isSectionEnabled("expertise") && <Expertise />}
      {isSectionEnabled("about") && <About />}
      {isSectionEnabled("services") && <Services />}
      {isSectionEnabled("media") && <Media limit={3} moreHref="/medya" />}
      {isSectionEnabled("gallery") && <Gallery />}
      {isSectionEnabled("markets") && <Markets />}
      {isSectionEnabled("feed") && <Feed />}
      {isSectionEnabled("testimonials") && <Testimonials />}
      {isSectionEnabled("faq") && (
        <Faq items={faq} limit={3} moreHref="/sss" />
      )}
      {isSectionEnabled("newsletter") && (
        <Newsletter
          heading={newsletter.heading}
          description={newsletter.description}
          telegramUrl={newsletter.telegramUrl}
          buttonLabel={newsletter.buttonLabel}
        />
      )}
      {isSectionEnabled("contact") && <Contact />}
    </>
  );
}
