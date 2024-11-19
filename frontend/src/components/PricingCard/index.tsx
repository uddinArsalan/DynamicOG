import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PricingCard = ({ title, price, features, highlighted } : any) => (
    <Card className={`${
      highlighted ? 'border-purple-500 bg-purple-500/10' : 'border-gray-800 bg-gray-900/50'
    } relative overflow-hidden`}>
      <CardContent className="pt-6">
        {highlighted && (
          <Badge className="absolute top-4 right-4 bg-purple-500">
            Popular
          </Badge>
        )}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="mb-6">
          <span className="text-3xl font-bold text-white">${price}</span>
          <span className="text-gray-400">/month</span>
        </div>
        <ul className="space-y-3">
          {features.map((feature : string, index : number) => (
            <li key={index} className="flex items-center text-gray-300">
              <CheckCircle2 className="w-5 h-5 mr-2 text-purple-400" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className={`w-full mt-6 ${
          highlighted ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
        }`}>
          Get Started
        </Button>
      </CardContent>
    </Card>
  );

  export default PricingCard