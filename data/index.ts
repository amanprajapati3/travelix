import travelData from "./siteData.json";

export type RawTravelData = typeof travelData;

export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

export type TravelHeaderData =
  typeof travelData.TravelIndustries.sections.Header.variants.TravelHeader1;
export type TravelFooterData =
  typeof travelData.TravelIndustries.sections.Footer.variants.TravelFooter1;
export type TravelBannerData =
  typeof travelData.TravelIndustries.sections.Banner.variants.TravelBanner1;
export type TravelDestinationsData =
  typeof travelData.TravelIndustries.sections.Destinations.variants.TravelDestinations1;
export type TravelPackagesData =
  typeof travelData.TravelIndustries.sections.Packages.variants.TravelPackages1;
export type TravelServicesData =
  typeof travelData.TravelIndustries.sections.Services.variants.TravelServices1;
export type TravelOpportunityData =
  typeof travelData.TravelIndustries.sections.Opportunity.variants.TravelOpportunity1;
export type TravelCtaBannerData =
  typeof travelData.TravelIndustries.sections.CtaBanner.variants.TravelCtaBanner1;
export type TravelTestimonialData =
  typeof travelData.TravelIndustries.sections.Testimonial.variants.TravelTestimonial1;
export type TravelBlogData =
  typeof travelData.TravelIndustries.sections.Blog.variants.TravelBlog1;

export type TravelDestinationItem =
  TravelDestinationsData["destinations"][number];
export type TravelPackageItem = TravelPackagesData["packages"][number];
export type TravelServiceItem = TravelServicesData["services"][number];
export type TravelOpportunityBullet =
  TravelOpportunityData["bulletPoints"][number];
export type TravelCtaStat = TravelCtaBannerData["stats"][number];
export type TravelTestimonialItem =
  TravelTestimonialData["testimonialItems"][number];
export type TravelBlogPost = TravelBlogData["posts"][number];
export type TravelFeaturedBlogPost = TravelBlogData["featuredPost"];
export type TravelFooterColumn = TravelFooterData["columns"][number];
export type TravelFooterLink = TravelFooterColumn["links"][number];

const sec = travelData.TravelIndustries.sections;

export const site = {
  header: sec.Header.variants.TravelHeader1,
  footer: sec.Footer.variants.TravelFooter1,
  banner: sec.Banner.variants.TravelBanner1,
  destinations: sec.Destinations.variants.TravelDestinations1,
  packages: sec.Packages.variants.TravelPackages1,
  services: sec.Services.variants.TravelServices1,
  opportunity: sec.Opportunity.variants.TravelOpportunity1,
  ctaBanner: sec.CtaBanner.variants.TravelCtaBanner1,
  testimonial: sec.Testimonial.variants.TravelTestimonial1,
  blog: sec.Blog.variants.TravelBlog1,
};

const destinationItems = sec.Destinations.variants.TravelDestinations1
  .destinations as TravelDestinationItem[];

const packageItems = sec.Packages.variants.TravelPackages1
  .packages as TravelPackageItem[];

const serviceItems = sec.Services.variants.TravelServices1
  .services as TravelServiceItem[];

const blogPosts = sec.Blog.variants.TravelBlog1.posts as TravelBlogPost[];

export function getDestinationBySlug(
  slug: string,
): TravelDestinationItem | null {
  const cleanSlug = slug.replace(/^destination\//, "");
  return (
    destinationItems.find(
      (destination) =>
        destination.slug === cleanSlug || destination.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getDestinationSlugs(): TravelDestinationItem[] {
  return destinationItems;
}

export function getPackageBySlug(slug: string): TravelPackageItem | null {
  return packageItems.find((pkg) => pkg.slug === slug) || null;
}

export function getPackageSlugs(): TravelPackageItem[] {
  return packageItems;
}

export function getServiceById(id: string): TravelServiceItem | null {
  return serviceItems.find((service) => service.id === id) || null;
}

export function getServiceIds(): TravelServiceItem[] {
  return serviceItems;
}

export function getBlogPostBySlug(slug: string): TravelBlogPost | null {
  const cleanSlug = slug.replace(/^blog\//, "");
  return (
    blogPosts.find(
      (post) => post.slug === cleanSlug || post.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getBlogPostSlugs(): TravelBlogPost[] {
  return blogPosts;
}

export function getFeaturedBlogPost(): TravelFeaturedBlogPost {
  return sec.Blog.variants.TravelBlog1.featuredPost as TravelFeaturedBlogPost;
}

export default travelData;