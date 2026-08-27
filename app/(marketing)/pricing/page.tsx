import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const teacherPlans = [
  {
    name: 'Solo',
    price: 19,
    tagline: 'For freelance teachers',
    features: [
      'Up to 10 students',
      'Unlimited lessons',
      'Homework & vocab tracking',
      'Built-in messenger',
      'Progress reports',
    ],
    cta: 'Start free trial',
  },
  {
    name: 'Pro',
    price: 49,
    tagline: 'For growing teachers',
    features: [
      'Up to 30 students',
      'Everything in Solo',
      'AI lesson planner',
      'AI homework grading',
      'Custom branding',
      'Parent notifications',
    ],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'School',
    price: 99,
    tagline: 'For small schools',
    features: [
      'Unlimited students',
      'Everything in Pro',
      'Multiple teachers',
      'Analytics dashboard',
      'White-label option',
      'Priority support',
    ],
    cta: 'Start free trial',
  },
];

const familyPlans = [
  {
    name: 'Kitten',
    price: 9,
    tagline: 'For 1 child',
    features: [
      '1 child',
      'AI cat tutor',
      'Self-paced lessons',
      'Cat Creator',
      'Progress tracking',
    ],
  },
  {
    name: 'Family',
    price: 19,
    tagline: 'For up to 3 kids',
    features: [
      'Up to 3 children',
      'Everything in Kitten',
      'Family dashboard',
      'Sibling challenges',
      'Parent reports',
    ],
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-center text-lavender-700 mb-4">
          Simple, honest pricing
        </h1>
        <p className="text-center text-lavender-600 mb-4 max-w-2xl mx-auto">
          Cancel anytime. No hidden fees. Save 20% with annual billing.
        </p>
        <p className="text-center text-sm text-lavender-500 mb-16">
          14-day free trial for all Teacher plans. No credit card required.
        </p>

        {/* TEACHERS */}
        <div className="mb-24">
          <h2 className="font-display text-3xl font-bold text-lavender-700 mb-2">For Teachers 👩‍🏫</h2>
          <p className="text-lavender-600 mb-8">Run your own online English school.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {teacherPlans.map((plan) => (
              <div
                key={plan.name}
                className={`card ${plan.highlight ? 'border-2 border-peach relative' : ''}`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-peach text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-display font-bold text-2xl text-lavender-700">{plan.name}</h3>
                <p className="text-sm text-lavender-500 mb-4">{plan.tagline}</p>
                <div className="my-6">
                  <span className="text-5xl font-bold text-lavender-700">${plan.price}</span>
                  <span className="text-lavender-500">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 text-lavender-600">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-mint">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/sign-up?role=teacher&plan=${plan.name.toLowerCase()}`}
                  className={plan.highlight ? 'btn-primary w-full' : 'btn-outline w-full'}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAMILIES */}
        <div>
          <h2 className="font-display text-3xl font-bold text-lavender-700 mb-2">For Families 👨‍👩‍👧</h2>
          <p className="text-lavender-600 mb-8">Self-serve English lessons with an AI cat tutor.</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {familyPlans.map((plan) => (
              <div key={plan.name} className={`card ${plan.highlight ? 'border-2 border-peach relative' : ''}`}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-peach text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                <h3 className="font-display font-bold text-2xl text-lavender-700">{plan.name}</h3>
                <p className="text-sm text-lavender-500 mb-4">{plan.tagline}</p>
                <div className="my-6">
                  <span className="text-5xl font-bold text-lavender-700">${plan.price}</span>
                  <span className="text-lavender-500">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 text-lavender-600">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-mint">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/sign-up?role=parent&plan=${plan.name.toLowerCase()}`}
                  className={plan.highlight ? 'btn-primary w-full' : 'btn-outline w-full'}
                >
                  Start with {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-24 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center text-lavender-700 mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no penalties. Cancel from your dashboard in one click.' },
              { q: 'How does the free trial work?', a: 'You get 14 days of Teacher Pro completely free. No credit card required at signup.' },
              { q: 'What if I have more than 30 students?', a: 'The School plan supports unlimited students. Or contact us for custom pricing.' },
              { q: 'Do you support payments in UAH?', a: 'Yes, we support gryvnia, dollars, and euros. Automatic conversion at signup.' },
              { q: 'Is my data safe?', a: 'All data is encrypted and stored in EU. GDPR compliant. Kids data protected under COPPA rules.' },
            ].map((faq) => (
              <details key={faq.q} className="card cursor-pointer">
                <summary className="font-bold text-lavender-700 list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-2xl">+</span>
                </summary>
                <p className="mt-3 text-lavender-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
