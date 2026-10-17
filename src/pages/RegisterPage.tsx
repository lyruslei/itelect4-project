import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { registerUser, loginUser } from "../api/client";
import { registerSchema, type RegisterFormValues } from "../schemas/authSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RegisterPage() {
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (values: RegisterFormValues) => {
      await registerUser(values);
      return loginUser({ email: values.email, password: values.password });
    },
    onSuccess: (reply) => {
      setSession(reply.token, reply.user.name);
      navigate("/items");
    },
  });

  const onSubmit = (values: RegisterFormValues): void => {
    registerMutation.mutate(values);
  };

  return (
    <div className="mx-auto max-w-md space-y-6 pt-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create an Account
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Sign up to report and manage lost and found items on campus.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="register-name" className="mb-1 block text-foreground">
              Name
            </Label>
            <Input
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Juan dela Cruz"
              aria-invalid={errors.name ? true : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="register-email" className="mb-1 block text-foreground">
              Email
            </Label>
            <Input
              id="register-email"
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
            <Label htmlFor="register-password" className="mb-1 block text-foreground">
              Password
            </Label>
            <Input
              id="register-password"
              type="password"
              autoComplete="new-password"
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
            disabled={registerMutation.isPending}
            className="w-full cursor-pointer"
          >
            {registerMutation.isPending ? "Creating account..." : "Register"}
          </Button>

          {registerMutation.isError && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
              {registerMutation.error.message}
            </p>
          )}

          <div className="pt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
