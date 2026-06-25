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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
    role: "user",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () =>
    setIsVisible((prev) => !prev);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSignup = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: formData.image,
      role: formData.role,
    });

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        image: formData.image,
        role: formData.role,
      }),
    });

    router.push("/login");
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  const handleGoogle = async () => {
    try {
      setIsLoading(true);

      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-200 from-zinc-100 via-white to-zinc-200 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 px-4 py-10">

      <Card className="w-full max-w-lg p-8 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            Join AIVerse and start your journey 🚀
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >
          {/* Name */}
          <TextField isRequired>
            <Label>Full Name</Label>

            <InputGroup className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <Person size={16} />

              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </InputGroup>
          </TextField>

          {/* Email */}
          <TextField isRequired>
            <Label>Email</Label>

            <InputGroup className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <At size={16} />

              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </InputGroup>
          </TextField>

          {/* Password */}
          <TextField isRequired>
            <Label>Password</Label>

            <InputGroup className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <ShieldKeyhole size={16} />

              <Input
                name="password"
                type={isVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlash size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </InputGroup>
          </TextField>

          {/* Profile Photo */}
          <TextField>
            <Label>Profile Photo URL</Label>

            <InputGroup className="border rounded-xl px-3 py-2">
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
              />
            </InputGroup>
          </TextField>

          {/* Preview */}
          {formData.image && (
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.image}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />
            </div>
          )}

          {/* Role */}
          <div>
            <Label>Choose Role</Label>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    role: "user",
                  }))
                }
                className={`py-3 rounded-xl border font-medium ${
                  formData.role === "user"
                    ? "bg-blue-600 text-white border-blue-600"
                    : ""
                }`}
              >
                👤 User
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    role: "creator",
                  }))
                }
                className={`py-3 rounded-xl border font-medium ${
                  formData.role === "creator"
                    ? "bg-purple-600 text-white border-purple-600"
                    : ""
                }`}
              >
                🎨 Creator
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full h-12 bg-blue-600 text-white rounded-xl"
          >
            Create Account
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-300" />
            <span className="text-xs">OR</span>
            <div className="flex-1 h-px bg-zinc-300" />
          </div>

          {/* Google */}
          <Button
            type="button"
            onClick={handleGoogle}
            isLoading={isLoading}
            className="w-full h-12 border rounded-xl"
          >
            <div className="flex items-center gap-2">
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Continue with Google
            </div>
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-semibold"
            >
              Sign In
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}