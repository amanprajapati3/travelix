import travelData from "./siteData.json";
import tourDetails from "./tourDetails.json";
import type { TravelBlogDetail, TravelSitemapData, TravelTourDetails } from "@/type/typeSection";

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
export type TravelTeamData =
  typeof travelData.TravelIndustries.sections.Team.variants.TravelTeam1;
export type TravelOpportunityData =
  typeof travelData.TravelIndustries.sections.Opportunity.variants.TravelOpportunity1;
export type TravelCtaBannerData =
  typeof travelData.TravelIndustries.sections.CtaBanner.variants.TravelCtaBanner1;
export type TravelTestimonialData =
  typeof travelData.TravelIndustries.sections.Testimonial.variants.TravelTestimonial1;
export type TravelBlogData =
  typeof travelData.TravelIndustries.sections.Blog.variants.TravelBlog1;
export type TravelChooseUsData =
  typeof travelData.TravelIndustries.sections.WhyChooseUs.variants.TravelChoose1;
export type TravelProcessData =
  typeof travelData.TravelIndustries.sections.Process.variants.TravelProcess1;
export type TravelMissionData =
  typeof travelData.TravelIndustries.sections.Mission.variants.TravelMission1;
export type TravelLegalData =
  typeof travelData.TravelIndustries.sections.Legal.variants.privacyPolicy;
  export type TravelMissionFeature =
  TravelMissionData["missionSection"]["features"][number];
export type TravelNotFoundData =
  typeof travelData.TravelIndustries.sections.NotFound.variants.Travel4041;
export type TravelSitemapSectionData = TravelSitemapData;
  export type TravelAwardsData =
  typeof travelData.TravelIndustries.sections.Awards.variants.TravelAwards1;
export type TravelContactData =
  typeof travelData.TravelIndustries.sections.Contact.variants.TravelContact1;
export type TravelPartnersData =
  typeof travelData.TravelIndustries.sections.Partners.variants.TravelPartners1;
export type PartnerItem = TravelPartnersData["partners"][number];
    export type TravelGalleryData =
  typeof travelData.TravelIndustries.sections.Gallery.variants.TravelGallery1;
export type GalleryImageItem =
  TravelGalleryData["imageSection"]["images"][number];
export type GalleryVideoItem =
  TravelGalleryData["videoSection"]["videos"][number];
export type PartnerFeature = TravelPartnersData["features"][number];
  export type TravelDestinationItem =
  TravelDestinationsData["destinations"][number];
export type TravelFaqData =
  typeof travelData.TravelIndustries.sections.Faq.variants.TravelFaq1;
export type TravelEnquiryData =
  typeof travelData.TravelIndustries.sections.Enquiry.variants.TravelEnquiry1;
  export type FaqItem = TravelFaqData["faqs"][number];
export type FaqLeftFeature = TravelFaqData["leftFeatures"][number];
export type TravelPackageItem = TravelPackagesData["packages"][number];
export type TravelTourDetailsItem = TravelTourDetails;
export type TravelServiceItem = TravelServicesData["services"][number];
export type TravelTeamMember = TravelTeamData["members"][number];
export type TravelOpportunityBullet =
  TravelOpportunityData["bulletPoints"][number];
export type TravelCtaStat = TravelCtaBannerData["stats"][number];
export type TravelTestimonialItem =
  TravelTestimonialData["testimonialItems"][number];
export type TravelBlogPost = TravelBlogData["posts"][number];
export type TravelFeaturedBlogPost = TravelBlogData["featuredPost"];
export type TravelFooterColumn = TravelFooterData["columns"][number];
export type TravelFooterLink = TravelFooterColumn["links"][number];
export type TravelChooseUsItem = TravelChooseUsData["items"][number];
export type TravelProcessItem = TravelProcessData["steps"][number];
export type TravelContactFeatureItem = TravelContactData["features"][number];
const sec = travelData.TravelIndustries.sections;

export const site = {
  header: sec.Header.variants.TravelHeader1,
  footer: sec.Footer.variants.TravelFooter1,
  banner: sec.Banner.variants.TravelBanner1,
  destinations: sec.Destinations.variants.TravelDestinations1,
  packages: sec.Packages.variants.TravelPackages1,
  services: sec.Services.variants.TravelServices1,
  team: sec.Team.variants.TravelTeam1,
  opportunity: sec.Opportunity.variants.TravelOpportunity1,
  ctaBanner: sec.CtaBanner.variants.TravelCtaBanner1,
  testimonial: sec.Testimonial.variants.TravelTestimonial1,
  blog: sec.Blog.variants.TravelBlog1,
  whyChooseUs: sec.WhyChooseUs.variants.TravelChoose1,
  process: sec.Process.variants.TravelProcess1,
  mission: sec.Mission.variants.TravelMission1,
  awards: sec.Awards.variants.TravelAwards1,
  contact: sec.Contact.variants.TravelContact1,
  faq: sec.Faq.variants.TravelFaq1,
  partners: sec.Partners.variants.TravelPartners1,
  gallery: sec.Gallery.variants.TravelGallery1,privacyPolicy: sec.Legal.variants.privacyPolicy,
  termsConditions: sec.Legal.variants.termsConditions,
  refundPolicy: sec.Legal.variants.refundPolicy,
  paymentPolicy: sec.Legal.variants.paymentPolicy,
  enquiry: sec.Enquiry.variants.TravelEnquiry1,
  notFound: sec.NotFound.variants.Travel4041,
  sitemap: sec.Sitemap.variants.TravelSitemap1 as TravelSitemapData,
};

const destinationItems = sec.Destinations.variants.TravelDestinations1
  .destinations as TravelDestinationItem[];

const packageItems = sec.Packages.variants.TravelPackages1
  .packages as TravelPackageItem[];

const tourDetailItems = tourDetails as Record<string, TravelTourDetailsItem>;

const serviceItems = sec.Services.variants.TravelServices1
  .services as TravelServiceItem[];

const teamMembers = sec.Team.variants.TravelTeam1
  .members as TravelTeamMember[];

const blogPosts = sec.Blog.variants.TravelBlog1.posts as TravelBlogPost[];
const featuredBlogPost = sec.Blog.variants.TravelBlog1.featuredPost as TravelFeaturedBlogPost;
const blogDetails = sec.Blog.variants.TravelBlog1.blogDetails as TravelBlogDetail[];

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

export function getTourDetailsBySlug(slug: string): TravelTourDetailsItem | null {
  return tourDetailItems[slug] || null;
}

export function getPackageFilters() {
  return {
    destinations: [...new Set(packageItems.map((pkg) => pkg.destination))],
    tourTypes: [...new Set(packageItems.map((pkg) => pkg.tourType))],
    durations: [...new Set(packageItems.map((pkg) => pkg.durationGroup))],
  };
}

export function getServiceById(id: string): TravelServiceItem | null {
  return serviceItems.find((service) => service.id === id) || null;
}

export function getServiceIds(): TravelServiceItem[] {
  return serviceItems;
}

export function getTeamMemberBySlug(slug: string): TravelTeamMember | null {
  const cleanSlug = slug.replace(/^team\//, "");
  return (
    teamMembers.find(
      (member) => member.slug === cleanSlug || member.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getTeamMemberSlugs(): TravelTeamMember[] {
  return teamMembers;
}

export function getBlogPostBySlug(slug: string): TravelBlogPost | TravelFeaturedBlogPost | null {
  const cleanSlug = slug.replace(/^blog\//, "");
  return (
    [featuredBlogPost, ...blogPosts].find(
      (post) => post.slug === cleanSlug || post.slug.endsWith(cleanSlug),
    ) || null
  );
}

export function getBlogPostSlugs(): (TravelBlogPost | TravelFeaturedBlogPost)[] {
  return [featuredBlogPost, ...blogPosts];
}

export function getBlogDetailBySlug(slug: string): TravelBlogDetail | null {
  const cleanSlug = slug.replace(/^blog\//, "");
  return blogDetails.find((detail) => detail.slug === cleanSlug) || null;
}

export function getFeaturedBlogPost(): TravelFeaturedBlogPost {
  return sec.Blog.variants.TravelBlog1.featuredPost as TravelFeaturedBlogPost;
}

export default travelData;
