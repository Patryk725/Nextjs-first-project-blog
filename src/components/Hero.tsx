import DefaultButton from "./ui/Button/DefaultButton";

type HeroProps = {
  title: string;
  description?: string;
  symbols?: [React.ReactElement?, React.ReactElement?];
  buttons?: React.ReactElement[];
};

export default function Hero({
  title,
  description,
  symbols,
  buttons,
}: HeroProps) {
  return (
    <section className="bleed relative min-h-[calc(100dvh-var(--main-nav-height,0px)-var(--secondary-nav-height,0px))] w-full items-center justify-center overflow-hidden py-6">
      <div className="flex w-full max-w-[40ch] flex-col items-center justify-center gap-8">
        <h1 className="text-5xl">{title}</h1>
        <div>{description}</div>
        <div className="flex gap-2">
          <DefaultButton href="./articles" colorInvert>
            Czytaj blogi
          </DefaultButton>
          <DefaultButton href="about-me">O mnie</DefaultButton>
        </div>
        <div>
          <div className="text-4xl">
            {symbols?.[0] && (
              <span
                className="absolute -top-6 left-2 inline-block -rotate-12 opacity-10"
                style={{ fontSize: "450px" }}
              >
                {symbols[0]}
              </span>
            )}

            {symbols?.[1] && (
              <span
                className="absolute right-2 -bottom-6 inline-block rotate-12 opacity-5"
                style={{ fontSize: "450px" }}
              >
                {symbols[1]}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
