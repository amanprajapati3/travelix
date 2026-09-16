import Banner from "../../homelayout/Banner"
import BlogSection from "../../homelayout/BlogSection"
import Destination from "../../homelayout/Destination"
import ExploreSection from "../../homelayout/ExploreSection"
import PackageSection from "../../homelayout/PackageSection"
import ServiceSection from "../../homelayout/ServiceSection"
import TestimonialSection from "../../homelayout/TesitmonialSection"
import CtaBanner from "../../shared/CtaBanner"
import Stats from "../../shared/Stats"

export default function(){
    return(
        <>
        <Banner/>
        <Destination/>
        <PackageSection/>
        <ServiceSection/>
        <ExploreSection/>
        <CtaBanner/>
        <Stats/>
        <TestimonialSection/>
        <BlogSection/>
        </>
    )
}