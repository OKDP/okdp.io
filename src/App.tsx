import Architecture from "./components/Architecure";
import Features from "./components/Features";
import { Roadmap } from "./components/Roadmap";
import SecurityCards from "./components/SecurityCards";

const cards = [
  {
    title: "Enhanced Security",
    description: "Compliance and data protection from the ground up.",
  },
  {
    title: "Safe Collaboration",
    description: "Verified processes for secure, open development.",
  },
  {
    title: "Secure Innovation",
    description:
      "Secure technological advances, full integration with Kubernetes.",
  },
];

const features = [
  {
    title: "Data Centric",
    description:
      "OKDP aims mainly to provide different data technologies covering a wide range of architecture patterns like data mesh, data fabric, etc. by respecting data lifecycle.",
  },
  {
    title: "Cloud Native",
    description:
      "OKDP architecture decomposes components into loosely coupled services to help manage complexity and improve the speed, agility, and scale of software delivery.",
  },
  {
    title: "Open Source",
    description:
      "All the source code of the components in use is available on our GitHub with a compatible Apache license.",
  },
  {
    title: "100% Free and Community Driver",
    description:
      "All the technologies and services delivered by the TDP project are free of use. It is built by its users to answer critical business requirements.",
  },
  {
    title: "Production Readiness",
    description:
      "OKDP ships components with a proven track record in terms of performance and community engagements. No trade-off on security and stability, development and initial support in secure mode and in HA with the aim of simplification and efficiency.",
  },
  {
    title: "Technological Independence",
    description:
      "Full or unit deployment control without vendor lock-in and in compliance with local regulations.",
  },
  {
    title: "Environment Agnostic",
    description:
      "OKDP targets multiple environments including public and private clouds as well as on-premise bare metal infrastructures.",
  },
  {
    title: "Automatic Build",
    description:
      "Every service/component's release is built from a reference branch on the GitHub repository using Github Actions and act for local build.",
  },
  {
    title: "Automatic deployment",
    description:
      "All components/services are deployed automatically with a native integration.",
  },
];

const architecture = [
  {
    title: "Query engine",
    components: [
      {
        name: "Kyuubi",
        logo: "/logos/kyuubi.svg",
        link: "https://kyuubi.apache.org/",
      },
      {
        name: "Dremio",
        logo: "/logos/dremio.svg",
        link: "https://www.dremio.com/",
      },
      { name: "Trino", logo: "/logos/trino.svg", link: "https://trino.io/" },
    ],
  },
  {
    title: "ML/AI",
    components: [
      {
        name: "Jupyter",
        logo: "/logos/jupyter.svg",
        link: "https://jupyter.org/",
      },
      {
        name: "MLflow",
        logo: "/logos/mlflow.svg",
        link: "https://mlflow.org/",
      },
      {
        name: "Kubeflow",
        logo: "/logos/kubeflow.svg",
        link: "https://kubeflow.org/",
      },
    ],
  },
  {
    title: "Processing collect",
    components: [
      {
        name: "Flink",
        logo: "/logos/flink.svg",
        link: "https://flink.apache.org/",
      },
      {
        name: "Spark",
        logo: "/logos/spark.svg",
        link: "https://spark.apache.org/",
      },
      {
        name: "Kafka",
        logo: "/logos/kafka.svg",
        link: "https://kafka.apache.org/",
      },
    ],
  },
  {
    title: "Storage",
    components: [
      {
        name: "PostgreSQL",
        logo: "/logos/postgresql.svg",
        link: "https://www.postgresql.org/",
      },
      {
        name: "MongoDB",
        logo: "/logos/mongodb.svg",
        link: "https://www.mongodb.com/",
      },
      {
        name: "Cassandra",
        logo: "/logos/cassandra.svg",
        link: "https://cassandra.apache.org/",
      },
      { name: "MinIO", logo: "/logos/minio.svg", link: "https://min.io/" },
    ],
  },
  {
    title: "Other components",
    components: [
      { name: "Hive", logo: "#", link: "https://hive.apache.org/" },
      { name: "Argo", logo: "#", link: "https://argoproj.github.io/cd/" },
      {
        name: "Apache Airflow",
        logo: "#",
        link: "https://airflow.apache.org/",
      },
    ],
  },
];

const milestones = [
  {
    title: "Existing Features",
    description: "JupyterLab docker build, JupyterLab deployment",
  },
  {
    title: "In the short term T1 2024",
    description:
      "HDFS integration with jupyterlab, Trino integration, Spark integration, Sandbox for tests with object and block storage",
  },
  {
    title: "In the medium term T2/T3 2024",
    description: "Airflow, MLOps",
  },
];

export default function App() {
  return (
    <div className="bg-gris-dark text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-gris-dark px-16 py-4">
        <span className="flex items-center gap-3 text-xl font-bold">
          <img
            src="/logos/okdp-notext.svg"
            alt="Logo OKDP"
            className="h-auto w-12"
          />
          <span className="hidden lg:block">Open Kubernetes Data Platform</span>
          <span className="lg:hidden">OKDP</span>
        </span>
        <nav>
          <ul className="flex gap-2">
            <li>
              <a
                href="#features"
                className="hidden px-5 py-2 hover:text-tdp-light md:inline"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#architecture"
                className="hidden px-5 py-2 hover:text-tdp-light md:inline"
              >
                Architecture
              </a>
            </li>
            {/* <li>
              <a href="#" className="px-5 py-2 hover:text-tdp-light">
                Contribution
              </a>
            </li> */}
            <li>
              <a
                href="#"
                className="rounded-full bg-tdp px-5 py-2 hover:bg-tdp-dark"
              >
                View on GitHub
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="">
        <section>
          <div className="mx-auto max-w-5xl px-4 py-32 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-7xl font-bold">
                The Future of Open-Source Data Management.
              </h1>
              <p className="mt-8 text-xl font-bold opacity-80">
                A free open-source data stack designe for Kubernetes.
              </p>
              <a
                href="#"
                className="mt-12 inline-block rounded-full bg-tdp px-7 py-3 hover:bg-tdp-dark"
              >
                View on Github
              </a>
            </div>
          </div>
        </section>
        <section>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <h2 className="text-6xl font-bold">Your Security First</h2>
              <div className="mt-10">
                <SecurityCards cards={cards} />
              </div>
            </div>
            <div className="pb-36 pt-16">
              <div className="grid gap-10 rounded-xl border border-white px-14 py-10 text-xl font-bold md:grid-cols-2">
                <p>
                  OKDP is an open source and free data stack designed and
                  implemented for Kubernetes under apache V2 licences.
                  <br />
                  Openness and adaptability are key considerations in the design
                  of the Open Kubenetes Data Platform.
                  <br />
                  It offers you a handpicked collection of the top open-source
                  data technologies, like Apache Spark, Jupyterhub, and Trino
                  with a native and full Kubernetes integration.
                </p>
                <p>
                  OKDP has a different strategy than other existing options,
                  which either promote their proprietary solutions or increase
                  vendor lock-in.
                  <br />
                  Every data layer in OKDP is quickly addable or removeable and
                  can operate everywhere: on-premises or in the private and
                  public cloud.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gris-light py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold">
              TOSIT, The Open-Source I Trust
            </h2>
            <p className="mt-10 text-xl font-bold">
              TOSIT is an association that promotes community-driven initiatives
              to create truly open-source technologies and platforms. The
              association brings together numerous companies and administrations
              including DGFiP (Direction Générale des Finances Publiques), BPCE
              (Banque Populaire, Caisse d'Epargne et Natixis), Société Générale,
              among others.
            </p>
            <p className="mt-6 text-xl font-bold">
              OKDP is currently mainly implemented and managed by DGFiP.
            </p>
            <p className="mt-6 text-xl font-bold">
              Participation in OKDP is open to all, with the aim of ensuring
              that the technology stack is accessible, efficient, and powerful
              for everyone's.
            </p>
          </div>
        </section>
        <section id="features" className="py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold">Features</h2>
            <div className="mt-12">
              <Features features={features} />
            </div>
          </div>
        </section>

        <section id="architecture" className="bg-gris-light py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold">Architecture</h2>
            <p className="text-xl font-bold">
              These tools and platforms form an integral part of the OKDP
              architecture.
            </p>
            <div className="mt-12">
              <Architecture architecture={architecture} />
            </div>
          </div>
        </section>
        <section className="py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold">Roadmap</h2>
            <div className="mt-12">
              <Roadmap milestones={milestones} />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gris-light py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <img src="/logos/okdp-horizontal.svg" alt="Logo OKDP" />
            <small className="mt-5">
              &copy; 2024 OKDP. All rights reserved.
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
}
