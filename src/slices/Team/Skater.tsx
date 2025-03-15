import { Button } from '@/app/components/Button';
import { Heading } from '@/app/components/Heading';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import React from 'react';
import { SkaterScribble } from './SkaterScribble';
import clsx from 'clsx';

type Props = {
  skater: Content.SkaterDocument;
  index: number;
};

function Skater({ skater, index }: Props) {
  const colors = [
    'text-brand-blue',
    'text-brand-lime',
    'text-brand-orange',
    'text-brand-pink',
    'text-brand-purple',
  ];

  const scribbleColor = colors[index];

  return (
    <div className="skater group relative flex flex-col items-center gap-4">
      <div className="stack-layout overflow-hidden ">
        <PrismicNextImage
          field={skater.data.foto_backgroung}
          width={500}
          imgixParams={{ q: 20 }}
          alt=''
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.80]"
        />
        <SkaterScribble className={clsx('relative', scribbleColor)} />
        <PrismicNextImage
          field={skater.data.photo_foregraund}
          alt=''
          width={500}
          className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <h3
          className="relative grid place-self-end justify-self-start p-2 font-sans text-brand-gray
        ~text-2xl/3xl">
          <span className="mb-[-.3em] block">{skater.data.first_name}</span>
          <span className="block">{skater.data.last_name}</span>
        </h3>
      </div>
      <Button field={skater.data.customizer_l} size="sm">
        Build their board
      </Button>
    </div>
  );
}

export default Skater;
