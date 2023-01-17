import Head from "next/head";
import { Inter } from "@next/font/google";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Prompt from "../components/Prompt";
import { Repository } from "../types/repository";
import Result from "../components/Kanban";
import { parseSingleParam } from "../helpers/parseSingleParam";
import { extractRepositoryInfoFromUrl } from "../helpers/extractRepositoryInfroFromUrl";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });

type HomeProps =
  | { type: "prompt"; url: string | null }
  | { type: "result"; repository: Repository };

export const getServerSideProps: GetServerSideProps<
  HomeProps,
  { url: string }
> = async (context) => {
  const url = parseSingleParam(context.query.url);

  if (!url) return { props: { type: "prompt", url } };

  const repositoryInfo = extractRepositoryInfoFromUrl(url);

  if (!repositoryInfo) return { props: { type: "prompt", url } };

  const response = await fetch(
    `https://api.github.com/repos/${repositoryInfo.owner}/${repositoryInfo.repo}`
  );

  if (!response.ok) {
    return {
      props: {
        type: "prompt",
        url,
      },
    };
  }

  const repository = (await response.json()) as Repository

  return {
    props: {
      type: "result",
      repository
    },
  };
};

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {

  return (
    <>
      <Head>
        <title>CodeSandbox Kanban</title>
        <meta name="description" content="CodeSandbox Kanban" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.variable}>
        {props.type === "prompt" && (
          <Prompt url={props.url} />
        )}
        {props.type === "result" && (
          <Result repository={props.repository} />
        )}
      </main>
    </>
  );
}
