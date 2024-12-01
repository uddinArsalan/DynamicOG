import { Card,CardHeader,CardTitle,CardContent } from "@/components/ui/card"
const TemplatesSection = () => {
    return (
        <Card className="w-full max-w-4xl grid grid-cols-2">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(./logo.png)` }}
      ></div>
      <div className="p-6">
        <CardHeader className="flex items-center space-x-4">
          <img src='./logo.png' alt="Logo" className="h-10 w-10" />
          <CardTitle>Lorem ip</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptates odio deserunt temporibus voluptate id possimus asperiores esse optio consequatur, illo voluptas debitis.</p>
        </CardContent>
      </div>
    </Card>
    )
}

export default TemplatesSection