import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiItemAdvice } from "../types/index";
import { askAi } from "../api/client";
import { aiHelperSchema, type AiHelperFormValues } from "../schemas/aiHelperSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// One entry for every value the enum can have: add a value to
// ApiItemAdvice and these stop compiling until it has a style.
const QUALITY_STYLE: Record<ApiItemAdvice["quality"], string> = {
  "complete": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  "needs-detail": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  "too-vague": "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
};

const CATEGORY_LABEL: Record<ApiItemAdvice["category"], string> = {
  "electronics": "Electronics",
  "id-card": "ID card",
  "clothing": "Clothing",
  "bag": "Bag",
  "keys": "Keys",
  "other": "Other",
};

function AiHelperPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AiHelperFormValues>({
    resolver: zodResolver(aiHelperSchema),
    // No mode: "onBlur" here: the error sits right above the button, and
    // checking on blur moves the button between press and release.
    defaultValues: { prompt: "" },
  });

  // A mutation, not a query: it runs only when the button is pressed,
  // and every press is one request from the Gemini quota.
  const advice = useMutation({
    mutationFn: askAi,
  });

  const onSubmit = (values: AiHelperFormValues): void => {
    advice.mutate(values.prompt);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">AI Report Helper</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Describe an item you lost or found, and get a suggested title and the details your report is missing.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="prompt" className="text-foreground font-bold">
              Item description
            </Label>
            <textarea
              id="prompt"
              rows={6}
              {...register("prompt")}
              aria-invalid={errors.prompt ? true : undefined}
              placeholder="What the item is, what it looks like, where and when it was lost or found..."
              className="rounded-lg border border-input bg-background p-2.5 text-sm text-foreground"
            />
            {errors.prompt && (
              <p className="text-sm text-red-600">{errors.prompt.message}</p>
            )}
          </div>

          <Button type="submit" disabled={advice.isPending} className="cursor-pointer justify-self-start">
            {advice.isPending ? "Checking..." : "Check my report"}
          </Button>
        </form>

        {/* The API's own sentence: the rate limit, the quota, or a bad
            reply -- never Google's raw error text. */}
        {advice.isError && (
          <p className="mt-4 text-sm text-red-700 dark:text-red-400">{advice.error.message}</p>
        )}
      </section>

      {advice.data && (
        <section className="grid gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-wrap gap-2">
            <span className={`rounded px-2 py-0.5 text-sm font-semibold ${QUALITY_STYLE[advice.data.quality]}`}>
              {advice.data.quality}
            </span>
            <span className="rounded bg-blue-50 px-2 py-0.5 text-sm font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              {CATEGORY_LABEL[advice.data.category]}
            </span>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Suggested title</h3>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{advice.data.suggestedTitle}</p>
          </div>

          <p className="text-gray-900 dark:text-white">{advice.data.summary}</p>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Add these details</h3>
            {/* Empty when the report is complete: say so instead of an empty list. */}
            {advice.data.missingDetails.length === 0 ? (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Nothing to add: someone could recognise the item from this report.
              </p>
            ) : (
              <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                {advice.data.missingDetails.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default AiHelperPage;
