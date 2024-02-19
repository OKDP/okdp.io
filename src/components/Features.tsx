const Feature = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <li className="flex flex-col gap-1">
    <h3 className="text-3xl font-bold">{title}</h3>
    <p className="text-xl leading-tight opacity-80">{description}</p>
  </li>
);

export default function Features({
  features,
}: {
  features: { title: string; description: string }[];
}) {
  return (
    <ul className="mt-12 grid gap-6 md:grid-cols-3 md:gap-14">
      {features.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))}
    </ul>
  );
}
