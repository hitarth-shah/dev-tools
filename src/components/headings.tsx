import React from "react";

interface HeadingProps {
  heading: string;
  subHeading: string;
}

export const Heading = ({ heading, subHeading }: HeadingProps) => {
  return (
    <div className="flex flex-col gap-2 pb-8">
      <h5 className="text-4xl font-bold">{heading}</h5>
      <p className="text-muted-foreground">{subHeading}</p>
    </div>
  );
};
