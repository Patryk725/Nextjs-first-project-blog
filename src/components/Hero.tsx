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
    <section className="bleed min-h-[calc(100dvh-var(--main-nav-height,0px)-var(--secondary-nav-height,0px))] w-full items-center justify-center bg-red-300 py-6">
      <div className="flex w-full max-w-[40ch] flex-col items-center justify-center gap-8">
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
