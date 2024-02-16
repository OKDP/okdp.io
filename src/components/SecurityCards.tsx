const SecurityCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <li className="flex flex-col gap-4 rounded-md bg-gris-light p-6">
      <h3 className="text-sm font-medium uppercase leading-relaxed tracking-widest opacity-70">
        {title}
      </h3>
      <p className="text-xl font-medium">{description}</p>
    </li>
  );
};

export default function SecurityCards({
  cards,
}: {
  cards: { title: string; description: string }[];
}) {
  return (
    <ul className="grid gap-6 md:grid-cols-3 md:gap-12">
      {cards.map((card, index) => (
        <SecurityCard key={index} {...card} />
      ))}
    </ul>
  );
}
