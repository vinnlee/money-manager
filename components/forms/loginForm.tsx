"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "@/types/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toastManager } from "@/components/ui/toast";
import Spinner from "@/components/common/unicodeSpinner";
import { authClient } from "@/lib/auth-client";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [isLoginPending, startLoginTransition] = useTransition();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = (data: LoginSchemaType) => {
    startLoginTransition(async () => {
      try {
        const response = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });
        if (response.error) {
          if (response.error.code === "EMAIL_NOT_VERIFIED") {
            toastManager.add({
              title: "Email verification required",
              description: "Please verify your email address before logging in.",
              type: "warning",
              actionProps: {
                children: "Resend Email",
                onClick: async () => {
                  toastManager.add({
                    title: "Sending email...",
                    type: "loading",
                  });
                  const res = await authClient.sendVerificationEmail({
                    email: data.email,
                    callbackURL: "/auth/login",
                  });
                  if (res.error) {
                    toastManager.add({
                      title: "Failed to send email",
                      description: res.error.message,
                      type: "error",
                    });
                  } else {
                    toastManager.add({
                      title: "Verification email sent",
                      description: "Please check your inbox.",
                      type: "success",
                    });
                  }
                },
              },
            });
          } else {
            toastManager.add({
              title: "Login failed",
              description: response.error.message,
              type: "error",
            });
          }
        } else {
          router.push("/dashboard");
          toastManager.add({
            title: "Login successful",
            description: "Welcome back!",
            type: "success",
          });
          form.reset();
        }
      } catch (error) {
        console.log(error);
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
        <h1 className="font-advercase-regular text-center text-2xl">Login to your account</h1>

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
              <div className="flex w-full items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
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
        <Field>
          <Button disabled={isLoginPending} type="submit" className="w-full">
            {isLoginPending ? <Spinner name="diagswipe">Logging in</Spinner> : "Login"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link className="underline underline-offset-4" href="/auth/sign-up">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
