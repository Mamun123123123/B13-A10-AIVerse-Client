"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
} from "@heroui/react";

import {
  Eye,
  EyeSlash,
  Person,
  At,
  ShieldKeyhole,
} from "@gravity-ui/icons";

import { signUp, signIn } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("user");

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signUp.email({
        email,
        password,
        name,
        role,
      });

      setName("");
      setEmail("");
      setPassword("");
      setRole("user");

     
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 px-4 py-10">
      <Card className="w-full max-w-md sm:max-w-lg p-6 sm:p-10 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Create Account
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            Join us and start your journey 🚀
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
        
          <TextField isRequired>
            <Label>Full Name</Label>

            <InputGroup className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
              <Person size={16} />

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </InputGroup>
          </TextField>

          {/* Email */}
          <TextField isRequired>
            <Label>Email</Label>

            <InputGroup className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
              <At size={16} />

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </InputGroup>
          </TextField>

          {/* Password */}
          <TextField isRequired>
            <Label>Password</Label>

            <InputGroup className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
              <ShieldKeyhole size={16} />

              <Input
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={toggleVisibility}
                className="text-zinc-400 hover:text-zinc-600"
              >
                {isVisible ? (
                  <EyeSlash size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </InputGroup>
          </TextField>

       
          <div className="flex flex-col gap-2">
            <Label>Choose Role</Label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`py-2 rounded-xl border font-medium transition ${
                  role === "user"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                👤 User
              </button>

              <button
                type="button"
                onClick={() => setRole("creator")}
                className={`py-2 rounded-xl border font-medium transition ${
                  role === "creator"
                    ? "bg-purple-600 text-white border-purple-600"
                    : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                🎨 Creator
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Create Account
          </Button>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-500">OR</span>
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
          </div>

         
          <Button
            onClick={handleGoogle}
            isLoading={isLoading}
            className="w-full h-12 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
          >
            <div className="flex items-center gap-2">
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={20}
                height={20}
              />

              <span>Continue with Google</span>
            </div>
          </Button>

          <div className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-500 font-medium"
            >
              Sign in
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}