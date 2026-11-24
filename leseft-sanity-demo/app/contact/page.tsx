import type { Metadata } from 'next';

import { ContactEnquiryForm } from '@/components/contact/contact-enquiry-form';
import { EmptyState } from '@/components/ui/empty-state';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { getContactContent } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact',
};

export default async function ContactPage() {
  const { data: contact } = await getContactContent();

  if (!contact) {
    return (
      <EmptyState
        title="Contact content not available"
        description="Published contact content will appear here when it is available."
      />
    );
  }

  const email = contact.email?.trim();
  const phone = contact.phone?.trim();
  const address = contact.address?.trim();

  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeading eyebrow="Contact" title="Contact" />
          {contact.contactDescription ? (
            <p className="body-copy mt-7 max-w-xl">{contact.contactDescription}</p>
          ) : null}

          <div className="mt-10 grid gap-4">
            {email ? (
              <article className="surface-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">Email</p>
                <a href={`mailto:${email}`} className="mt-2 block break-all font-medium text-navy-950 hover:text-gold-600">
                  {email}
                </a>
              </article>
            ) : null}
            {phone ? (
              <article className="surface-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">Phone</p>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="mt-2 block font-medium text-navy-950 hover:text-gold-600">
                  {phone}
                </a>
              </article>
            ) : null}
            {address ? (
              <article className="surface-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">Address</p>
                <p className="mt-2 text-sm leading-7 text-navy-800/75">{address}</p>
              </article>
            ) : null}
          </div>
        </div>

        {email ? <ContactEnquiryForm recipient={email} /> : null}
      </Container>
    </section>
  );
}
