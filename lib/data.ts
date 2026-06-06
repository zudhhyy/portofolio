import { Briefcase, Code2, Globe2, Layers3, Mail, MapPin, Rocket, Smartphone, Sparkles, Users } from 'lucide-react';

export const profile = {
  name: 'Tubagus Dhaifullah Zuhdi',
  role: 'Senior Frontend Engineer',
  headline: 'Frontend engineer who turns complex ideas into polished, shippable products',
  location: 'Jakarta - Bali, Indonesia — open to remote and onsite roles',
  email: 'tubagus.zuhdi2@gmail.com',
  phone: '+62 817 7412 4858',
  linkedin: 'https://www.linkedin.com/in/tubagus-dhaifullah-zuhdi/',
  github: 'https://github.com/zudhhyy',
  resume: '/resume-tubagus-dhaifullah-zuhdi.pdf',
  summary:
    'Senior Frontend Engineer with 5+ years of experience building scalable web and mobile products using React, Next.js, React Native, and TypeScript. Proven experience owning frontend architecture, establishing engineering standards, and delivering production applications across startups, enterprise use cases, and distributed teams.',
};

export const metrics = [
  { value: '5+', label: 'Years building production web and mobile products' },
  { value: '20+', label: 'Frontend engineers collaborated with in current team' },
  { value: '4+', label: 'Apps led across current web and mobile development teams' },
  { value: '100+', label: 'Content records supported in creator workflows' },
];

export const aboutHighlights = [
  {
    icon: Rocket,
    title: 'Architecture Ownership',
    text: 'Creates reusable component patterns, project structure standards, and maintainable frontend workflows.',
  },
  {
    icon: Users,
    title: 'Cross-Team Product Delivery',
    text: 'Works closely with product managers, designers, backend engineers, QA, and stakeholders across distributed teams.',
  },
  {
    icon: Layers3,
    title: 'Enterprise-Ready Execution',
    text: 'Builds client-facing and internal platforms with performance, release quality, and long-term scalability in mind.',
  },
];

export const skillGroups = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    skills: ['React Native', 'Expo', 'Expo Router', 'EAS Build'],
  },
  {
    title: 'Backend & APIs',
    icon: Globe2,
    skills: ['Node.js', 'REST APIs', 'GraphQL', 'OpenAPI', 'Supabase'],
  },
  {
    title: 'Architecture',
    icon: Layers3,
    skills: ['Turborepo', 'Monorepo Architecture', 'TanStack Query', 'Zustand', 'Redux'],
  },
  {
    title: 'Tools',
    icon: Briefcase,
    skills: ['Git', 'GitHub Actions', 'Docker', 'Figma', 'CI/CD'],
  },
  {
    title: 'Integrations',
    icon: Sparkles,
    skills: ['OAuth', 'Firebase', 'WalletConnect', 'Wagmi', 'Third-party APIs'],
  },
];

export const technologies = ['All', 'React', 'Next.js', 'TypeScript', 'React Native', 'Web3', 'Expo'];

export type Project = {
  name: string;
  type: string;
  company: string;
  description: string;
  stack: string[];
  achievements: string[];
  gradient: string;
  web?: string;
  playStore?: string;
  appStore?: string;
};

export const projects: Project[] = [
  {
    name: 'Conture',
    type: 'Webtoon & Novel Platform',
    company: 'Cigro',
    description:
      'Creator and reader platform with content workflows, virtual currency, settlements, withdrawals, and type-safe backend communication.',
    stack: ['Next.js', 'TypeScript', 'Turborepo', 'Orval', 'TanStack Query'],
    achievements: [
      'Supported 100+ combined story and episode records',
      'Built monetization workflows for balances, transactions, settlements, and withdrawals',
      'Integrated OpenAPI-generated clients for reliable API contracts',
    ],
    gradient: 'from-blue-500/30 via-blue-500/15 to-cyan-400/10',
  },
  {
    name: 'Uobong',
    type: 'Hiking App Mobile & Website',
    company: 'Cigro',
    description:
      'Cross-platform hiking product with geofencing, quest completion, achievement tracking, and background location synchronization.',
    stack: ['Expo', 'React Native', 'TypeScript', 'Next.js', 'Turborepo'],
    achievements: [
      'Implemented Google, Apple, and Kakao OAuth flows',
      'Managed production releases through EAS Build and OTA updates',
      'Extended the platform with a web app and admin panel',
    ],
    gradient: 'from-blue-500/30 via-blue-500/15 to-cyan-400/10',
    playStore: 'https://play.google.com/store/apps/details?id=com.uobong.app&hl=id',
    appStore: 'https://apps.apple.com/us/app/%EC%9A%B0%EC%98%A4%EB%B4%89-%EB%93%B1%EC%82%B0-%EC%9D%B8%EC%A6%9D%EC%9D%80-%EC%9A%B0%EC%98%A4%EB%B4%89-%EB%A6%AC%EA%B7%B8%ED%98%95-%EB%93%B1%EC%82%B0-%ED%94%8C%EB%9E%AB%ED%8F%BC/id6742874796',
    web: 'https://uobong.app/'
  },
  {
    name: 'CHI App',
    type: 'Event Wallet & Ticketing',
    company: 'EventCHI',
    description:
      'Mobile app for event wallets, ticket management, and event payments across Android and iOS.',
    stack: ['React Native', 'TypeScript', 'REST APIs', 'Payments'],
    achievements: [
      'Built wallet, ticketing, and event payment flows for production release',
      'Integrated payment functionality, ticket validation, and transaction history',
      'Coordinated release readiness with QA, backend, and stakeholders',
    ],
    gradient: 'from-violet-500/30 via-violet-500/15 to-fuchsia-400/10',
    playStore: 'https://play.google.com/store/apps/details?id=app.chi.mobile&hl=id',
    appStore: 'https://apps.apple.com/id/app/chi-app-new/id6759359337?l=id',
  },
  {
    name: 'Event CHI Backstage',
    type: 'Event Admin Platform',
    company: 'EventCHI',
    description:
      'Revamped legacy admin panel codebase, migrating from JavaScript to TypeScript while modernizing features for event organizers.',
    stack: ['React', 'TypeScript', 'Redux', 'REST APIs'],
    achievements: [
      'Restructured components, updated dependencies, and removed outdated code for better maintainability',
      'Implemented real-time dashboard analytics, user management, and event floorplan customization',
      'Optimized API calls and Redux state management to improve admin panel performance',
    ],
    gradient: 'from-violet-500/30 via-violet-500/15 to-fuchsia-400/10',
    web: 'https://web.chi.app/',
  },
  {
    name: 'SunLike MTE',
    type: 'Smart Lighting Mobile App',
    company: 'Healstation',
    description:
      'Android and iOS application for Seoul Semiconductor to manage home lighting systems with hardware communication over Wi-Fi.',
    stack: ['React Native', 'TypeScript', 'Zustand', 'TCP/UDP'],
    achievements: [
      'Integrated TCP and UDP connections for hardware communication over Wi-Fi',
      'Collaborated with hardware engineers to ensure smooth app-to-device communication',
      'Deployed on Android and iOS with a focus on performance and ease of use',
    ],
    gradient: 'from-amber-500/30 via-amber-500/15 to-orange-400/10',
    playStore: 'https://play.google.com/store/apps/details?id=com.seoulsemicon.sunlikemte',
  },
  {
    name: 'Caffeine Addicted',
    type: 'Coffee Shop Mobile App',
    company: 'Healstation',
    description:
      'Android and iOS applications for a Korean coffee shop, serving both store and customer ordering interfaces.',
    stack: ['React Native', 'TypeScript', 'Zustand', 'Nicepay'],
    achievements: [
      'Enabled delivery ordering with Nicepay third-party payment integration',
      'Incorporated delivery service API for order tracking and delivery management',
      'Collaborated with cross-functional teams on payment gateway and delivery integrations',
    ],
    gradient: 'from-amber-500/30 via-amber-500/15 to-orange-400/10',
    playStore: 'https://play.google.com/store/apps/details?id=com.caffeineism',
    appStore: 'https://apps.apple.com/kr/app/%EC%B9%B4%ED%8E%98%EC%9D%B8%EC%A4%91%EB%8F%85/id6451965841',
  },
  {
    name: 'Forslice',
    type: 'Property Tokenization Platform',
    company: 'Desociety',
    description:
      'Built and shipped the full marketing website for a Singapore-based real estate tokenization startup using Next.js 15, TypeScript, and Tailwind CSS 4.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'App Router'],
    achievements: [
      'Designed a feature-based frontend architecture to keep pages modular and easy to extend',
      'Set up site-wide SEO with Open Graph and Twitter cards for discoverability',
      'Implemented shared layout, navigation, and global state management for a consistent user experience',
    ],
    gradient: 'from-rose-500/30 via-rose-500/15 to-orange-400/10',
    web: 'https://forslice.com/',
  },
  {
    name: 'Soulful Goddess',
    type: 'Yoga Retreat & Wellness Platform',
    company: 'Desociety',
    description:
      'Built the full marketing website for Soulful Goddess, a transformative yoga retreat brand in Mallorca by Vanessa Wolter — from retreat promotion and storytelling to testimonials, sign-up flows, and community engagement.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'i18n'],
    achievements: [
      'Developed responsive pages for retreat listings, vision storytelling, products, FAQs, and private yoga events',
      'Implemented testimonial showcases, sign-up CTAs, and social integrations for Instagram, WhatsApp, and email',
      'Delivered multilingual routing, SEO-ready structure, and a warm, immersive UI that reflects the wellness brand',
    ],
    gradient: 'from-rose-500/30 via-rose-500/15 to-orange-400/10',
    web: 'https://soulfulgoddess.io/en',
  },
  {
    name: 'Poopooville',
    type: 'Web3 DApp Platform',
    company: 'Desociety',
    description:
      'DApp platform for buying and selling NFT collections, creating NFT lotteries, and facilitating ERC20 token sales.',
    stack: ['React', 'TypeScript', 'Web3', 'Ethers.js', 'Wagmi', 'WalletConnect'],
    achievements: [
      'Built NFT marketplace, lottery, and ERC20 token sale workflows',
      'Integrated Web3 wallet connectivity for secure user transactions',
      'Delivered polished front-end experiences with Lottie animations',
    ],
    gradient: 'from-fuchsia-500/30 via-fuchsia-500/15 to-violet-400/10',
    web: 'https://poopooville.io',
  },
  {
    name: 'Omakasea',
    type: 'Web3 NFT Platform',
    company: 'Desociety',
    description:
      'Application platform for creating, buying, and selling NFTs on the Ethereum network.',
    stack: ['React', 'TypeScript', 'Web3', 'Ethers.js', 'Chakra UI'],
    achievements: [
      'Built smooth NFT creation and marketplace experiences on Ethereum',
      'Ensured seamless integration with Ethereum smart contracts for transactions',
      'Delivered responsive UI with Chakra UI and React Router',
    ],
    gradient: 'from-fuchsia-500/30 via-fuchsia-500/15 to-violet-400/10',
    web: 'https://omakasea.com',
  },
  {
    name: 'Mooncake',
    type: 'Web3 Token Platform',
    company: 'Desociety',
    description:
      'DApp website for buying, selling, and viewing real-time charts of Mooncake tokens on Binance Smart Chain.',
    stack: ['React', 'TypeScript', 'Web3', 'Ethers.js', 'Tailwind CSS'],
    achievements: [
      'Integrated Binance Smart Chain to facilitate token transactions',
      'Implemented real-time chart updates for token trading activity',
      'Built performant front-end with React, TypeScript, and Tailwind CSS',
    ],
    gradient: 'from-emerald-500/30 via-emerald-500/15 to-teal-400/10',
    web: 'https://mooncake.io',
  },
];

export const experiences = [
  {
    company: 'Cigro',
    location: 'Seoul, South Korea, Remote',
    role: 'Senior Frontend Developer',
    period: 'Apr 2025 - Present',
    tech: ['React', 'Next.js', 'React Native', 'TypeScript'],
    achievements: [
      'Lead frontend development for selected web and mobile projects within a team of 6 frontend engineers.',
      'Delivered 4 applications for client-facing and enterprise use cases.',
      'Established reusable component patterns, project structure standards, and development workflows.',
      'Mentored frontend developers through code reviews and technical guidance.',
    ],
  },
  {
    company: 'EventCHI',
    location: 'Bali, Indonesia',
    role: 'Senior Frontend Developer',
    period: 'Nov 2024 - Apr 2025',
    tech: ['React', 'React Native', 'Payments', 'Revamp'],
    achievements: [
      'Developed web and mobile features for an event management platform.',
      'Resolved critical issues for payment processing, transaction history, and user workflows.',
      'Managed development and staging environments to support testing and deployment.',
    ],
  },
  {
    company: 'PT Healstation Indonesia',
    location: 'Jakarta, Indonesia',
    role: 'Frontend Developer',
    period: 'Jan 2022 - Nov 2024',
    tech: ['React', 'Next.js', 'React Native', 'TypeScript'],
    achievements: [
      'Led frontend development across 4 website and mobile applications.',
      'Delivered iOS and Android applications published to the App Store and Google Play Store.',
      'Built healthcare and restaurant solutions while improving frontend architecture and reusable patterns.',
    ],
  },
  {
    company: 'Desociety.io',
    location: 'Bali, Indonesia',
    role: 'Frontend Developer',
    period: 'Mar 2021 - Jan 2022',
    tech: ['React', 'Next.js', 'TypeScript', 'Ethers.js', 'Wagmi'],
    achievements: [
      'Developed and maintained Web3 applications with wallet connectivity and smart contract integrations.',
      'Implemented responsive, performant interfaces using Next.js and Tailwind CSS.',
      'Optimized real-time data fetching for transaction tracking and blockchain synchronization.',
    ],
  },
  {
    company: 'Fairtual.in',
    location: 'Jakarta, Indonesia',
    role: 'Fullstack Developer',
    period: 'Sep 2020 - Mar 2021',
    tech: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
    achievements: [
      'Built dynamic web applications across frontend and backend services.',
      'Created RESTful APIs to support product features and data flow.',
    ],
  },
  {
    company: 'Omind Tech',
    location: 'Depok, Indonesia',
    role: 'React Native Developer',
    period: 'Jul 2020 - Sep 2020',
    tech: ['React Native', 'iOS', 'Android'],
    achievements: [
      'Developed cross-platform mobile applications with React Native.',
      'Improved mobile user experience, performance, and stability.',
    ],
  },
];

export const availability = ['Remote Work', 'Onsite Work', 'Full-Time', 'Contract', 'Freelance'];

export const contactItems = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Globe2, label: 'LinkedIn', value: 'linkedin.com/in/tubagus-dhaifullah-zuhdi', href: profile.linkedin },
  { icon: Code2, label: 'GitHub', value: 'github.com/zudhhyy', href: profile.github },
  { icon: MapPin, label: 'Base', value: profile.location, href: '#contact' },
];
