const Components = ({
  title,
  components,
}: {
  title: string;
  components: { name: string; logo: string; link: string }[];
}) => {
  const isLogo = components.every((c) => c.logo.endsWith(".svg"));

  const listWithLogos = (
    <>
      <h4>{title}</h4>
      <ul className="flex divide-x overflow-auto rounded-lg bg-gris-lighter">
        {components.map((component) => (
          <li
            key={component.name}
            className="flex min-h-24 flex-grow items-center justify-center border-gris-dark px-8 py-6 text-center hover:bg-gray-400"
          >
            <a
              href={component.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full w-full items-center justify-center"
            >
              <img
                src={component.logo}
                alt={component.name}
                className="h-auto max-h-24 min-h-12 w-auto min-w-40 max-w-40"
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  );

  const listWithoutLogos = (
    <p className="flex">
      <h4>{title}:&nbsp;</h4>
      {components.map((component, i) => (
        <>
          <a
            key={component.name}
            href={component.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-tdp-light"
          >
            {component.name}
          </a>
          {i !== components.length - 1 && <span>,&nbsp;</span>}
        </>
      ))}
    </p>
  );

  return <li>{isLogo ? listWithLogos : listWithoutLogos}</li>;
};

export default function Architecture({
  architecture,
}: {
  architecture: {
    title: string;
    components: { name: string; logo: string; link: string }[];
  }[];
}) {
  return (
    <ul className="flex flex-col gap-12">
      {architecture.map((a) => (
        <Components key={a.title} {...a} />
      ))}
    </ul>
  );
}
