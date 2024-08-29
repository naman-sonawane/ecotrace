"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function RecomCards() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Discover Ways to Reduce Your Carbon Footprint.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 w-full"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Reduce Your Carbon Footprint with Simple Steps
              </span>{" "}
              Consider incorporating these practices into your daily routine:
              <ul className="list-disc pl-5 mt-2">
                <li>Reduce, Reuse, Recycle: Cut down on waste by opting for reusable items and recycling when possible.</li>
                <li>Opt for Energy-Efficient Appliances: Choose appliances that use less energy to reduce your carbon footprint.</li>
                <li>Use Public Transportation: Whenever possible, use public transit, carpool, or bike to lower your emissions.</li>
                <li>Conserve Water: Reduce water usage by fixing leaks, taking shorter showers, and using water-saving fixtures.</li>
                <li>Support Renewable Energy: Consider switching to renewable energy sources like solar or wind power for your home.</li>
              </ul>
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Sustainable Living",
    title: "Reduce Your Carbon Footprint with Energy Efficiency",
    src: "https://images.unsplash.com/photo-1611389661504-93e2d158518b?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Eco-Friendly Choices",
    title: "Enhance Your Sustainability Practices",
    src: "https://images.unsplash.com/photo-1557207562-a3157143784e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Green Technology",
    title: "Utilize Green Tech to Reduce Emissions",
    src: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Smart Transportation",
    title: "Adopt Eco-Friendly Transportation Methods",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Water Conservation",
    title: "Conserve Water to Help the Environment",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Renewable Energy",
    title: "Switch to Renewable Energy Sources",
    src: "https://images.unsplash.com/flagged/photo-1566838616793-29a4102a5b0e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];
