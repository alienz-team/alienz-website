"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { login, type LoginState } from "../actions";
import { btnPrimary, input, label } from "@/components/admin/ui";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  // Manual submit so a failed attempt doesn't auto-reset (and wipe) the email.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className={label}>البريد الإلكتروني</label>
        <input id="email" name="email" type="email" dir="ltr" autoComplete="username" required className={`${input} text-right`} />
      </div>
      <div>
        <label htmlFor="password" className={label}>كلمة المرور</label>
        <input id="password" name="password" type="password" dir="ltr" autoComplete="current-password" required className={`${input} text-right`} />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-300">{state.error}</p>
      )}
      <button type="submit" disabled={pending} className={`${btnPrimary} w-full py-3`}>
        {pending ? "جارٍ الدخول…" : "تسجيل الدخول"}
      </button>
    </form>
  );
}
