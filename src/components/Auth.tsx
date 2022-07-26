import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn(
        { email },
        {
          redirectTo: window.location.origin,
        }
      );
      if (error) {
        throw error;
      }
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] sm:w-[50%] bg-dark mx-auto my-20 text-left rounded-xl p-10">
      <h1 className="mb-2 text-4xl font-bold">Sign In</h1>
      <p>This will send a magic link to your e-mail.</p>
      <div>
        <input
          className="text-xl border-2 rounded-md outline-none mt-4 py-2 px-4"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="submit"
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
          disabled={loading}
        >
          <span>{loading ? "Loading" : "Send magic link"}</span>
        </button>
      </div>
    </div>
  );
}
