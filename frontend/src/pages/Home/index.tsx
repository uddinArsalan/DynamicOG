import PricingCard from "@/components/PricingCard";
import FeatureCard from "@/components/FeatureCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import { features } from "@/data";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";

const Home = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
            ✨ Now with AI-powered optimization
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
            Transform Your Social Presence with Dynamic OG Images
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Create engaging social media previews in seconds. Customize
            templates, generate meta tags, and boost your content's visibility
            across all platforms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to={isLoggedIn ? "dashboard" : "login"}>
              <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg">
                Start Creating for Free
              </Button>
            </Link>
            <Link to="https://github.com/uddinArsalan/DynamicOG">
              <Button
                variant="outline"
                className="border-gray-700 hover:border-purple-500 px-8 py-6 text-lg"
              >
                <Github className="mr-2 h-5 w-5" />
                Star on GitHub
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powerful features to help you create and manage your OG images
              with ease
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">See It in Action</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Watch how easy it is to create and customize your OG images
            </p>
          </div>
          <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
            <CardContent className="p-8">
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-pink-500/20" />
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Watch Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the plan that best fits your needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              price="0"
              features={[
                "100 OG images per month",
                "5 custom templates",
                "Basic analytics",
                "Community support",
              ]}
            />
            <PricingCard
              title="Pro"
              price="29"
              highlighted={true}
              features={[
                "Unlimited OG images",
                "Unlimited custom templates",
                "Advanced analytics",
                "Priority support",
                "API access",
              ]}
            />
            <PricingCard
              title="Enterprise"
              price="99"
              features={[
                "Everything in Pro",
                "Custom domain",
                "SSO integration",
                "24/7 support",
                "SLA guarantee",
              ]}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
