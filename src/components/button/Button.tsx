import { Spinner } from '@components/spinner';
import clsx from 'clsx';
import { ReactElement } from 'react';
interface IButtonProps {
  isDisabled?: boolean;
  handleClick?: () => void;
  varient?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  text?: string;
  icon?: ReactElement | null;
  isLoading?: boolean;
  loadingText?: string;
}

export const Button = (props: IButtonProps): ReactElement => {
  const {
    isDisabled = false,
    handleClick = () => null,
    size = 'base',
    varient = 'primary',
    text = 'Button Text',
    icon = null,
    isLoading = false,
    loadingText = 'Loading',
  } = props;
  return (
    <div className="flex space-x-2 justify-center">
      <button
        disabled={isDisabled || isLoading}
        type="button"
        className={clsx(
          'inline-block px-16 py-1 font-semibold text-center rounded-sm shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
          {
            'bg-buttons-primary text-black': varient === 'primary',
            'bg-buttons-secondary text-white': varient === 'secondary',
            'disabled:opacity-50 disabled:cursor-not-allowed': isDisabled,
          },
        )}
        onClick={handleClick}
      >
        {isLoading ? <Spinner /> : icon}
        <span className={`text-${size}`}>{isLoading ? loadingText : text}</span>
      </button>
    </div>
  );
};
