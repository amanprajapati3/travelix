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
  type?: string;
  region?: string;
  tags?: string[];
}

export interface TravelDestinationsData {
  banner?: {
    title: string;
    highlightedTitle?: string;
    backgroundImage: string;
    breadcrumbItems: BreadcrumbItem[];
  };
  badge: string;
  title: TwoPartTitle;
  desc: string;
  viewAllLink: CtaButton;
  searchFilter?: {
    destinationTypes: string[];
    regions: string[];
  };
  domesticDestinations: TravelDestinationItem[];
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
  reviews: number;
  destination: string;
  tourType: string;
  durationGroup: string;
  description: string;
}

export interface TravelTourItineraryItem {
  day: string;
  title: string;
  description: string;
}

export interface TravelTourFaqItem {
  question: string;
  answer: string;
}

export interface TravelTourDetails {
  overview: string;
  overviewDescription: string;
  difficulty: string;
  highlights: string[];
  itinerary: TravelTourItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  faqs: TravelTourFaqItem[];
}

export interface TravelPackagesTitle {
  normal: string;
  highlighted: string;
  normal2?: string;
}

export interface TravelPackagesData {
  banner?: {
    title: string;
    highlightedTitle?: string;
    backgroundImage: string;
    breadcrumbItems: BreadcrumbItem[];
  };
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
  detail: {
    eyebrow: string;
    intro: string;
    features: { icon: string; title: string; text: string }[];
    overview: string;
    overviewExtra: string;
  };
  button: CtaButton;
}

export interface TravelServicesData {
  banner?: {
    title: string;
    highlightedTitle?: string;
    backgroundImage: string;
    breadcrumbItems: BreadcrumbItem[];
  };
  badge: string;
  title: string;
  tagline: string;
  services: TravelServiceItem[];
}

// --- Team ---

export interface TravelTeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  image: string;
  image2:string;
  bio: string;
  experience: string;
  email: string;
  telephone: string;
  fax: string;
  social: {
    label: string;
    href: string;
  }[];
  button: CtaButton;
}

export interface TravelTeamData {
  banner?: {
    title: string;
    highlightedTitle?: string;
    backgroundImage: string;
    breadcrumbItems: BreadcrumbItem[];
  };
  badge: string;
  title: string;
  desc: string;
  members: TravelTeamMember[];
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
  banner?: {
    title: string;
    highlightedTitle?: string;
    backgroundImage: string;
    breadcrumbItems: BreadcrumbItem[];
  };
}

// --- Blog ---

export interface TravelFeaturedBlogPost {
  id: number;
  slug: string;
  tag: string;
  date: string;
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
  date: string;
  image: string;
  author: string;
  comments: string;
  title: string;
  readMoreText: string;
}

export interface TravelBlogDetail {
  slug: string;
  intro: string;
  sections: { number: string; title: string; body: string }[];
  quote: string;
}

export interface TravelBlogData {
  banner?: {
    title: string;
    highlightedTitle?: string;
    backgroundImage: string;
    breadcrumbItems: BreadcrumbItem[];
  };
  badge: string;
  title: TwoPartTitle;
  desc: string;
  featuredPost: TravelFeaturedBlogPost;
  posts: TravelBlogPost[];
  blogDetails: TravelBlogDetail[];
}

export interface ChooseBreadcrumbItem {
  label: string;
  href?: string;
}

export interface ChooseItem {
  id: number;
  icon: string; // Icon identifier (e.g., "Calendar", "Hotel", "Compass", "Headphones")
  title: string;
  description: string;
}

export interface ChooseVariant {
  banner: {
    title: string;
    highlightedTitle?: string;
    backgroundImage: string;
    breadcrumbItems: ChooseBreadcrumbItem[];
  };
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  centerImage: string;
  brushFrame: string;
  items: ChooseItem[];
}

export interface ChooseData {
  variants: {
    [key: string]: ChooseVariant;
  };
}
export interface TravelProcessItem {
  id: number;
  stepNumber: string;
  icon: string;
  title: string;
  description: string;
}

export interface TravelProcessData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  steps: TravelProcessItem[];
}
export interface MissionBreadcrumbItem {
  label: string;
  href?: string;
}

export interface MissionFeature {
  id: number;
  icon: string;
  title: string;
}

export interface MissionSectionData {
  badge: string;
  title: {
    normal: string;
    highlighted: string;
  };
  description: string;
  image: string;
  features: MissionFeature[];
}

export interface TravelMissionData {
  banner: {
    title: string;
    highlightedTitle?: string;
    backgroundImage: string;
    breadcrumbItems: MissionBreadcrumbItem[];
  };
  missionSection: MissionSectionData;
  visionSection: MissionSectionData;
}
export interface AwardItem {
  id: number;
  badgeTitle: string;
  title: string;
  description: string;
  image: string;
  tag?: string;
}

export interface CertificationItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface TravelAwardsData {
  banner: {
    title: string;
    highlightedTitle?: string;
    backgroundImage: string;
    breadcrumbItems: BreadcrumbItem[];
  };
  achievementsSection: {
    badge: string;
    title: {
      normal: string;
      highlighted: string;
    };
    description: string;
    items: AwardItem[];
  };
  certificationsSection: {
    badge: string;
    title: {
      normal: string;
      highlighted: string;
    };
    description: string;
    items: CertificationItem[];
  };
}

// Add these types to your @/type/typeSection file

export interface ContactInfoItem {
  id: string | number;
  icon: string;
  title: string;
  value: string;
  subtext?: string;
}

export interface ContactFeatureItem {
  id: string | number;
  icon: string;
  title: string;
  description: string;
}

export interface TravelContactData {
  banner: {
    title: string;
    highlightedTitle: string;
    backgroundImage: string;
    breadcrumbItems: { label: string; href?: string }[];
  };
  header: {
    title: { normal: string; highlighted: string };
    subtitle: string;
  };
  infoItems: ContactInfoItem[];
  scriptTexts: {
    travelMore: string;
    planAdventure: string;
    exploreWorld: string;
  };
  form: {
    title: { normal: string; highlighted: string };
    subtitle: string;
    buttonLabel: string;
    subjects: string[];
  };
  features: ContactFeatureItem[];
  images: {
    tiltImage1: string;
    tiltImage2: string;
    planeLoop: string;
    mountainTransparent: string;
    mountainOnly: string;
  };
}
export interface FaqLeftFeature {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TravelFaqData {
  banner: {
    title: string;
    highlightedTitle: string;
    backgroundImage: string;
    breadcrumbItems: { label: string; href?: string }[];
  };
  header: {
    eyebrow: string;
    title: { normal: string; highlighted: string };
    subtitle: string;
  };
  speechBubbles: {
    leftText: string;
    rightText: string;
  };
  leftFeatures: FaqLeftFeature[];
  cardImage: {
    src: string;
    tagline: string;
  };
  faqs: FaqItem[];
  supportBar: {
    eyebrow: string;
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    chatText: string;
    chatSubtext: string;
    buttonText: string;
  }
}
export interface PartnerItem {
  id: number;
  name: string;
  category?: string;
  logo: string;
}

export interface PartnerFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface TravelPartnersData {
  banner: {
    title: string;
    highlightedTitle: string;
    backgroundImage: string;
    breadcrumbItems: { label: string; href?: string }[];
  };
  header: {
    eyebrow: string;
    title: { normal: string; highlighted: string };
    subtitle: string;
  };
  scriptTexts: {
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
  partners: PartnerItem[];
  features: PartnerFeature[];
  images: {
    partnersMap: string;
    citySilhouette: string;
  };
}
export interface GalleryImageItem {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryVideoItem {
  id: number;
  thumbnail: string;
  videoSrc: string;
  title?: string;
  duration?: string;
}

export interface GallerySectionHeading {
  eyebrow: string;
  title: {
    normal: string;
    highlighted: string;
  };
  subtitle: string;
}

export interface TravelGalleryData {
  banner: {
    title: string;
    highlightedTitle: string;
    backgroundImage: string;
    breadcrumbItems: { label: string; href?: string }[];
  };
  imageSection: GallerySectionHeading & {
    images: GalleryImageItem[];
  };
  videoSection: GallerySectionHeading & {
    videos: GalleryVideoItem[];
  };
}

export interface LegalSectionItem {
  id: string;
  number?: string;
  heading: string;
  description?: string;
  bullets?: string[];
  footerText?: string;
  contactEmail?: string;
}

export interface LegalPageData {
  banner: {
    title: string;
    highlightedTitle: string;
    backgroundImage: string;
    breadcrumbItems: { label: string; href?: string }[];
  };
  title: string;
  lastUpdated: string;
  sections: LegalSectionItem[];
}

export interface EnquiryFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface EnquiryContact {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
}

export interface TravelEnquiryData {
  banner: {
    title: string;
    highlightedTitle: string;
    backgroundImage: string;
    breadcrumbItems: { label: string; href?: string }[];
  };
  formHeader: {
    eyebrow: string;
    title: { normal: string; highlighted: string };
    subtitle: string;
  };
  whyEnquire: {
    title: string;
    items: EnquiryFeature[];
  };
  needHelp: {
    title: string;
    subtitle: string;
    contacts: EnquiryContact[];
  };
}
export interface TravelNotFoundData {
  eyebrow: string;
  code: string;
  title: {
    normal: string;
    highlighted: string;
  };
  description: string;
  button: {
    label: string;
    href: string;
  };
  backgroundImage: string;
}

export interface TravelSitemapData {
  banner: {
    title: string;
    highlightedTitle?: string;
    backgroundImage: string;
    breadcrumbItems: BreadcrumbItem[];
  };
  eyebrow: string;
  title: TwoPartTitle;
  description: string;
  groups: {
    title: string;
    icon: string;
    links: SitemapLink[];
  }[];
}

export interface SitemapLink {
  label: string;
  href: string;
}