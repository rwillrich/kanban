import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback, useRef } from "react";

export type PromptProps = {
  url: string | null
}

export default function Prompt(
  { url }: PromptProps
) {
  const router = useRouter();
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();

      const url = urlInputRef.current?.value

      router.push({
        pathname: "/",
        query: url ? { url } : {},
      });
    },
    [router]
  );

  return (
    <main>
      <div>
        <Link href="/">
          <Image
            src="/code-sandbox-logo.svg"
            alt="CodeSandbox Logo"
            width={167.86}
            height={25}
            priority
          />
        </Link>
      </div>
      <form action="/" noValidate onSubmit={handleSubmit}>
        <h1>Start by pasting the repository URL</h1>
        <input
          ref={urlInputRef}
          type="url"
          placeholder="https://"
          name="url"
          defaultValue={url || ""}
        />
        <button type="submit">Submit</button>
        {url && <p>Oops! Something went wrong. Try again.</p>}
      </form>
    </main>
  );
}
