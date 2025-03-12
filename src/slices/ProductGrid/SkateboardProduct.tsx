import { Button } from '@/app/components/Button';
import { HorizontalLine, VerticalLine } from '@/app/components/Line';
import { createClient } from '@/prismicio';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import clsx from 'clsx';
import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { Scribble } from './Scribble';

type Props = { id: string };

const VERTICAL_LINE_CLASSES =
  'absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400';

const HORIZONTAL_LINE_CLASSES =
  '-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400';
export async function SkateboardProduct({ id }: Props) {
  const client = createClient();
  const product = await client.getByID<Content.SkateboardDocument>(id);
  const price = isFilled.number(product.data.price)
    ? `${(product.data.price / 100).toFixed(2)}`
    : 'Price not available';

  return (
    <div className="group relative mx-auto w-full max-w-72 px-8 pt-4 4">
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, 'left-4')} />
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, 'right-4')} />
      <HorizontalLine className={clsx(HORIZONTAL_LINE_CLASSES)} />
      <div className="flex items-center justify-between ~text-sm/2xl">
        <span>{price}</span>
        <span className="inline-flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          37
        </span>
      </div>

      <div className="-mb1-1 overflow-hidden py-4">
        <Scribble className="absolute inset-0 w-full h-full" color="#f00" />
        <PrismicNextImage
          alt=""
          field={product.data.image}
          width={150}
          className="mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"
        />
      </div>
      <HorizontalLine className={clsx(HORIZONTAL_LINE_CLASSES)} />

      <h3 className="my-2 text-center font-sans leading-tight ~text-lg/xl">{product.data.name}</h3>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Button field={product.data.customizer_link}>Customize</Button>
      </div>
    </div>
  );
}
