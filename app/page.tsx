// import Header from "./components/header/page";
// import Footer from "./components/footer/page";
// import HeroSection from "./components/herosection/page";


// export default function Home() {
//   return (
//     <div className="w-full min-h-screen bg-yellow-100">
//       <Header  />
//       <HeroSection />
//       <Footer />
//     </div>
//   );
// }

// app/page.tsx

import Header from "./components/header/page";
import Footer from "./components/footer/page";
import HeroSection from "./components/herosection/page";
import RenderWarning from "./components/RenderWarning";

export default function Home() {
  return (
    // Use a very light gray for the page background for subtle contrast
    <div className="w-full min-h-screen bg-gray-50">
      <RenderWarning />
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
}