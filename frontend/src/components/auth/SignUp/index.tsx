import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Github, Mail, Loader2 } from "lucide-react";
import { UserRegisterData } from "@/types";
import { signUpSchema } from "@/schemas";
import { useAuthStore } from "@/store/user.store";
import { parseRegisterFieldErrors } from "@/lib";

export default function SignupPage() {
  const [formData, setFormData] = useState<UserRegisterData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    nameError: string[];
    emailError: string[];
    passwordError: string[];
  }>({
    nameError: [],
    emailError: [],
    passwordError: [],
  });
  const { isLoading, register } = useAuthStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const { data, success, error } = await signUpSchema.safeParseAsync(
      formData
    );
    console.log(data, success, error);

    if (!success) {
      setErrors((prevError) => ({
        ...prevError,
        nameError: parseRegisterFieldErrors(error, "name"),
        emailError: parseRegisterFieldErrors(error, "email"),
        passwordError: parseRegisterFieldErrors(error, "password"),
      }));
      return;
    }

    try {
      await register(data);
    } catch (err) {
      console.log(err);
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameError: ["container"],
      }));
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
      <Card className="w-[400px] border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
            Create an account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Start creating dynamic OG images today
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button
              variant="outline"
              className="border-gray-700  hover:bg-gray-300"
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="border-gray-700  hover:bg-gray-300"
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                disabled={isLoading}
                className="border-gray-800 bg-gray-900 focus:border-purple-500 focus:ring-purple-500/20"
              />
              {errors.nameError?.map((error, index) => (
                <p key={index} className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                onChange={handleChange}
                disabled={isLoading}
                className="border-gray-800 bg-gray-900 focus:border-purple-500 focus:ring-purple-500/20"
              />
              {errors.emailError?.map((error, index) => (
                <p key={index} className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="**********"
                onChange={handleChange}
                disabled={isLoading}
                className="border-gray-800 bg-gray-900 focus:border-purple-500 focus:ring-purple-500/20"
              />
              {errors.passwordError?.map((error, index) => (
                <p key={index} className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
