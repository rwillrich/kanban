import Link from "next/link";
import { Repository } from "../types/repository";

export type KanbanProps = {
  repository: Repository
}

export default function Kanban(
  { repository }: KanbanProps
) {
  return (
    <main>
      <Link href="/">Back</Link>
      <h1>{repository.name}</h1>
      <p>{repository.description}</p>
    </main>
  );
}
