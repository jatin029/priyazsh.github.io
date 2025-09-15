import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="md:w-[500px] md:mx-auto mx-auto mt-10 text-white p-4">
      {/* Inline Image, Title, and Username */}
      <div className="flex items-start mb-6">
        <div className="rounded-full overflow-hidden w-20 h-20">
          <Image
            alt="Priyansh Prajapat"
            src={"/oyepriyansh.webp"}
            width={128}
            height={128}
            objectFit="cover"
          />
        </div>

        <div className="ml-4">
          <h1 className="text-3xl font-bold mb-1">Priyansh Prajapat</h1>
          <p className="text-gray-400">@oyepriyansh</p>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-gray-200 text-lg">
        I'm Priyansh, 21 year old self taught developer from India, I enjoy
        programming and exploring technology.
      </p>

      <p className="mb-6">
        building stuff using <span>Javascript</span>, <span>Java</span> &{" "}
        <span>NextJS</span>
      </p>

      {/* Links */}
      <div className="flex space-x-4 mb-6">
        <Link href={"https://github.com/oyepriyansh"} target="_blank">
          <button>Github</button>
        </Link>
        <Link href={"https://x.com/oyepriyansh"} target="_blank">
          <button>X</button>{" "}
        </Link>
        <Link href={"https://linkedin.com/in/oyepriyansh"} target="_blank">
          <button>LinkedIn</button>{" "}
        </Link>
        <Link href={"https://instagram.com/oyepriyansh"} target="_blank">
          <button>Instagram</button>
        </Link>
      </div>

      {/* Projects */}
      <div className="projects">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>

        <div className="isasoftware mb-4">
          <h3 className="text-lg font-medium">is-a.software</h3>
          <p>
            a subdomain service for developers to use in their projects built
            with Javascript and GitHub Actions
          </p>
          <Link href={"https://github.com/is-a-software/is-a-software"}>
            Source
          </Link>
          <br />
          <Link href={"https://is-a.software"}>Visit is-a.software</Link>
        </div>

        <div className="devprofiles mb-4">
          <h3 className="text-lg font-medium">DevProfiles</h3>
          <p>
            a platform to list your developer profile and showcase your skills
          </p>
          <p>Javascript</p>
          <Link href={"https://github.com/oyepriyansh/DevProfiles"}>
            Source
          </Link>
          <br />
          <Link href={"https://devprofiles.is-a.software"}>
            Visit DevProfiles
          </Link>
        </div>

        {/* <div>
          <a href={"https://amazon.com"}>Amazon Clone</a>
        </div> */}
      </div>
    </div>
  );
}
