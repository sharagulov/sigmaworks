import Link from "next/link";

export default function About() {
  return (
    <div className="w-screen">
      <div className="flex h-screen justify-center">
        <div className="content-center">
          <span className="text-xl">Страница в разработке.</span>
          <Link className="text-accent text-xl hover:text-accent-hover" href="/"> Назад</Link>
        </div>
      </div>

    </div>
  );
}
