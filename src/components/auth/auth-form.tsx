"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "cn";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type AuthMode = "signin" | "signup";

export type TAuthFormData = {
  name?: string;
  email: string;
  password: string;
  remember?: boolean;
  role?: UserRole;
};

export type UserRole = "seeker" | "recruiter" | "admin";

const roleOptions: { value: UserRole; label: string; hint: string }[] = [
  { value: "seeker", label: "Job Seeker", hint: "Find and apply to jobs" },
  { value: "recruiter", label: "Recruiter", hint: "Post jobs and hire" },
  { value: "admin", label: "Admin", hint: "Manage the platform" },
];

type AuthFormProps = {
  mode: AuthMode;
  /** Return an error message string to show it inline, or nothing on success */
  onSubmit?: (data: TAuthFormData) => Promise<string | void>;
};



// Shared shell: dark backdrop + centered card, matching the site style
function AuthShell({ children }: { children: React.ReactNode }) {  // bujte hobe ei section ta
  return (
    <main className="relative flex min-h-[calc(100vh-68px)] items-center justify-center overflow-hidden bg-[#010103] px-4 py-16">
      {/* Purple glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#5C53FE]/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#5C53FE]/15 blur-[140px]"
      />
      <div className="relative w-full max-w-md">{children}</div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.96.75 12 .75 7.62.75 3.84 3.27 2.04 6.9l3.66 2.84C6.54 6.98 9 5.04 12 5.04z"
      />
      <path
        fill="#4285F4"
        d="M23.25 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58l3.72 2.88c2.17-2.01 3.46-4.98 3.46-8.7z"
      />
      <path
        fill="#FBBC05"
        d="M5.7 14.26a7.04 7.04 0 0 1 0-4.52L2.04 6.9a11.26 11.26 0 0 0 0 10.2l3.66-2.84z"
      />
      <path
        fill="#34A853"
        d="M12 23.25c3.04 0 5.58-1 7.44-2.72l-3.72-2.88c-1.03.69-2.35 1.1-3.72 1.1-3 0-5.46-1.94-6.3-4.49l-3.66 2.84c1.8 3.63 5.58 6.15 9.96 6.15z"
      />
    </svg>
  );
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isSignIn = mode === "signin";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    remember: true,
    role: "seeker" as UserRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Collects all form data — ready to be wired to the auth API later
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: TAuthFormData = isSignIn
      ? {
          email: formData.email,
          password: formData.password,
          remember: formData.remember,
        }
      : { name: formData.name, email: formData.email, password: formData.password, role: formData.role };

    setError(null);
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        // pages can pass their own handler (e.g. Better Auth integration);
        // returning a string shows it as an inline error
        const message = await onSubmit(data);
        if (typeof message === "string" && message) setError(message);
      } else {
        console.log(`[${mode}] form submitted:`, data);
      }
    } catch (err) {
      console.error(`[${mode}] submit failed:`, err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <AuthShell>
      <div className="flex flex-col items-center gap-6">
        <Link href="/">
          <Image src={logo} alt="HireLoop" className="h-9 w-auto" priority />
        </Link>

        <div className="w-full rounded-2xl border border-white/10 bg-[#141418] p-6 shadow-2xl shadow-black/60 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white">
              {isSignIn ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1.5 text-sm text-white/60">
              {isSignIn
                ? "Sign in to continue your job search."
                : "Start finding your dream job today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isSignIn && (
              <>
                {/* Account type selector */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm text-white/80">Account type</Label>
                  <div
                    role="radiogroup"
                    aria-label="Account type"
                    className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                  >
                    {roleOptions.map((option) => {
                      const isSelected = formData.role === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, role: option.value }))
                          }
                          className={cn(
                            "flex flex-col items-start gap-0.5 rounded-xl border px-3 py-2.5 text-left transition-colors",
                            isSelected
                              ? "border-[#5C53FE] bg-[#5C53FE]/15 text-white"
                              : "border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:text-white/80"
                          )}
                        >
                          <span className="text-sm font-medium">
                            {option.label}
                          </span>
                          <span className="text-xs text-white/50">
                            {option.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name" className="text-sm text-white/80">
                    Full name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Alex Sterling"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-11 border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40"
                  />
                </div>
              </>
            )}
        

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-sm text-white/80">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="h-11 border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm text-white/80">
                  Password
                </Label>
                {isSignIn && (
                  <a
                    href="#"
                    className="text-sm text-[#645BFF] hover:text-[#7B73FF]"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11 border-white/10 bg-white/5 px-4 pr-11 text-white placeholder:text-white/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {isSignIn && (
              <label className="flex items-center gap-2 text-sm text-white/70">
                <Checkbox
                  name="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, remember: checked === true }))
                  }
                  className="size-4"
                />
                Remember me
              </label>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-11 w-full bg-[#5C53FE] text-base font-medium text-white hover:bg-[#4B43F0] disabled:opacity-60"
            >
              {isSubmitting
                ? isSignIn
                  ? "Signing in…"
                  : "Creating account…"
                : isSignIn
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-xs tracking-wider text-white/40 uppercase">
              or continue with
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <Button
            variant="outline"
            className="h-11 w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          {/* Toggle between the two pages */}
          <p className="mt-6 text-center text-sm text-white/60">
            {isSignIn ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-[#645BFF] hover:text-[#7B73FF]"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-[#645BFF] hover:text-[#7B73FF]"
                >
                  Sign In
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
