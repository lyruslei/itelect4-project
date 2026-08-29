import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    navigate("/claims");
  };

  return (
    <div className="mx-auto max-w-md space-y-6 pt-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign In
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Enter your name to authenticate and access protected claims data.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="username-input"
              className="mb-1 block text-foreground"
            >
              Your Name
            </Label>
            <Input
              id="username-input"
              type="text"
              required
              placeholder="e.g. Juan dela Cruz"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
