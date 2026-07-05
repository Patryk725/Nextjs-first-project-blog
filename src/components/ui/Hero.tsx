type HeroProps = {
  title: string;
  description?: string;
  symbols?: [React.ReactElement?, React.ReactElement?, React.ReactElement?];
  buttons?: React.ReactElement[];
};

export default function Hero({
  title,
  description,
  symbols,
  buttons,
}: HeroProps) {
  return (
    <section className="bleed flex h-2/3 w-full items-center justify-center bg-red-300">
      <div className="flex max-w-[40ch] flex-col items-center justify-center gap-8">
        <h1 className="text-5xl">{title}</h1>
        <div>{description}</div>
        <div>
          <div className="text-4xl">
            {symbols?.map((el, i) => (
              <span className="inline-block" key={i}>
                {el}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
