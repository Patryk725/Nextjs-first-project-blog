"use client";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

type TimelineEntry = {
  title: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

const TimelineItem = ({
  item,
  index,
}: {
  item: TimelineEntry;
  index: number;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  // * true gdy wpis minie środek ekranu
  const isInView = useInView(ref, { margin: "0px 0px -50% 0px" });

  return (
    <li ref={ref} className="relative grid pl-12 md:grid-cols-2 md:pl-0">
      <span className="border-foreground bg-background absolute top-2 left-4 grid size-4 -translate-x-1/2 place-items-center rounded-full border-2 md:left-1/2">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: isInView ? 1 : 0 }}
          className="bg-foreground size-2 rounded-full"
        />
      </span>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={
          index % 2
            ? "shadow-foreground/10 rounded-sm p-6 shadow-2xl md:col-start-2 md:ml-12"
            : "shadow-foreground/10 rounded-sm p-6 shadow-2xl md:mr-12 md:text-right"
        }
      >
        <span className="text-sm font-bold text-slate-400 uppercase dark:text-slate-600">
          {item.label}
        </span>
        <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
        {item.content}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
        transition={{ duration: 0.4 }}
        className={`hidden items-center text-8xl md:flex ${index % 2 ? "md:col-start-1 md:row-start-1 md:justify-end md:pr-12" : "md:pl-12"}`}
      >
        {item.icon}
      </motion.div>
    </li>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative py-10">
      <div className="bg-foreground/20 absolute inset-y-0 left-4 w-0.5 -translate-x-1/2 md:left-1/2" />
      <motion.div
        style={{ scaleY }}
        className="bg-foreground absolute inset-y-0 left-4 w-0.5 origin-top -translate-x-1/2 md:left-1/2"
      />
      <ol className="flex flex-col gap-16">
        {data.map((item, index) => (
          <TimelineItem key={item.title} item={item} index={index} />
        ))}
      </ol>
    </div>
  );
};
