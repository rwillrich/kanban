const repositoryUrlRegex =
  /https:\/\/github.com\/(?<owner>[^\/]+)\/(?<repo>[^\/]+)\/?/;

export const extractRepositoryInfoFromUrl = (
  url: string
): { owner: string; repo: string } | null => {
  const [match, owner, repo] = repositoryUrlRegex.exec(url) || [];

  if (!match) return null;

  return {
    owner,
    repo,
  };
};
