import Link from 'next/link';
import { Button } from './Button';
import { Logo } from './Logo';
import { createClient } from '@/prismicio';
import { PrismicNextLink } from '@prismicio/next';

export async function Header() {
  const client = createClient();
  const settings = await client.getSingle('settings');

  return (
    <header
      className="header absolute left-0 right-0 top-0 z-50
    ~h32/48 ~px-4/6 ~py-4/5 hd:h-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,auto] items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
        <div className="logo">
          <Link href={'/'}>
            <Logo />
          </Link>
        </div>
        <nav
          aria-label="Main"
          className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
          <ul className="flex flex-wrap items-center justify-center gap-8">
            {settings.data.navigation.map((item) => (
              <li key={item.link.text}>
                <PrismicNextLink field={item.link} className="~text-lg/xl"></PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className=" justify-self-end">
          <Button href="" icon="phone" color="purple" aria-label="Звонок">
            <span>+375(29) 862-30-39</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
