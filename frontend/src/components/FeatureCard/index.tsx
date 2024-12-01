import { Card, CardContent } from "@/components/ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
    <CardContent className="pt-6">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-purple-500/10 rounded-lg">
          <Icon className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default FeatureCard;