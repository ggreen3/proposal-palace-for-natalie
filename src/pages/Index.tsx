import { ProposalMessage } from "@/components/ProposalMessage";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ProposalButton } from "@/components/ProposalButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-100 to-pink-500">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <header className="text-center fade-in">
            <h1 className="romantic-text text-5xl md:text-6xl text-pink-600 mb-4">
              A Special Message
            </h1>
          </header>
          
          <ProposalMessage />
          
          <section className="fade-in">
            <h2 className="romantic-text text-3xl text-center text-pink-600 mb-8">
              Our Beautiful Memories
            </h2>
            <PhotoGallery />
          </section>
          
          <section className="py-12 fade-in">
            <ProposalButton />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;