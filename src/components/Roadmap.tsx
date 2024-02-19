const Milestone = ({
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

export function Roadmap({
  milestones,
}: {
  milestones: { title: string; description: string }[];
}) {
  return (
    <ul className="flex flex-col gap-12">
      {milestones.map((milestone, index) => (
        <Milestone key={index} {...milestone} />
      ))}
    </ul>
  );
}
