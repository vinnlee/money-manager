"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpSchemaType } from "@/types/authSchema";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toastManager } from "@/components/ui/toast";
import Spinner from "@/components/common/unicodeSpinner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const [isSignUpPending, startSignUpTransition] = useTransition();

  const onSubmit = (data: SignUpSchemaType) => {
    startSignUpTransition(async () => {
      try {
        const response = await authClient.signUp.email({
          email: data.email,
          password: data.password,
          name: data.name,
        });
        if (response.error) {
          toastManager.add({
            title: "Sign up failed",
            description: response.error.message,
            type: "error",
          });
        } else {
          toastManager.add({
            title: "Sign up successful",
            description: "Account created! Please check your email to verify.",
            type: "success",
          });
          router.push("/auth/login");
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <h1 className="font-advercase-regular text-center text-2xl tracking-tight">
          Create your account
        </h1>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field className="relative">
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <span className="absolute top-full left-0 mt-1 text-xs text-red-500">
                  {fieldState.error?.message}
                </span>
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="relative">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <span className="absolute top-full left-0 mt-1 text-xs text-red-500">
                  {fieldState.error?.message}
                </span>
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="relative">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <span className="absolute top-full left-0 mt-1 text-xs text-red-500">
                  {fieldState.error?.message}
                </span>
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field className="relative">
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                placeholder="********"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <span className="absolute top-full left-0 mt-1 text-xs text-red-500">
                  {fieldState.error?.message}
                </span>
              )}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" className="w-full" disabled={isSignUpPending}>
            {isSignUpPending ? (
              <Spinner name="diagswipe">Creating Account</Spinner>
            ) : (
              "Create Account"
            )}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link className="underline underline-offset-4" href="/auth/login">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
