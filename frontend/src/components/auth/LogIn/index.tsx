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
import { useAuthStore } from "@/store/user.store";
import {  UserLoginData } from "@/types";
import { loginSchema } from "@/schemas";
import { parseFieldErrors } from "@/lib";

export default function LoginPage() {
  const [formData, setFormData] = useState<UserLoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    emailError: string[];
    passwordError: string[];
  }>({
    emailError: [],
    passwordError: [],
  });
  const { isLoading, login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const { data, success, error } = await loginSchema.safeParseAsync(formData);

    if (!success) {
      setErrors((prevError) => ({
        ...prevError,
        emailError: parseFieldErrors(error, "email"),
        passwordError: parseFieldErrors(error, "password"),
      }));
      return;
    }

    try {
      await login(data);
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: ["Login failed. Please check your credentials."],
      }));
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          {/* autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off" */}
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.emailError &&
                errors.emailError.map((index, errMessage) => (
                  <p
                    key={index}
                    className="text-sm text-red-600 mt-1"
                    role="alert"
                  >
                    {errMessage}
                  </p>
                ))}
            </div>
            <div className="grid gap-2 mt-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                disabled={isLoading}
                onChange={handleChange}
              />
              {errors.passwordError &&
                errors.passwordError.map((index, errMessage) => (
                  <p
                    key={index}
                    className="text-sm text-red-600 mt-1"
                    role="alert"
                  >
                    {errMessage}
                  </p>
                ))}
            </div>
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
