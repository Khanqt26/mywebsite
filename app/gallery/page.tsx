import Footer from "@/components/sections/Footer";
import PageIntro from "@/components/ui/PageIntro";
import PhotoGallery from "@/components/ui/PhotoGallery";
import { galleryPhotos } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <main className="page-shell">
      <PageIntro
        label="Gallery"
        title="Swipe through photos, certificates, and project screenshots."
        description="This gives your website a dedicated image page where people can tap, swipe, and browse multiple visuals naturally on mobile or desktop."
      />
      <section className="gallery-page-section">
        <div className="container">
          <PhotoGallery photos={galleryPhotos} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
