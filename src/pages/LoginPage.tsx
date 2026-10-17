import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { loginUser } from "../api/client";
import { loginSchema, type LoginFormValues } from "../schemas/authSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const logIn = useMutation({
    mutationFn: loginUser,
    onSuccess: (reply) => {
      setSession(reply.token, reply.user.name);
      navigate("/items");
    },
  });

  const onSubmit = (values: LoginFormValues): void => {
    logIn.mutate(values);
  };

  return (
    <div className="mx-auto max-w-md space-y-6 pt-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign In
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Enter your email and password to access your account and reported items.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="login-email" className="mb-1 block text-foreground">
              Email
            </Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="e.g. user@example.com"
              aria-invalid={errors.email ? true : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="login-password" className="mb-1 block text-foreground">
              Password
            </Label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={errors.password ? true : undefined}
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={logIn.isPending}
            className="w-full cursor-pointer"
          >
            {logIn.isPending ? "Signing in..." : "Log In"}
          </Button>

          {logIn.isError && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
              {logIn.error.message}
            </p>
          )}

          <div className="pt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              No account yet? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
