import { ReactNode, FC } from 'react';
import clsx from 'clsx';
interface LayoutProps {
  children: ReactNode;
  hideShroomValue?: boolean;
  hideWalletValue?: boolean;
  hideContainer?: boolean;
  hideFooter?: boolean;
}

export const Layout: FC<LayoutProps> = ({ children, hideContainer }: LayoutProps) => {
  return (
    <div className="w-full p-4">
      <main>
        <div className={clsx('w-full sm:w-1/2 lg:w-1/3 m-auto', hideContainer ? 'invisible' : '')}>
          {' '}
          {children}
        </div>
      </main>
    </div>
  );
};
