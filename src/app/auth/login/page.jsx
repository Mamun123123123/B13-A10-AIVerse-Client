"use client";

import { useState } from "react";
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

import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible((p) => !p);

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn.email({
        email,
        password,
        callbackURL: "/",
      });
    } catch (err) {
      console.log(err);
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">

      <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

        
        <div className="text-center pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your credentials to access your account
          </p>
        </div>

     
        <form onSubmit={handleSignin} className="flex flex-col gap-5">

          <TextField isRequired>
            <Label>Email Address</Label>
            <InputGroup className="flex items-center gap-2 border rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900">
              <At size={16} className="text-zinc-400" />
              <Input
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
            </InputGroup>
          </TextField>

          
          <TextField isRequired>
            <Label>Password</Label>
            <InputGroup className="flex items-center gap-2 border rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900">

              <ShieldKeyhole size={16} className="text-zinc-400" />

              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none"
              />

              <button
                type="button"
                onClick={toggleVisibility}
                className="text-zinc-400 hover:text-zinc-600"
              >
                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>

            </InputGroup>
          </TextField>

          
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full h-12 rounded-xl font-semibold bg-blue-600 text-white"
          >
            Sign In
          </Button>

         
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-500">OR</span>
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
          </div>

          
          <Button
            onClick={handleGoogle}
            isLoading={isLoading}
            className="w-full h-12 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-2"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
              Continue with Google
            </span>
          </Button>

         
          <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400">
            New to HireLoop?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-blue-600 dark:text-blue-400"
            >
              Create an account
            </Link>
          </div>

        </form>
      </Card>
    </div>
  );
}