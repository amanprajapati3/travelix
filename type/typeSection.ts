// --- Base & Utility Interfaces ---

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CtaButton {
  label: string;
  href: string;
  variant?: string;
  icon?: string;
}

export interface ImageRef {
  src: string;
  alt: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface LegalLink {
  label: string;
  href: string;
}

export interface NavChild {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface SeoMeta {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
}

export interface TwoPartTitle {
  normal: string;
  highlighted: string;
}

// --- Header & Footer Data ---

export interface TravelTopBarData {
  address: string;
  navLinks: NavChild[];
  socialLinks: SocialLink[];
  phone: string;
  phoneHref: string;
  email: string;
}

export interface TravelSiteData {
  siteName: string;
  tagline: string;
  logo: {
    light: string;
  };
  TopBar: TravelTopBarData;
  copyright: string;
}

export interface TravelHeaderData {
  site: TravelSiteData;
  meta: SeoMeta;
  nav: MenuItem[];
  ctaButton: CtaButton;
}

export interface FooterColumn {
  title: string;
  links: NavChild[];
}

export interface TravelFooterNewsletter {
  title: string;
  desc: string;
  placeholder: string;
  buttonText: string;
}

export interface TravelFooterContact {
  title: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
}

export interface TravelFooterData {
  logoImage: string;
  desc: string;
  tagline: string;
  columns: FooterColumn[];
  newsletter: TravelFooterNewsletter;
  footerContact: TravelFooterContact;
  socialLinks: SocialLink[];
  paymentIcons: string[];
  copyright: string;
  legalLinks: LegalLink[];
  sideTagline?: string;
}

// --- Banner ---

export interface TravelBannerPolaroidImage {
  src: string;
  label: string;
}

export interface TravelBannerData {
  badge: string;
  title: string;
  highlightedTitle: string;
  titleLine2?: string;
  desc: string;
  buttons: CtaButton[];
  mainImage: ImageRef;
  caption: string;
  polaroidImages: TravelBannerPolaroidImage[];
}

// --- Destinations ---

export interface TravelDestinationItem {
  id: number;
  name: string;
  country: string;
  image: string;
  slug: string;
}

export interface TravelDestinationsData {
  badge: string;
  title: TwoPartTitle;
  desc: string;
  viewAllLink: CtaButton;
  destinations: TravelDestinationItem[];
}

// --- Packages ---

export interface TravelPackageItem {
  id: number;
  slug: string;
  title: string;
  location: string;
  image: string;
  duration: string;
  price: string;
  priceUnit: string;
  rating: string;
}

export interface TravelPackagesTitle {
  normal: string;
  highlighted: string;
  normal2?: string;
}

export interface TravelPackagesData {
  badge: string;
  title: TravelPackagesTitle;
  desc: string;
  button: CtaButton;
  packages: TravelPackageItem[];
}

// --- Services ---

export interface TravelServiceItem {
  id: string;
  badge: string;
  iconName: string;
  title: string;
  highlightedTitle: string;
  description?: string;
  image: string;
  button: CtaButton;
}

export interface TravelServicesData {
  badge: string;
  title: string;
  tagline: string;
  services: TravelServiceItem[];
}

// --- Opportunity ---

export interface TravelOpportunityStatBadge {
  number: string;
  label: string;
  subLabel?: string;
}

export interface TravelOpportunityTitle {
  normal: string;
  normal2?: string;
  highlighted: string;
  normal3?: string;
}

export interface TravelOpportunityData {
  smallCaption: string;
  sideImage: ImageRef;
  statBadge: TravelOpportunityStatBadge;
  badge: string;
  title: TravelOpportunityTitle;
  desc: string;
  subheading: string;
  bulletPoints: string[];
  avatars: string[];
  button: CtaButton;
}

// --- Cta Banner ---

export interface TravelCtaStat {
  id: number;
  number: string;
  suffix?: string;
  label: string;
  iconName: string;
}

export interface TravelCtaBannerTitle {
  normal?: string;
  highlighted: string;
  normal2?: string;
}

export interface TravelCtaBannerData {
  badge: string;
  title: TravelCtaBannerTitle;
  desc: string;
  button: CtaButton;
  bgImageUrl: string;
  stats: TravelCtaStat[];
}

// --- Testimonial ---

export interface TravelTestimonialItem {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

export interface TravelTestimonialData {
  badge: string;
  title: TwoPartTitle;
  tagline: string;
  testimonialItems: TravelTestimonialItem[];
}

// --- Blog ---

export interface TravelFeaturedBlogPost {
  id: number;
  slug: string;
  tag: string;
  image: string;
  author: string;
  comments: string;
  title: string;
  description: string;
  readMoreText: string;
}

export interface TravelBlogPost {
  id: number;
  slug: string;
  image: string;
  author: string;
  comments: string;
  title: string;
  readMoreText: string;
}

export interface TravelBlogData {
  badge: string;
  title: TwoPartTitle;
  desc: string;
  featuredPost: TravelFeaturedBlogPost;
  posts: TravelBlogPost[];
}