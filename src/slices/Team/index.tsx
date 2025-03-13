import React, { FC, JSX } from 'react';
import { Content } from '@prismicio/client';
import { PrismicText, SliceComponentProps } from '@prismicio/react';
import { Bounded } from '@/app/components/Bounded';
import { Heading } from '@/app/components/Heading';
import Skater from './Skater';
import { createClient } from '@/prismicio';

/**
 * Props for `Team`.
 */
export type TeamProps = SliceComponentProps<Content.TeamSlice>;

/**
 * Component for "Team" Slices.
 */
const Team: FC<TeamProps> = async ({ slice }): Promise<JSX.Element> => {
  const client = createClient();
  const skaters = await client.getAllByType('skater');

  console.log(skaters);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy">
      <Heading className="mb-8 text-center text-white" as="h2">
        <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {skaters.map((skater, index) => (
          <React.Fragment key={index}>
            {skater.data.first_name && <Skater skater={skater} index={index} />}
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default Team;
